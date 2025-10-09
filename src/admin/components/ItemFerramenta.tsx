import { TiDeleteOutline } from "react-icons/ti"

import type { FerramentaType } from "../../utils/FerramentaType"
import { useAdminStore } from "../context/AdminContext"

type listaFerramentaProps = {
  ferramenta: FerramentaType;
  ferramentas: FerramentaType[];
  setFerramentas: React.Dispatch<React.SetStateAction<FerramentaType[]>>;
}

const apiUrl = import.meta.env.VITE_API_URL

export default function ItemFerramenta({ ferramenta, ferramentas, setFerramentas }: listaFerramentaProps) {
  const { admin } = useAdminStore()

  async function excluirFerramenta() {
    if (!admin) {
      alert("Você não tem permissão para excluir ferramentas");
      return;
    }

    if (confirm(`Confirma a exclusão`)) {
      const response = await fetch(`${apiUrl}/ferramentas/${ferramenta.id}`,
        {
          method: "DELETE"
        },
      )

      if (response.status == 200) {
        const ferramentas2 = ferramentas.filter(x => x.id != ferramenta.id)
        setFerramentas(ferramentas2)
        alert("Ferramenta excluída com sucesso")
      } else {
        alert("Erro... Ferramenta não foi excluída")
      }
    }
  }

  // async function alterarDestaque() {

  //   const response = await fetch(`${apiUrl}/ferramentas/destacar/${ferramenta.id}`,
  //     {
  //       method: "PATCH",
  //       headers: {
  //         "Content-type": "application/json",
  //         Authorization: `Bearer ${admin.token}`
  //       },
  //     },
  //   )

  //   if (response.status == 200) {
  //     const ferramentas2 = ferramentas.map(x => {
  //       if (x.id == ferramenta.id) {
  //         return { ...x, destaque: !x.destaque }
  //       }
  //       return x
  //     })
  //     setFerramentas(ferramentas2)
  //   }
  // }

  return (
    <tr key={ferramenta.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
        <img src={ferramenta.foto} alt={`Foto do ${ferramenta.nome}`}
          style={{ width: 200 }} />
      </th>
      <td className={`px-6 py-4 "font-extrabold" : ""}`}>
        {ferramenta.nome}
      </td>
      <td className={`px-6 py-4 "font-extrabold" : ""}`}>
        {ferramenta.marca.nome}
      </td>
      <td className={`px-6 py-4 "font-extrabold" : ""}`}>
        {ferramenta.categoria.nome}
      </td>
      <td className={`px-6 py-4 "font-extrabold" : ""}`}>
        {Number(ferramenta.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}
      </td>
      <td className="px-6 py-4">
        <TiDeleteOutline className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
          onClick={excluirFerramenta} />&nbsp;
      </td>
    </tr>
  )
}
