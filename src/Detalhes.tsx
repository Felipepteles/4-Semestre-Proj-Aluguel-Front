import type { FerramentaType } from "./utils/FerramentaType"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useClienteStore } from "./context/ClienteContext"
import { toast } from 'sonner'
import { useForm } from "react-hook-form"
import { Datepicker } from "flowbite-react";


const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
  descricao: string
}

export default function Detalhes() {
  const params = useParams()

  const [dataInicio, setDataInicio] = useState<Date | null>(new Date())
  const [dataFim, setDataFim] = useState<Date | null>(null)
  const [ferramenta, setFerramenta] = useState<FerramentaType>()
  const navigate = useNavigate()
  const { cliente } = useClienteStore()

  const { register, handleSubmit, reset } = useForm<Inputs>()


  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${apiUrl}/ferramentas/${params.ferramentaId}`)
      if (response.status == 401) {
        localStorage.removeItem("clienteKey")
      }
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
        valor: Number(params.ferramentaId),
        dataInicio: dataInicio,
        dataFim: dataFim
      })
    })
    if (response.status == 401) {
      localStorage.removeItem("clienteKey")
    }

    if (response.status == 201) {
      toast.success("Obrigado. Sua solicitação de reserva foi enviada. Aguarde retorno")
      reset()
      navigate("/")
    } else {
      toast.error("Erro...1 Não foi possível enviar sua solicitação de reserva")
    }
  }

  return (
    <>
      <section className="flex mt-6 mx-auto flex-col items-center bg-white border border-gray-200 rounded-lg md:flex-row md:max-w-7xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 shadow-lg shadow-gray-500/70">
        <img className="object-cover w-full rounded-t-lg h-96 md:h-2/4 md:w-2/4 md:rounded-none md:rounded-s-lg"
          src={ferramenta?.foto} alt="Foto da Ferramenta" />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            <p>{ferramenta?.marca.nome} - {ferramenta?.nome}
            </p>
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
              <h4>Instruções:</h4>
              <p>
                1. Insira a data de início, que será a data que você vai retirar a ferramenta em nossa loja;
              </p>
              <p>
                2. Insira a data final, que será a data que você vai fazer a devolução da ferramenta;
              </p>
              <p>
                3. Confira o valor e clique em "Solicitar Reserva"; e
              </p>
              <p>
                4. Pronto! Agora é só aguardar a confirmação da sua reserva que irá chegar na sua caixa de E-Mails ou conferir aqui mesmo, em "Minhas Reservas".
              </p>
              <form onSubmit={handleSubmit(reservar)}>
                <input type="text" className="mb-2 mt-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500" value={`${cliente.nome} (${cliente.email})`} disabled readOnly />
                <textarea id="message" className="mb-2 block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Descrição da reserva"
                  required
                  {...register("descricao")}>
                </textarea>
                <div className="flex items-center mb-2">
                  <Datepicker
                    key="primeiro"
                    language="pt-BR"
                    value={dataInicio}
                    onChange={(date) => {
                      setDataInicio(date)
                      setDataFim(date)
                    }}
                    minDate={new Date()}
                  />
                  <span className="mx-4 text-gray-500">até</span>
                  <Datepicker
                    key={dataInicio?.toISOString()}
                    language="pt-BR"
                    value={dataFim}
                    onChange={(date) => setDataFim(date)}
                    minDate={dataInicio!}
                  />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 cursor-pointer">Solicitar Reserva</button>
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