//import { FiUsers } from "react-icons/fi"
import { Link } from "react-router-dom"
//import { useAdminStore } from "../context/AdminContext"

export function Titulo() {

    //const { admin } = useAdminStore()

    return (
        <nav className="border-orange-500 bg-orange-400 dark:bg-orange-800 dark:border-orange-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="/toolkit.svg" className="h-12" alt="Logo Caixa de Ferramentas" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        Caixa de Ferramentas
                    </span>
                </Link>
            </div>
            {/* <div className="flex me-4 items-center font-bold">
                <FiUsers className="mr-2" />
                {admin.nome}
            </div> */}
        </nav>
    )
}