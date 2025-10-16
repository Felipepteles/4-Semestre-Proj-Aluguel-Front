import { useAdminStore } from "../context/AdminContext"
import { IoExitOutline } from "react-icons/io5"
import { BiSolidDashboard } from "react-icons/bi"
import { FaRegUser, FaUsers } from "react-icons/fa6"
import { BsCashCoin } from "react-icons/bs"
import { Link, useNavigate } from "react-router-dom"
import { FaTools } from "react-icons/fa"
import ConfirmModal from "../../components/ConfirmModal"
import { useState } from "react"

export function MenuLateral() {
  const [confirmModal, setConfirmModal] = useState(false);
  const navigate = useNavigate()
  const { deslogaAdmin } = useAdminStore()

  function adminSair() {
    deslogaAdmin()
    navigate("/admin/login", { replace: true })
  }

  return (
    <>
      <aside id="default-sidebar" className="fixed mt-24 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0  shadow-md shadow-gray-500/70" aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-blue-600/40 dark:bg-gray-800">
          <ul className="space-y-5 font-medium">
            <li>
              <Link to="/admin" className="flex items-center p-2 hover:bg-gray-400/30 rounded-full">
                <span className="h-5 text-gray-600 text-2xl">
                  <BiSolidDashboard className="pb-1" />
                </span>
                <span className="ms-2 mt-auto">Visão Geral</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/cadAdmin" className="flex items-center p-2 cursor-pointer hover:bg-gray-400/30 rounded-full">
                <span className="h-5 text-gray-600 text-2xl">
                  <FaRegUser className="pb-1" />
                </span>
                <span className="ms-2 mt-auto">Controle de Admins</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/clientes" className="flex items-center p-2 hover:bg-gray-400/30 rounded-full">
                <span className="h-5 text-gray-600 text-2xl">
                  <FaUsers className="pb-1" />
                </span>
                <span className="ms-2 mt-auto">Controle de Clientes</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/ferramentas" className="flex items-center p-2 hover:bg-gray-400/30 rounded-full">
                <span className="h-5 text-gray-600 text-2xl">
                  <FaTools className="pb-1" />
                </span>
                <span className="ms-2 mt-auto">Controle de Ferramentas</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/reservas" className="flex items-center p-2 cursor-pointer hover:bg-gray-400/30 rounded-full">
                <span className="h-5 text-gray-600 text-2xl">
                  <BsCashCoin className="pb-1" />
                </span>
                <span className="ms-2 mt-auto">Controle de Reservas</span>
              </Link>
            </li>
            <li>
              <span className="flex items-center p-2 cursor-pointer hover:bg-gray-400/30 rounded-full">
                <span className="h-5 text-gray-600 text-2xl">
                  <IoExitOutline className="pb-1" />
                </span>
                <span className="ms-2 mt-auto" onClick={() => setConfirmModal(true)}>Sair do Sistema</span>
              </span>
            </li>
          </ul>
        </div>
      </aside>
      <ConfirmModal title="Tem certeza que deseja sair do Sistema?" show={confirmModal} onClose={() => setConfirmModal(false)} onSuccess={adminSair} />
    </>
  )
}