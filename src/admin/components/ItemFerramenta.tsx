import type { FerramentaType } from "../../utils/FerramentaType"
import { useAdminStore } from "../context/AdminContext"
import { TiDeleteOutline } from "react-icons/ti"
import { FaRegStar } from "react-icons/fa"
import ConfirmModal from "./ConfirmModal"
import { useState } from "react";
import { toast } from "sonner"

type listaFerramentaProps = {
  ferramenta: FerramentaType;
  ferramentas: FerramentaType[];
  setFerramentas: React.Dispatch<React.SetStateAction<FerramentaType[]>>;
}

const apiUrl = import.meta.env.VITE_API_URL

export default function ItemFerramenta({ ferramenta, ferramentas, setFerramentas }: listaFerramentaProps) {
  
  const [exclusaoModal, setExclusaoModal] = useState(false);
  const { admin } = useAdminStore()

  async function excluirFerramenta() {
    const response = await fetch(`${apiUrl}/ferramentas/${ferramenta.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${admin.token}`
        },
      },
    )

    if (response.ok) {
      const ferramentas2 = ferramentas.filter(x => x.id != ferramenta.id)
      setFerramentas(ferramentas2)
      toast.success("Ferramenta excluída com sucesso")
    } else {
      toast.error("Erro... Ferramenta não foi excluída")
    }
  }

  async function alterarDestaque() {

    const response = await fetch(`${apiUrl}/ferramentas/destacar/${ferramenta.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${admin.token}`
        },
      },
    )

    if (response.ok) {
      const ferramentas2 = ferramentas.map(ferramenta => {
        if (ferramenta.id == ferramenta.id) {
          return { ...ferramenta }
        }
        return ferramenta
      })
      setFerramentas(ferramentas2)
      toast.success("Status Alterado com Sucesso")
    }
  }

  return (
    <>
      <tr key={ferramenta.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
          <img src={ferramenta.foto} alt={`Foto`}
            style={{ width: 200 }} />
        </th>
        <td className={`px-6 py-4 "font-extrabold`}>
          {ferramenta.nome}
        </td>
        <td className={`px-6 py-4 "font-extrabold`}>
          {ferramenta.descricao}
        </td>
        <td className={`px-6 py-4`}>
          {ferramenta.marca.nome}
        </td>
        <td className={`px-6 py-4`}>
          {ferramenta.categoria.nome}
        </td>
        <td className={`px-6 py-4`}>
          {Number(ferramenta.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
        </td>
        <td className="px-6 py-4">
          <TiDeleteOutline className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
            onClick={() => setExclusaoModal(true)} />&nbsp;
          <FaRegStar className="text-3xl text-yellow-600 inline-block cursor-pointer" title="Destacar"
            onClick={alterarDestaque} />
        </td>
      </tr>
      <ConfirmModal title="Tem certeza que deseja excluir a Ferramenta?" show={exclusaoModal} onClose={() => setExclusaoModal(false)} onSuccess={excluirFerramenta} />
    </>
  )
}
