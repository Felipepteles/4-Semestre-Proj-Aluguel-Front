import './MinhasReservas.css'
import { useEffect, useState } from "react";
import { useClienteStore } from "./context/ClienteContext";
import type { ReservaType } from './utils/ReservaType';

const apiUrl = import.meta.env.VITE_API_URL

export default function Reservas() {
    const [reservas, setReservas] = useState<ReservaType[]>([])
    const { cliente } = useClienteStore()

    useEffect(() => {
        async function buscaDados() {
            const response = await fetch(`${apiUrl}/reservas/${cliente.id}`)
            const dados = await response.json()
            setReservas(dados)
        }
        buscaDados()
    }, [])

    function dataDMA(data: string) {
        const ano = data.substring(0, 4)
        const mes = data.substring(5, 7)
        const dia = data.substring(8, 10)
        return dia + "/" + mes + "/" + ano
    }

    const reservasTable = reservas.map(reservas => (
        <tr key={reservas.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <p><b>{reservas.ferramenta.nome}</b></p>
            </th>
            <td className="px-6 py-4">
                <img src={reservas.ferramenta.foto} className="fotoFerramenta" alt="Foto Ferramenta" />
            </td>
            <td className="px-6 py-4">
                <p><i>Enviado em: {dataDMA(reservas.dataInicio)}</i></p>
            </td>
            <td className="px-6 py-4">
                <p><i>Descrição: {(reservas.descricao)}</i></p>
            </td>
            <td>
              <p className='mt-3'>
                    R$: {Number(reservas.ferramenta.preco).toLocaleString("pt-br", { minimumFractionDigits: 2 })}</p>
            </td>
            <td className="px-6 py-4">
                    <i>{reservas.ferramenta.status}</i>
            </td>
        </tr>
    ))

    return (
        <section className="max-w-7xl mx-auto">
            <h1 className="mb-6 mt-4 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-5xl dark:text-white">
                Listagem de <span className="underline underline-offset-3 decoration-8 decoration-orange-400 dark:decoration-orange-600">Minhas reservas</span></h1>

            {reservas.length == 0 ?
                <h2 className="mb-4 mt-10 text-3xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl dark:text-white">
                   &nbsp;&nbsp; Ah... Você ainda não fez reservas para as nossas Ferramentas. 🙄
                </h2>
                :
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Ferramenta
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Foto
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Reservas
                            </th>
                             <th scope="col" className="px-6 py-3">
                                Descrição
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Preço por Dia
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservasTable}
                    </tbody>
                </table>
            }
        </section>
    )
}