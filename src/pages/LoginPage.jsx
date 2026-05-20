import LoginForm from "../components/login/LoginForm";

function LoginPage() {

    return (
        <>
            <div className="min-h-screen w-full bg-[#f8f9fa] flex items-center justify-center p-4">
                <div className="bg-white w-full max-w-[1000px] min-h-[650px] rounded-2xl shadow-sm overflow-hidden grid grid-cols-1 md:grid-cols-2">

                    {/* PARTE IZQUIERDA: Ilustración y Branding */}
                    <div className="hidden md:flex flex-col justify-between items-center p-12 bg-[#f0f3ff] text-center">
                        <div className="flex flex-col items-center gap-2">
                            <div className="w-12 h-12 bg-[#3b46c4] rounded-xl flex items-center justify-center text-white font-bold text-xl">
                                S
                            </div>
                            <h1 className="text-3xl font-bold text-[#1a1c3d]">Stockly</h1>
                            <p className="text-sm text-gray-500">Sistema de gestión de inventarios</p>
                        </div>

                        <div className="my-6 max-w-[320px]">
                            <div className="text-gray-400 text-xs">[Espacio para Ilustración de Inventario]</div>
                        </div>

                        <h2 className="text-2xl font-bold text-[#1a1c3d] max-w-[280px]">
                            Controla tu inventario, <span className="text-[#3b46c4]">haz crecer tu negocio.</span>
                        </h2>
                    </div>

                    {/* PARTE DERECHA: Formulario de Login */}
                    <div className="flex flex-col justify-center px-6 py-12 sm:px-16 lg:px-20 bg-white">
                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-[#1a1c3d] flex items-center gap-2 justify-center md:justify-start">
                                Bienvenido de vuelta 👋
                            </h3>
                            <p className="text-sm text-gray-500 text-center md:text-left mt-1">
                                Inicia sesión para continuar
                            </p>
                        </div>

                        {/* Inyección del nuevo componente del formulario */}
                        <LoginForm />

                        {/* La sección de "o continúa con" y botones de Google/Microsoft irá justo debajo */}
                        <div className="mt-6 text-center text-xs text-gray-400">
                            [Próximo paso: Botones OAuth y Registro]
                        </div>

                    </div>

                </div>
            </div>
        </>
    )
}

export default LoginPage;