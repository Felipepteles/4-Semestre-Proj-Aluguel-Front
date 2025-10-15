import type { ClienteType } from "../../utils/ClienteType"
import { formatCPF, formatCEP, formatTelefone } from "../../utils/Formatters"

type listaClienteProps = {
  clienteLinha: ClienteType;
  clientes: ClienteType[];
  setClientes: React.Dispatch<React.SetStateAction<ClienteType[]>>;
}

export default function ItemCliente({ clienteLinha }: listaClienteProps) {

  const endereco = clienteLinha.Endereco[0] || {}
  const telefone = clienteLinha.Telefone[0] || {}

  return (
    <tr key={clienteLinha.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
      <td className={`px-6 py-4`}>
        {clienteLinha.nome}
      </td>
      <td className={`px-6 py-4`}>
        {clienteLinha.email}
      </td>
      <td className={`px-6 py-4`}>
        {formatCPF(clienteLinha.cpf)}
      </td>
      <td className={`px-6 py-4`}>
        {endereco?.logradouro + ", " + endereco?.num} 
      </td>
      <td className={`px-6 py-4`}>
        {endereco?.cidade + "-" + endereco?.estado}
      </td>
      <td className={`px-6 py-4`}>
        {formatCEP(String(endereco?.cep))}
      </td>
      <td className={`px-6 py-4`}>
        {formatTelefone(String(telefone?.tel1))}
      </td>
      <td className={`px-6 py-4`}>
        {formatTelefone(String(telefone?.tel2))}
      </td>
    </tr>
  )
}
