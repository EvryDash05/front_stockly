import { useState, useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct } from '../api/products'; // Ajusta la ruta
import GeneralInformation from '../components/addProducts/GeneralInformation';
import InventoryInformation from '../components/addProducts/InventoryInformation';
import AditionalInformation from '../components/addProducts/AditionalInformation';

export default function IngresarProductosPage() {
    const queryClient = useQueryClient();

    // Estados locales del Formulario
    const [nombreProducto, setNombreProducto] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [stockInicial, setStockInicial] = useState(0);
    const [stockMinimo, setStockMinimo] = useState(5);
    const [precioCompra, setPrecioCompra] = useState(0);
    const [precioVenta, setPrecioVenta] = useState(0);
    const [fechaVencimiento, setFechaVencimiento] = useState('');
    const [valorInventario, setValorInventario] = useState(0);

    // Efecto reactivo para calcular el valor total del inventario
    useEffect(() => {
        const stock = Number(stockInicial) || 0;
        const precio = Number(precioCompra) || 0;
        setValorInventario(stock * precio);
    }, [stockInicial, precioCompra]);

    // Mutación con React Query
    const productMutation = useMutation({
        mutationFn: createProduct,
        onSuccess: () => {
            console.log('Producto creado con éxito en el backend');

            // Invalidar la caché de productos para que las tablas se refresquen automáticamente
            queryClient.invalidateQueries({ queryKey: ['products'] });

            // Opcional: Resetear estados o redirigir de vista aquí
        },
        onError: (error) => {
            console.error('Error al guardar el producto:', error.message);
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // Construcción exacta del payload del request
        const fechaFiltrada = fechaVencimiento.trim() === "" ? null : fechaVencimiento;

        console.log('Precio venta: ' + precioVenta);
        console.log('fecha: ' + fechaFiltrada);

        // 2. Construcción del payload limpiando los tipos de datos
        const payload = {
            nombre_producto: nombreProducto.trim(),
            descripcion: descripcion.trim() || null, // Si está vacío, mandamos null
            precio_compra: Number(precioCompra),
            precio_venta: Number(precioVenta), // <-- Asegúrate de que este valor sea mayor a 0 al digitar
            stock_actual: Number(stockInicial),
            stock_minimo: Number(stockMinimo),
            fecha_vencimiento: fechaFiltrada
        };

        console.log("Payload antes de validación:", payload);

        // Validación de seguridad previa en el cliente para el precio de venta
        if (payload.precio_venta <= 0) {
            console.error("Error: El precio de venta debe ser mayor a 0");
            return; // Evita enviar la petición si va a fallar por Zod
        }

        console.log("Payload corregido y normalizado:", payload);

        // Disparar la mutación con la data limpia
        productMutation.mutate(payload);
    };

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 max-w-[1200px] mx-auto">

            {/* Cabecera */}
            <div className="flex justify-between items-start border-b border-gray-100 pb-6 mb-8">
                <div>
                    <h1 className="text-xl font-bold text-[#1A1C3D]">Nuevo producto</h1>
                    <p className="text-sm text-gray-400 mt-1">Completa la información para registrar un nuevo producto en tu inventario.</p>
                </div>
            </div>

            {/* Alerta de Error de la Mutación */}
            {productMutation.isError && (
                <div className="mb-6 p-3 text-sm text-red-600 bg-red-50 rounded-xl border border-red-200">
                    {productMutation.error.message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">

                {/* Pasa los estados correspondientes a InformacionGeneral */}
                <GeneralInformation
                    nombreProducto={nombreProducto} setNombreProducto={setNombreProducto}
                    descripcion={descripcion} setDescripcion={setDescripcion}
                />

                <hr className="border-gray-100" />

                {/* Información de Inventario conectada */}
                <InventoryInformation
                    stockInicial={stockInicial}
                    setStockInicial={setStockInicial}
                    precioCompra={precioCompra}
                    setPrecioCompra={setPrecioCompra}
                    precioVenta={precioVenta}       // <-- Que no se te olvide pasar esta
                    setPrecioVenta={setPrecioVenta} // <-- Que no se te olvide pasar esta
                    valorInventario={valorInventario}
                />

                <hr className="border-gray-100" />

                {/* Pasa los estados correspondientes a InformacionAdicional */}
                <AditionalInformation
                    fechaVencimiento={fechaVencimiento} setFechaVencimiento={setFechaVencimiento}
                    isPending={productMutation.isPending}
                />

            </form>
        </div>
    );
}