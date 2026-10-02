import { createBrowserRouter } from 'react-router-dom';
import Login from './Features/auth/pages/login';
import Register from './Features/auth/pages/Register';
import ProtectedRoute from './Features/auth/Component/ProtectedRoute';
import Home from './Features/interview/pages/Home'
import Interview from './Features/interview/pages/Interview'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <ProtectedRoute><Home/></ProtectedRoute>
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path : '/interview/:interviewId',
        element: <Interview />
    }
])