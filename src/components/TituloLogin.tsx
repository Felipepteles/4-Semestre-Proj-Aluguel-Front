import { Link } from "react-router-dom"

export default function Titulo() {
    
    return (
        <nav className="border-orange-500 bg-orange-400 dark:bg-orange-800 dark:border-orange-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="./toolkit.svg" className="h-12" alt="Logo Caixa de Ferramentas" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        Caixa de Ferramentas
                    </span>
                </Link>
            </div>
        </nav>
    )
}