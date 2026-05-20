
function SearchBar({ activeTab, setActiveTab }) {
    return (
        <div className="space-y-6">
            {/* Tabs de modo de ingreso */}
            <div className="flex border-b border-gray-100 text-sm font-medium">
                <button
                    onClick={() => setActiveTab('buscar')}
                    className={`pb-3 px-2 border-b-2 transition-colors ${activeTab === 'buscar' ? 'border-[#3B46C4] text-[#3B46C4] font-bold' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                >
                    Buscar producto
                </button>
                <button
                    onClick={() => setActiveTab('escanear')}
                    className={`pb-3 px-2 ml-6 border-b-2 transition-colors ${activeTab === 'escanear' ? 'border-[#3B46C4] text-[#3B46C4] font-bold' : 'border-transparent text-gray-400 hover:text-gray-600'}`}
                >
                    Escanear código
                </button>
            </div>

            {/* Buscador e Indicadores de Progreso */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="relative flex-1 max-w-[500px]">
                    <input
                        type="text"
                        placeholder="Buscar por nombre, SKU o código de barras"
                        className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3B46C4] focus:ring-1 focus:ring-[#3B46C4]"
                    />
                    <span className="absolute right-4 top-3 text-gray-400">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.603 10.601Z" /></svg>
                    </span>
                </div>

                <div className="flex items-center gap-8 text-sm">
                    <div>
                        <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Productos contados</p>
                        <p className="text-lg font-bold text-[#1A1C3D] mt-0.5">18</p>
                    </div>
                    <div className="w-[200px]">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">Progreso del conteo</span>
                            <span className="text-xs font-bold text-[#1A1C3D]">36%</span>
                        </div>
                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-[#3B46C4] h-full rounded-full" style={{ width: '36%' }}></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchBar;