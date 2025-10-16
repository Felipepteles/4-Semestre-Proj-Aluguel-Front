import { Link } from "react-router-dom";
import { FiUsers } from "react-icons/fi";
import { useAdminStore } from "../context/AdminContext";

export function Titulo() {
  const { admin } = useAdminStore()
  
  return (
    <nav className=" bg-gradient-to-t from-blue-500 to-blue-800 text-white font-noto border-blue-800 flex flex-wrap justify-between fixed z-1 top-0 left-0 w-full z-50c shadow-lg shadow-gray-500/70">
      <div className="flex flex-wrap justify-between max-w-screen-xl p-4">
        <Link to="/admin" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/logo.png" className="h-16" alt="Logo Caixa de Ferramentas" />
          <span className="text-shadow-lg text-shadow-gray-800/30 self-center text-3xl font-bold whitespace-nowrap dark:text-white">
            Caixa de Ferramentas: Admin
          </span>
        </Link>
      </div>
      <div className="flex me-4 items-center font-bold">
        <FiUsers className="mr-2" />
        {admin.nome}
      </div>
    </nav>
  )
}