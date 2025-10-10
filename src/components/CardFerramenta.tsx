import { Link } from "react-router-dom"
import type { FerramentaType } from "../utils/FerramentaType"

export function CardFerramenta({ferramenta}: {ferramenta: FerramentaType}) {
    return (
        <div className="flex flex-col max-w-sm w-full pt-5 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <img className="w-2xs h-2/4 self-center rounded-t-lg mb-7" src={ferramenta.foto} alt="Foto" />
            <div className="p-2">
              <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {ferramenta?.marca.nome}
                </h5>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {ferramenta.nome}
                </h5>
                <p className="mb-3 font-extrabold text-gray-700 dark:text-gray-400">
                    Preço R$: {Number(ferramenta.preco).toLocaleString("pt-br", {
                        minimumFractionDigits: 2
                    })}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    Descrição: {ferramenta.descricao}
                </p>
                {ferramenta.status ?
                <Link to={`/detalhes/${ferramenta.id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Ver Detalhes
                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                    </svg>
                </Link>
            :
            <p className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Indisponivel
                </p>
            
            }
                
                
            </div>
        </div>
    )
}