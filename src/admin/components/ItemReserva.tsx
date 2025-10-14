import { TiDeleteOutline } from "react-icons/ti"
import { FaCheck } from "react-icons/fa"
import { toast } from "sonner"

import type { ReservaType } from "../../utils/ReservaType"
import { useAdminStore } from "../context/AdminContext"

type listaReservaProps = {
  reserva: ReservaType;
  reservas: ReservaType[];
  setReservas: React.Dispatch<React.SetStateAction<ReservaType[]>>;
}

const apiUrl = import.meta.env.VITE_API_URL

export default function ItemRserva({ reserva, reservas, setReservas }: listaReservaProps) {
  const { admin } = useAdminStore()

  async function excluirReserva() {
    if (confirm(`Confirma a exclusão`)) {
      const response = await fetch(`${apiUrl}/reservas/${reserva.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${admin.token}`
          },
        },
      )

      if (response.ok) {
        const reservas2 = reservas.filter(r => r.id != reserva.id)
        setReservas(reservas2)
        toast.success("Reserva excluída com sucesso")
      } else {
        toast.error("Erro... Reserva não foi excluída")
      }
    }
  }

  async function alterarStatus() {

    const response = await fetch(`${apiUrl}/reservas/${reserva.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${admin.token}`
        },
        body: JSON.stringify({
          status: "confirmado"
        })
      },
    )

    if (response.ok) {
      const reservas2 = reservas.map(reserva => {
        if (reserva.id == reserva.id) {
          return { ...reserva }
        }
        return reserva
      })
      setReservas(reservas2)
      toast.success("Reserva Confirmada")
    }
  }

  return (
    <tr key={reserva.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <img src={reserva.ferramenta.foto} alt={`Foto`}
          style={{ width: 200 }} />
      </th>
      <td className={`px-6 py-4 "font-extrabold`}>
        {reserva.ferramenta.nome}
      </td>
      <td className={`px-6 py-4`}>
        {reserva.cliente.nome}
      </td>
      <td className={`px-6 py-4`}>
        {reserva.descricao}
      </td>
      <td className={`px-6 py-4`}>
        {new Date(reserva.createdAt).toLocaleDateString("pt-BR")}
      </td>
      <td className={`px-6 py-4`}>
        {new Date(reserva.dataInicio).toLocaleDateString("pt-BR")}
      </td>
      <td className={`px-6 py-4`}>
        {new Date(reserva.dataFim).toLocaleDateString("pt-BR")}
      </td>
      <td className={`px-6 py-4`}>
        {reserva.status}
      </td>
      <td className={`px-6 py-4`}>
        {Number(reserva.valor).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
      </td>
      <td className="px-6 py-4">
        <div className="flex">
          <TiDeleteOutline className="text-3xl text-red-600 inline cursor-pointer" title="Excluir"
            onClick={excluirReserva} />
          <FaCheck className="text-3xl text-green-600 inline cursor-pointer" title="Aceitar"
            onClick={alterarStatus} />
        </div>
      </td>
    </tr>
  )
}
