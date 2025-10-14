import { useEffect, useState } from "react"
import ItemReserva from './components/ItemReserva'
import type { ReservaType } from "../utils/ReservaType"

const apiUrl = import.meta.env.VITE_API_URL

export default function AdminReservas() {
  const [reservas, setReservas] = useState<ReservaType[]>([])

  useEffect(() => {
    async function getReservas() {
      const response = await fetch(`${apiUrl}/reservas`)
      const dados = await response.json()
      setReservas(dados)
    }
    getReservas()
  }, [])

  const listaReservas = reservas.map(reserva => (
    <ItemReserva key={reserva.id} reserva={reserva} reservas={reservas} setReservas={setReservas} />
  ))

  return (
    <div className='m-4 mt-24'>
      <div className='flex justify-between'>
        <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
          Controle de Reservas
        </h1>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Foto
              </th>
              <th scope="col" className="px-6 py-3">
                Ferramenta
              </th>
              <th scope="col" className="px-6 py-3">
                Cliente
              </th>
              <th scope="col" className="px-6 py-3">
                Descrição
              </th>
              <th scope="col" className="px-6 py-3">
                Data da Reserva
              </th>
              <th scope="col" className="px-6 py-3">
                Data Início
              </th>
              <th scope="col" className="px-6 py-3">
                Data Fim
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Valor R$
              </th>
              <th scope="col" className="px-6 py-3">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {listaReservas}
          </tbody>
        </table>
      </div>
    </div>
  )
}