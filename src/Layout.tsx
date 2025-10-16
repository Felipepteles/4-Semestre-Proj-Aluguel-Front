import { Toaster } from 'sonner'
import { Outlet } from 'react-router-dom'
import Titulo from './components/Titulo.tsx'
import { Rodape } from './components/Footer.tsx'

export default function Layout() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Titulo />
        
        <main className="flex-grow bg-slate-400/50">
          <Outlet />
        </main>

        <Toaster richColors position="top-center" />
        <Rodape />
      </div>
    </>
  )
}
