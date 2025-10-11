import { TiDeleteOutline } from "react-icons/ti"
import { useAdminStore } from "../context/AdminContext"
import type { ClienteType } from "../../utils/ClienteType"

type listaClienteProps = {
  clienteLinha: ClienteType;
  clientes: ClienteType[];
  setClientes: React.Dispatch<React.SetStateAction<ClienteType[]>>;
}

const apiUrl = import.meta.env.VITE_API_URL

export default function ItemCliente({ clienteLinha, clientes, setClientes }: listaClienteProps) {
  const { admin } = useAdminStore()

  async function excluirCliente() {
    if (!admin || admin.nivel == 1) {
      alert("Você não tem permissão para excluir clientes");
      return;
    }

    if (confirm(`Confirma a exclusão`)) {
      const response = await fetch(`${apiUrl}/clientes/${clienteLinha.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${admin.token}`
          },
        },
      )

      if (response.status == 200) {
        const clientes2 = clientes.filter(x => x.id != clienteLinha.id)
        setClientes(clientes2)
        alert("Cliente excluído com sucesso")
      } else {
        alert("Erro... Cliente não foi excluído")
      }
    }
  }

  return (
    <tr key={clienteLinha.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td className={`px-6 py-4`}>
        {clienteLinha.nome}
      </td>
      <td className={`px-6 py-4`}>
        {clienteLinha.email}
      </td>
      <td className={`px-6 py-4`}>
        {clienteLinha.cpf}
      </td>
      <td className="px-6 py-4">
        <TiDeleteOutline className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
          onClick={excluirCliente} />
      </td>
    </tr>
  )
}
