# syntax=docker/dockerfile:1.7

# -----------------------------------------------------------------------------
# Etapa 1: build de la aplicación
# Usa una imagen Alpine de Node para mantener bajo el peso de la capa de build.
# En esta etapa se instalan dependencias con pnpm y se genera el directorio dist.
# -----------------------------------------------------------------------------
FROM node:22-alpine AS build

# Define el directorio de trabajo dentro del contenedor.
WORKDIR /app

# Habilita Corepack para usar pnpm sin instalarlo globalmente con npm.
RUN corepack enable

# Copia primero solo los manifiestos de dependencias para aprovechar la cache.
# Si el código cambia pero el lockfile no, Docker puede reutilizar la capa de deps.
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./

# Descarga las dependencias declaradas en el lockfile.
# El mount de cache acelera builds repetidos sin quedar dentro de la imagen final.
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm fetch --frozen-lockfile

# Copia el resto del proyecto después de preparar la cache de dependencias.
COPY . .

# Instala desde la cache local de pnpm y genera el build de producción de Vite.
# --offline evita resolver paquetes fuera del lockfile durante esta capa.
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --offline && \
    pnpm run build

# -----------------------------------------------------------------------------
# Etapa 2: runtime con Nginx
# Solo se copia el resultado estático del build; no se incluyen node_modules,
# TypeScript, ni herramientas de compilación en la imagen final.
# -----------------------------------------------------------------------------
FROM nginx:1.27-alpine AS runtime

# Copia la configuración de Nginx para servir assets estáticos y soportar rutas SPA.
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia únicamente los archivos estáticos generados por Vite.
COPY --from=build /app/dist /usr/share/nginx/html

# Documenta el puerto HTTP que expone el contenedor.
EXPOSE 80

# Ejecuta Nginx en primer plano, como requiere Docker para mantener vivo el proceso.
CMD ["nginx", "-g", "daemon off;"]
