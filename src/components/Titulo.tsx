import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useClienteStore } from "../context/ClienteContext";
import { Avatar, Dropdown, DropdownDivider, DropdownHeader, DropdownItem } from "flowbite-react";
import ConfirmModal from "../admin/components/ConfirmModal";


export default function Titulo() {
  const { cliente, deslogaCliente } = useClienteStore()
  const navigate = useNavigate()
  const [confirmModal, setConfirmModal] = useState(false);


  function clienteSair() {
    deslogaCliente()
    if (localStorage.getItem("clienteKey")) {
      localStorage.removeItem("clienteKey")
    }
    navigate("/")
  }
  return (
    <>
      <nav className="border-blue-800 bg-blue-700 dark:bg-blue-700 dark:border-blue-800 shadow-lg shadow-gray-500/70">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src="/logo.png" className="h-12" alt="Logo Caixa de Ferramentas" />
            <span className="text-shadow-lg text-shadow-gray-800/30 self-center font-noto text-4xl font-bold whitespace-nowrap dark:text-white text-white text-shadow-inner">
              Caixa de Ferramentas
            </span>
          </Link>
          <button data-collapse-toggle="navbar-solid-bg" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-solid-bg" aria-expanded="false">
            <span className="sr-only">Abrir Menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>

          <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
            <ul className="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
              <li className="flex items-center gap-4">
                {cliente.id ?
                  <>
                    <span className="block text-sm text-white">{cliente.nome}</span>
                    <Dropdown
                      label={<Avatar alt="User settings" img="/user.svg" className="cursor-pointer" rounded />}
                      arrowIcon={false}
                      inline
                    >
                      <DropdownHeader>
                        <span className="block truncate text-sm font-medium">{cliente.email}</span>
                      </DropdownHeader>
                      <DropdownItem>
                        <Link to="/minhasReservas">
                          Minhas Reservas
                        </Link>
                      </DropdownItem>
                      <DropdownItem>Settings</DropdownItem>
                      <DropdownItem>Earnings</DropdownItem>
                      <DropdownDivider />
                      <DropdownItem>
                        <span className="cursor-pointer" onClick={() => setConfirmModal(true)}>Sair</span>
                      </DropdownItem>
                    </Dropdown>
                    <ConfirmModal title="Tem certeza que deseja sair do Sistema?" show={confirmModal} onClose={() => setConfirmModal(false)} onSuccess={clienteSair} />
                  </>
                  :
                  <Link to="/login" className="block py-2 px-3 md:p-0 text-white rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-gray-700 md:hover:text-shadow-md md:hover:text-shadow-white/30 md:hover:font-bold  dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
                    Identifique-se
                  </Link>
                }
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}