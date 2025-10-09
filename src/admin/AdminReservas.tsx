import { useEffect, useState } from "react"

import type { ReservaType } from "../utils/ReservaType"
import ItemReserva from "./components/ItemReserva"

const apiUrl = import.meta.env.VITE_API_URL

function ControleReservas() {
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
      <h1 className="mb-4 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white">
        Controle de Reservas
      </h1>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Foto da Ferramenta
              </th>
              <th scope="col" className="px-6 py-3">
                Nome
              </th>
              <th scope="col" className="px-6 py-3">
                Preço R$
              </th>
              <th scope="col" className="px-6 py-3">
                Cliente
              </th>
              <th scope="col" className="px-6 py-3">
                Reserva do Cliente
              </th>
              <th scope="col" className="px-6 py-3">
                Reseposta da Revenda
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

export default ControleReservas