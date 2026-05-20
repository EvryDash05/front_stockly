import { useState } from "react";
import MainLayout from "../components/layout/MainLayout";
import DashboardPage from "./DashboardPage";
import AddProductPage from "./AddProductPage";
import InventoryCountPage from "./InventoryCountPage";
import CurrentProductsPage from "./CurrentProductsPage";

function MainMenuPage() {

    const [vistaActiva, setVistaActiva] = useState('Ingresar productos');

    const renderContenido = () => {
        console.log("Vista activa:", vistaActiva); // Debug: Ver qué vista se está intentando renderizar    
        switch (vistaActiva) {
            case 'Dashboard':
                return <DashboardPage />;
            case 'Ingresar productos':
                return <AddProductPage />;
            case 'Inventario (Conteo)':
                return <InventoryCountPage />;
            case 'Productos (Stock actual)':
                return <CurrentProductsPage />;
            default:
                return <div className="p-4">Sección en construcción...</div>;
        }
    };

    return (
        <MainLayout vistaActiva={vistaActiva} setVistaActiva={setVistaActiva}>
            {renderContenido()}
        </MainLayout>
    )
}

export default MainMenuPage;