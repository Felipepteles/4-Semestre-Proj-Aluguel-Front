import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import ItemFerramenta from './components/ItemFerramenta'
import type { FerramentaType } from "../utils/FerramentaType"

const apiUrl = import.meta.env.VITE_API_URL

export default function AdminFerramentas() {
  const [ferramentas, setFerramentas] = useState<FerramentaType[]>([])

  useEffect(() => {
    async function getFerramentas() {
      const response = await fetch(`${apiUrl}/ferramentas`)
      const dados = await response.json()
      setFerramentas(dados)
    }
    getFerramentas()
  }, [])

  const listaFerramentas = ferramentas.map(ferramenta => (
    <ItemFerramenta key={ferramenta.id} ferramenta={ferramenta} ferramentas={ferramentas} setFerramentas={setFerramentas} />
  ))

  return (
    <div className='m-4 mt-24'>
      <div className='flex justify-between'>
        <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          Controle de Ferramentas
        </h1>
        <Link to="/admin/ferramentas/novo" 
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-bold rounded-lg text-md px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Nova Ferramenta
        </Link>
      </div>

      <div className="overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Foto
              </th>
              <th scope="col" className="px-6 py-3">
                Modelo da Ferramenta
              </th>
              <th scope="col" className="px-6 py-3">
                Marca
              </th>
              <th scope="col" className="px-6 py-3">
                Ano
              </th>
              <th scope="col" className="px-6 py-3">
                Preço R$
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {listaFerramentas}
          </tbody>
        </table>
      </div>
    </div>
  )
}