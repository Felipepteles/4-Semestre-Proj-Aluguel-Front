import { Toaster } from 'sonner'
import { Outlet } from 'react-router-dom'
import Titulo from './components/Titulo.tsx'
import { Rodape } from './components/Footer.tsx'

export default function Layout() {
  return (
    <>
      <Titulo />
      <Outlet />
      <Toaster richColors position="top-center" />
      <Rodape />
    </>
  )
}
