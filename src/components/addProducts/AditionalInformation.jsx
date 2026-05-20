
function AditionalInformation() {
    return (
        <div>
            <h2 className="text-sm font-bold text-[#1A1C3D] uppercase tracking-wider mb-4">Información adicional</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600">Presentación</label>
                    <input type="text" placeholder="Ej. Botella" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3B46C4] focus:ring-1 focus:ring-[#3B46C4]" />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600">Contenido</label>
                    <input type="text" placeholder="Ej. 500 ml" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3B46C4] focus:ring-1 focus:ring-[#3B46C4]" />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600">Fecha de vencimiento</label>
                    <input type="date" className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3B46C4] text-gray-500 cursor-pointer" />
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-600">Estado</label>
                    <select className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#3B46C4] bg-white text-gray-700 font-medium cursor-pointer" defaultValue="activo">
                        <option value="activo">🟢 Activo</option>
                        <option value="inactivo">🔴 Inactivo</option>
                    </select>
                    <span className="text-[11px] text-gray-400">El producto estará disponible para su uso</span>
                </div>

                {/* BOTONES DE ACCIÓN */}
                <div className="md:col-span-2 flex items-end justify-end gap-4 pt-4">
                    <button type="reset" className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/xl" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" /></svg>
                        Limpiar formulario
                    </button>

                    <button type="submit" className="flex items-center gap-2 px-6 py-2.5 bg-[#3B46C4] hover:bg-[#2F38A3] text-white font-semibold rounded-xl text-sm shadow-sm transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" /></svg>
                        Guardar producto
                    </button>
                </div>

            </div>
        </div>
    );
}

export default AditionalInformation;