import Sidebar from "./Sidebar";

function MainLayout({ children, vistaActiva, setVistaActiva }) {
    return (
        <div className="flex h-screen w-full bg-[#F8FAFC] font-sans antialiased text-slate-800">

            {/* El Sidebar recibe el estado para controlar los clicks */}
            <Sidebar vistaActiva={vistaActiva} setVistaActiva={setVistaActiva} />

            <div className="flex flex-col flex-1 h-full overflow-hidden">

                {/* El Navbar dinámico con el título */}
                {/* <Navbar titulo={vistaActiva} /> */}

                {/* Aquí es donde se renderiza el contenido de la página actual */}
                <main className="flex-1 overflow-y-auto p-8">
                    {children}
                </main>

            </div>
        </div>
    )
}

export default MainLayout;