const WelcomePage = () => {
  return (
    <div className="flex min-h-[80vh] items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-slate-900">
          Bienvenido a tu panel de control
        </h1>

        <p className="mt-4 text-lg leading-8 text-slate-600">
          Administra pacientes, tratamientos y toda la información de tu sistema
          desde un solo lugar.
        </p>
      </div>
    </div>
  );
};
export default WelcomePage;
