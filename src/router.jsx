import { createBrowserRouter } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
// import DashboardPage from './pages/DashboardPage';
import MainMenuPage from './pages/MainMenuPage';
// Puedes crear un componente para manejar el error 404
// import NotFoundPage from './pages/NotFoundPage'; 

export const router = createBrowserRouter([
    {
        path: '/',
        element: <LoginPage />,
        // errorElement: <NotFoundPage />,
    },
    {
        path: '/main-menu',
        element: <MainMenuPage />,
    },
]);