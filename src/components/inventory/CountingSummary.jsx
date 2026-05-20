
function CountingSummary() {
    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Conteo actual</p>
                <p className="text-sm font-bold text-[#1A1C3D] mt-1"># CNT-2024-05-12-001</p>
            </div>
            <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Fecha</p>
                <p className="text-sm font-bold text-[#1A1C3D] mt-1">12 may. 2024</p>
            </div>
            <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Almacén</p>
                <p className="text-sm font-bold text-[#1A1C3D] mt-1">Almacén Principal</p>
            </div>
            <div>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Responsable</p>
                <p className="text-sm font-bold text-[#1A1C3D] mt-1">Juan Pérez</p>
            </div>
        </div>
    );
}

export default CountingSummary;