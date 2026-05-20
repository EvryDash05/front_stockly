import {
    LayoutDashboard,
    ClipboardList,
    Package,
    PlusCircle,
    BarChart3,
    Bell,
    Sparkles,
    Settings,
    ChevronDown
} from 'lucide-react';

function Sidebar({ vistaActiva, setVistaActiva }) {
    // Array de objetos limpio. Ya no necesita la propiedad 'active' estática.
    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard' },
        { icon: ClipboardList, label: 'Inventario (Conteo)' },
        { icon: Package, label: 'Productos (Stock actual)' },
        { icon: PlusCircle, label: 'Ingresar productos' },
        { icon: BarChart3, label: 'Reportes' },
        { icon: Bell, label: 'Alertas' },
        { icon: Sparkles, label: 'Características' },
        { icon: Settings, label: 'Configuración' },
    ];

    return (
        <aside className="w-64 h-full bg-white border-r border-slate-100 flex flex-col justify-between p-6">

            {/* Sección Superior: Logo y Enlaces */}
            <div className="flex flex-col gap-8">

                {/* Logo de Stockly */}
                <div className="flex items-center gap-3 px-2">
                    <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm shadow-indigo-200">
                        S
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-slate-900 tracking-tight">Stockly</h2>
                        <p className="text-[10px] text-slate-400 font-medium">Sistema de gestión de inventarios</p>
                    </div>
                </div>

                {/* Lista de Navegación Dinámica */}
                <nav className="flex flex-col gap-1">
                    {menuItems.map((item, index) => {
                        const Icon = item.icon;
                        // Evaluamos dinámicamente si la opción actual coincide con el estado global
                        const isOptionActive = vistaActiva === item.label;

                        return (
                            <button
                                key={index}
                                // Ejecuta el cambio de estado en el padre al hacer clic
                                onClick={() => setVistaActiva(item.label)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                                    isOptionActive
                                        ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                                }`}
                            >
                                <Icon size={20} className={isOptionActive ? 'text-white' : 'text-slate-400'} />
                                {item.label}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Sección Inferior: Perfil del Usuario */}
            <div className="border-t border-slate-100 pt-4">
                <button className="flex items-center justify-between w-full p-2 hover:bg-slate-50 rounded-xl transition-colors group">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-indigo-600 text-white font-semibold text-sm rounded-full flex items-center justify-center">
                            JP
                        </div>
                        <div className="text-left">
                            <p className="text-sm font-semibold text-slate-900 leading-none mb-1">Juan Pérez</p>
                            <p className="text-xs text-slate-400">Administrador</p>
                        </div>
                    </div>
                    <ChevronDown size={16} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
                </button>
            </div>

        </aside>
    );
}
export default Sidebar;