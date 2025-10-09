import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.tsx'
import Login from './Login.tsx'
import Detalhes from './Detalhes.tsx'
import MinhasReservas from './MinhasReservas.tsx'

// Rotas do Administrador
import AdminLayout from './admin/AdminLayout.tsx'
import AdminLogin from './admin/AdminLogin.tsx'   
import AdminDashboard from './admin/AdminDashboard.tsx'
import AdminFerramentas from './admin/AdminFerramentas.tsx';  
import AdminReservas from './admin/AdminReservas.tsx';  


import Layout from './Layout.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const rotas = createBrowserRouter([
  {
    path: "/admin/login",
    element: <AdminLogin />,   // rota do form de login sem o Layout da Área Administrativa
  },
  {
    path: "/admin",
    element: <AdminLayout />,  // layout principal do admin com menus e outlet
    children: [
      { index: true, element: <AdminDashboard /> },          // rota /admin
      { path: "ferramentas", element: <AdminFerramentas /> },          // rota /admin/ferramentas
      { path: "reservas", element: <AdminReservas /> },  // ...
      // { path: "ferramentas/novo", element: <AdminNovaFerramenta /> },  // ...
    ],
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: 'login', element: <Login /> },
      { path: 'detalhes/:ferramentaId', element: <Detalhes /> },
      { path: 'minhasReservas', element: <MinhasReservas /> },
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={rotas} />
  </StrictMode>,
)