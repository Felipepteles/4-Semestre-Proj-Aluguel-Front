import { toast } from "sonner"
import { FaListOl } from "react-icons/fa6";
import { TiDeleteOutline } from "react-icons/ti"
import { useAdminStore } from "../context/AdminContext"

import type { AdminType } from "../../utils/AdminType"

type listaAdminProps = {
  adminLinha: AdminType;
  admins: AdminType[];
  setAdmins: React.Dispatch<React.SetStateAction<AdminType[]>>;
}

const apiUrl = import.meta.env.VITE_API_URL

// const niveis = [
//   { id: "ADMIN", nome: "ADMIN" },
//   { id: "MODERADOR", nome: "MODERADOR" },
//   { id: "COMUM", nome: "COMUM" }
// ]

export default function ItemAdmin({ adminLinha, admins, setAdmins }: listaAdminProps) {
  const { admin } = useAdminStore()

  async function excluirAdmin() {
    if (!admin || admin.nivel == 1) {
      alert("Você não tem permissão para excluir admins");
      return;
    }

    if (confirm(`Confirma a exclusão`)) {
      const response = await fetch(`${apiUrl}/admins/${adminLinha.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${admin.token}`
          },
        },
      )

      if (response.ok) {
        const admins2 = admins.filter(a => a.id != adminLinha.id)
        setAdmins(admins2)
        alert("Admin excluído com sucesso")
      } else {
        alert("Erro... Admin não foi excluído")
      }
    }
  }

  async function alterarNivel() {

    const nivel = Number(prompt("Novo Nível do Admin?"))

    if (nivel < 1 || nivel > 5) {
      toast.error("Erro... Nível deve ser entre 1 e 5")
      return
    }

    const response = await fetch(`${apiUrl}/admins/${adminLinha.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${admin.token}`
        },
        body: JSON.stringify({
          nivel: nivel
        })
      },
    )

    if (response.ok) {
      const admins2 = admins.map(a => {
        if (a.id == adminLinha.id) {
          return { ...a, nivel: nivel }
        }
        return a
      })
      setAdmins(admins2)
      toast.success("Nível Alterado com Sucesso")
    } else {
      toast.error("Erro... Nível não foi alterado")
    }

  }

  return (
    <tr key={adminLinha.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td className={`px-6 py-4`}>
        {adminLinha.nome}
      </td>
      <td className={`px-6 py-4`}>
        {adminLinha.email}
      </td>
      <td className={`px-6 py-4`}>
        {adminLinha.nivel}
      </td>
      <td className="px-6 py-4">
        <TiDeleteOutline className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
          onClick={excluirAdmin} />&nbsp;
        <FaListOl className="text-3xl text-yellow-600 inline-block cursor-pointer" title="Alterar Nível"
          onClick={alterarNivel} />
      </td>
    </tr>
  )
}
