import { useQuery, useMutation } from '@tanstack/react-query';
import { API_URL } from '../utils/constants/constants';
import ExportReportForm from '../components/report/ExportReportForm';
import AnalyticsKpis from '../components/report/AnalyticsKpis';
import CategoryDistribution from '../components/report/CategoryDistribution';
import TopSellingProducts from '../components/report/TopSellingProducts';

const fetchDashboardAnalytics = async () => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/report/dashboard`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });
    if (!res.ok) throw new Error('Error al conectar con la API');
    const resJson = await res.json();
    return resJson.data;
};

// Petición de mutación para descargar el binario del PDF
const downloadPdfReportAPI = async (payload) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`${API_URL}/report/pdf`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
    });

    if (!res.ok) throw new Error('Error al compilar el archivo PDF en el servidor');

    // Retornamos la respuesta como un objeto Blob (Binary Large Object)
    return await res.blob();
};

export default function Reportes() {
    const { data: analitica, isLoading, isError } = useQuery({
        queryKey: ['dashboardAnalytics'],
        queryFn: fetchDashboardAnalytics
    });

    // Mutación encargada de descargar y disparar la descarga en el navegador del cliente
    const { mutate: descargarPdf, isPending: descargando } = useMutation({
        mutationFn: downloadPdfReportAPI,
        onSuccess: (blob, variables) => {
            // Crear un enlace temporal en memoria para forzar la descarga física del archivo
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `Reporte_Stockly_${variables.fecha_inicio}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        },
        onError: (error) => {
            alert(`Fallo en la descarga: ${error.message}`);
        }
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <p className="text-sm font-semibold text-gray-500 animate-pulse">Cargando métricas comerciales...</p>
            </div>
        );
    }

    if (isError || !analitica) {
        return (
            <div className="flex items-center justify-center h-screen bg-gray-50">
                <p className="text-sm font-semibold text-red-500">Error al sincronizar el módulo de reportes.</p>
            </div>
        );
    }

    const { kpis, distribucion_categorias, productos_mas_vendidos } = analitica;

    return (
        <div className="p-6 bg-gray-50/50 min-h-[92vh] font-sans">
            {/* CABECERA */}
            <div className="mb-6">
                <h2 className="text-xl font-bold text-gray-800">Reportes e Indicadores de Gestión</h2>
                <p className="text-xs text-gray-400 mt-0.5">Métricas de rendimiento e inventario actualizadas automáticamente</p>
            </div>

            {/* FORMULARIO DE EXPORTACIÓN A PDF */}
            <ExportReportForm onDownload={(fechas) => descargarPdf(fechas)} isDownloading={descargando} />

            {/* KPI CARDS */}
            <AnalyticsKpis kpis={kpis} />

            {/* BLOQUE INFERIOR */}
            <div className="flex flex-col lg:flex-row gap-6">
                <CategoryDistribution distribution={distribucion_categorias} totalValue={kpis.valor_total_inventario} />
                <TopSellingProducts products={productos_mas_vendidos} />
            </div>
        </div>
    );
}