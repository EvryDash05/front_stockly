import InputWithBadge from "./InputWithBadge";

function InventoryInformation({ 
  stockInicial, 
  setStockInicial, 
  precioCompra, 
  setPrecioCompra, 
  precioVenta,       // <-- 1. Añadir prop
  setPrecioVenta,    // <-- 1. Añadir prop
  valorInventario 
}) {
  return (
    <div>
      <h2 className="text-sm font-bold text-[#1A1C3D] uppercase tracking-wider mb-4">Información de inventario</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        <InputWithBadge
          label="Stock inicial *"
          type="number"
          min="0"
          value={stockInicial}
          onChange={(e) => setStockInicial(e.target.value)}
          badge="uds"
          required
        />

        <InputWithBadge
          label="Stock mínimo *"
          type="number"
          min="0"
          placeholder="0"
          badge="uds"
          helperText="Cantidad mínima antes de generar alerta"
          required
        />

        <InputWithBadge
          label="Stock máximo"
          type="number"
          min="0"
          placeholder="0"
          badge="uds"
          helperText="Cantidad máxima recomendada"
        />

        <InputWithBadge
          label="Precio de compra (costo)"
          type="number"
          step="0.01"
          min="0"
          value={precioCompra}
          onChange={(e) => setPrecioCompra(e.target.value)}
          badge="S/"
          badgePosition="left"
        />

        {/* PRECIO DE VENTA CORREGIDO */}
        <InputWithBadge
          label="Precio de venta"
          type="number"
          step="0.01"
          min="0"
          placeholder="0.00"
          value={precioVenta} // <-- 2. Vincular valor
          onChange={(e) => setPrecioVenta(e.target.value)} // <-- 2. Vincular evento
          badge="S/"
          badgePosition="left"
        />

        <InputWithBadge
          label="Valor del inventario (calculado)"
          type="text"
          value={valorInventario.toFixed(2)}
          badge="S/"
          badgePosition="left"
          readOnly
          helperText="Se calcula automáticamente"
        />

      </div>
    </div>
  );
}

export default InventoryInformation;