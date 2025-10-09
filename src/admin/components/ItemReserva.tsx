import { TiDeleteOutline } from "react-icons/ti"
import { FaRegEdit  } from "react-icons/fa"
import type { ReservaType } from "../../utils/ReservaType"
//import { useAdminStore } from "../context/AdminContext"

type listaReservaProps = {
  reserva: ReservaType,
  reservas: ReservaType[],
  setReservas: React.Dispatch<React.SetStateAction<ReservaType[]>>
}

const apiUrl = import.meta.env.VITE_API_URL

export default function ItemReserva({ reserva, reservas, setReservas }: listaReservaProps) {

  //const { admin } = useAdminStore()

  async function excluirReserva() {

    if (confirm(`Confirma Exclusão da Reserva "${reserva.descricao}"?`)) {
      const response = await fetch(`${apiUrl}/reservas/${reserva.id}`,
        {
          method: "DELETE"
        },
      )

      if (response.status == 200) {
        const reservas2 = reservas.filter(x => x.id != reserva.id)
        setReservas(reservas2)
        alert("Reserva excluída com sucesso")
      } else {
        alert("Erro... Reserva não foi excluída")
      }
    }
  }

  async function responderReserva() {
    const respostaLocadora = prompt(`Resposta da Locadora para "${reserva.descricao}"`)

    if (respostaLocadora == null || respostaLocadora.trim() == "") {
      return
    }

    const response = await fetch(`${apiUrl}/reservas/${reserva.id}`,
      {
        method: "PATCH",
        body: JSON.stringify({resposta: respostaLocadora})
      },
    )

    if (response.status == 200) {
      const reservas2 = reservas.map(x => {
        if (x.id == reserva.id) {
          return { ...x, resposta: respostaLocadora}
        }
        return x
      })
      setReservas(reservas2)
    }
  }

  return (
    <tr key={reserva.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <img src={reserva.ferramenta.foto} alt="Foto do Carro"
          style={{ width: 200 }} />
      </th>
      <td className={"px-6 py-4"}>
        {reserva.ferramenta.nome}
      </td>
      <td className={"px-6 py-4"}>
        {Number(reserva.ferramenta.preco).toLocaleString("pt-br", {minimumFractionDigits: 2})}
      </td>
      <td className={`px-6 py-4`}>
        {reserva.cliente.nome}
      </td>
      <td className={`px-6 py-4`}>
        {reserva.descricao}
      </td>
      <td className={`px-6 py-4`}>
        {reserva.status}
      </td>
      <td className="px-6 py-4">
        {reserva.status ? 
          <>
            <img src="/ok.png" alt="Ok" style={{width: 60}} />
          </>
        :
          <>
            <TiDeleteOutline className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
              onClick={excluirReserva} />&nbsp;
            <FaRegEdit className="text-3xl text-yellow-600 inline-block cursor-pointer" title="Status"
              onClick={responderReserva} />
          </>
        }
      </td>

    </tr>
  )
}