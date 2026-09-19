import { createBrowserRouter } from 'react-router-dom';
import Login from './Features/auth/pages/login';
import Register from './Features/auth/pages/Register';
import ProtectedRoute from './Features/auth/Component/ProtectedRoute';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedRoute><h1>HOMEPAGE</h1></ProtectedRoute>
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    }
])