import type { FerramentaType } from "./utils/FerramentaType"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useClienteStore } from "./context/ClienteContext"
import { toast } from 'sonner'
import { useForm } from "react-hook-form"

const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
  descricao: string
  dataInicio: string
  dataFim: string
}

export default function Detalhes() {
  const params = useParams()

  const [ferramenta, setFerramenta] = useState<FerramentaType>()
  const { cliente } = useClienteStore()

  const { register, handleSubmit, reset } = useForm<Inputs>()


  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${apiUrl}/ferramentas/${params.ferramentaId}`)
      const dados = await response.json()
      setFerramenta(dados)
    }
    buscaDados()
  }, [])

  async function reservar(data: Inputs) {

    const response = await fetch(`${apiUrl}/reservas`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST",
      body: JSON.stringify({
        clienteId: cliente.id,
        ferramentaId: Number(params.ferramentaId),
        descricao: data.descricao,
        dataInicio: data.dataInicio,
        dataFim: data.dataFim,
        valor: Number(params.ferramentaId)
      })
    })

    if (response.status == 201) {
      toast.success("Obrigado. Sua proposta foi enviada. Aguarde retorno")
      reset()
    } else {
      toast.error("Erro...1 Não foi possível enviar sua proposta")
    }
  }

  return (
    <>
      <section className="flex mt-6 mx-auto flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-5xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img className="object-cover w-full rounded-t-lg h-96 md:h-2/4 md:w-2/4 md:rounded-none md:rounded-s-lg"
          src={ferramenta?.foto} alt="Foto da Ferramenta" />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            {ferramenta?.marca.nome}
          </h5>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {ferramenta?.nome}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Descrição: {ferramenta?.descricao}
          </p>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Categoria: {ferramenta?.categoria.nome}
          </p>
          <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
            Diaria R$: {Number(ferramenta?.preco)
              .toLocaleString("pt-br", { minimumFractionDigits: 2 })}
          </h5>
          {cliente.id ?
            <>
              <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                🙂Você pode fazer uma Reserva para esta ferramenta!</h3>
              <form onSubmit={handleSubmit(reservar)}>
                <input type="text" className="mb-2 mt-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={`${cliente.nome} (${cliente.email})`} disabled readOnly />
                <textarea id="message" className="mb-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Descrição da reserva"
                  required
                  {...register("descricao")}>
                </textarea>
                <div id="date-range-picker" date-rangepicker className="flex items-center">
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                      </svg>
                    </div>
                    <input id="datepicker-range-start" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Select date start"
                      {...register("dataInicio")}
                    />
                  </div>
                  <span className="mx-4 text-gray-500">to</span>
                  <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                      </svg>
                    </div>
                    <input id="datepicker-range-end" type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Select date end"
                      {...register("dataFim")}
                    />
                  </div>
                </div>
                <br></br>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Reservar Ferramenta</button>
              </form>

            </>
            :
            <h2 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
              😎Gostou? Identifique-se e faça sua Reserva!
            </h2>
          }
        </div>
      </section>
    </>
  )
}