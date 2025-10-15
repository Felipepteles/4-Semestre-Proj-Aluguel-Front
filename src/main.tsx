import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx';
import CadCliente from './CadCliente.tsx';
import CompleteCadCliente from './CompleteCadCliente.tsx';
import Detalhes from './Detalhes.tsx';
import Login from './Login.tsx';
import MinhasReservas from './MinhasReservas.tsx';

import AdminCtrlAdmin from './admin/AdminCtrlAdmin.tsx'; 
import AdminCtrlCliente from './admin/AdminCtrlCliente.tsx';
import AdminCtrlReservas from './admin/AdminCtrlReservas.tsx';
import AdminDashboard from './admin/AdminDashboard.tsx';    
import AdminLayout from './admin/AdminLayout.tsx';
import AdminLogin from './admin/AdminLogin.tsx';   
import AdminNovoAdmin from './admin/AdminNovoAdmin.tsx';
import AdminNovaFerramenta from './admin/AdminNovaFerramenta.tsx';
import AdminCtrlFerramentas from './admin/AdminCtrlFerramentas.tsx';

import Layout from './Layout.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const rotas = createBrowserRouter([
  {
    path: "/admin/login",
    element: <AdminLogin />
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {index: true, element: <AdminDashboard />},
      {path: "cadAdmin", element: <AdminCtrlAdmin /> },
      {path: "clientes", element: <AdminCtrlCliente /> },
      {path: "reservas", element: <AdminCtrlReservas />},
      {path: "cadAdmin/novo", element: <AdminNovoAdmin />},
      {path: "ferramentas", element: <AdminCtrlFerramentas />},
      {path: "ferramentas/novo", element: <AdminNovaFerramenta />}
    ]
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: 'login', element: <Login /> },
      { path: 'cadCliente', element: <CadCliente /> },
      { path: 'minhasReservas', element: <MinhasReservas /> },
      { path: 'detalhes/:ferramentaId', element: <Detalhes /> },
      { path: 'completeCadCliente/:clienteId', element: <CompleteCadCliente /> }
    ],
  },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={rotas} />
  </StrictMode>,
)