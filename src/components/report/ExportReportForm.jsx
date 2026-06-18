import { useState } from 'react';

export default function ExportReportForm({ onDownload, isDownloading }) {
    // Inicializar por defecto con la fecha de hoy en formato YYYY-MM-DD
    const hoy = new Date().toISOString().split('T')[0];
    const [fechaInicio, setFechaInicio] = useState(hoy);
    const [fechaFin, setFechaFin] = useState(hoy);

    const handleSubmit = (e) => {
        e.preventDefault();
        onDownload({ fecha_inicio: fechaInicio, fecha_fin: fechaFin });
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm mb-6 flex flex-col md:flex-row items-end gap-4">
            <div className="flex-1 w-full">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Fecha Inicio</label>
                <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent text-gray-700 bg-white shadow-sm"
                    value={fechaInicio}
                    onChange={(e) => setFechaInicio(e.target.value)}
                />
            </div>

            <div className="flex-1 w-full">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Fecha Fin</label>
                <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent text-gray-700 bg-white shadow-sm"
                    value={fechaFin}
                    onChange={(e) => setFechaFin(e.target.value)}
                />
            </div>

            <button
                type="submit"
                disabled={isDownloading}
                className="w-full md:w-auto bg-indigo-600 text-white px-6 py-2.5 rounded-xl hover:bg-indigo-700 transition text-sm font-bold shadow-md shadow-indigo-100 disabled:opacity-50 flex items-center justify-center gap-2 h-[42px]"
            >
                {isDownloading ? (
                    <span className="animate-pulse">Generando Documento...</span>
                ) : (
                    <>
                        <span>📄</span> Descargar Auditoría PDF
                    </>
                )}
            </button>
        </form>
    );
}