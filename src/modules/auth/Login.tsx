import { motion } from "framer-motion";
import { useMediaQuery } from "@react-hook/media-query";
import LoginForm from "./components/LoginForm";

const Login = () => {
  const isLargeScreen = useMediaQuery("(min-width: 1024px)");
  const position = {
    top: "50%",
    left: isLargeScreen ? "calc(100% * 5 / 6)" : "50%",
    translateX: "-50%",
    translateY: "-50%",
  };

  return (
    <div className="relative flex h-screen w-full p-2 overflow-hidden bg-secondary">
      {/* Imagen como fondo en dispositivos pequeños */}
      <div className="lg:hidden absolute inset-0 bg-cover bg-center z-0">
        <img
          src="/images/desk-font.jpg"
          alt="Imagen de fondo"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Imagen lateral en desktop */}
      <div className="hidden lg:block h-full w-2/3 bg-background rounded-tr-4xl rounded-br-4xl overflow-hidden">
        <img
          src="/images/desk-font.jpg"
          alt="Imagen de fondo"
          className="h-full w-full object-cover"
        />
      </div>

      {/* Formulario con transición */}
      <motion.div
        initial={position}
        animate={position}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="absolute z-10 w-full max-w-md px-6"
        style={{
          transform: "translate(-50%, -50%)",
        }}
      >
        <LoginForm />
      </motion.div>
    </div>
  );
};

export default Login;
