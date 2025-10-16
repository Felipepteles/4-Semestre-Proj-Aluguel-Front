import type { FerramentaType } from "./utils/FerramentaType"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useClienteStore } from "./context/ClienteContext"
import { toast } from 'sonner'
import { useForm } from "react-hook-form"
import { Datepicker } from "flowbite-react";
import { HiCalendar, HiCheck, HiClipboardList, HiMail } from "react-icons/hi";

const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
  descricao: string
}

export default function Detalhes() {
  const params = useParams()
  const navigate = useNavigate()

  const [ferramenta, setFerramenta] = useState<FerramentaType>()
  const { cliente } = useClienteStore()
  const { register, handleSubmit, reset } = useForm<Inputs>()

  const [dataInicio, setDataInicio] = useState<Date | null>(new Date())
  const [dataFim, setDataFim] = useState<Date | null>(new Date())
  const [valorTotal, setValorTotal] = useState<number>(0)

  useEffect(() => {
    async function buscaDados() {
      try {
        const response = await fetch(`${apiUrl}/ferramentas/${params.ferramentaId}`)
        if (!response.ok) {
          throw new Error("Falha ao buscar dados da ferramenta.")
        }
        const dados = await response.json()
        setFerramenta(dados)
        
        setValorTotal(dados.preco || 0)
      } catch (error) {
        console.error(error)
        toast.error("Não foi possível carregar os detalhes da ferramenta.")
      }
    }
    buscaDados()
  }, [params.ferramentaId])

  useEffect(() => {
    if (dataInicio && dataFim && ferramenta?.preco) {
      if (dataFim < dataInicio) {
        setDataFim(dataInicio);
        return;
      }

      const diffTime = Math.abs(dataFim.getTime() - dataInicio.getTime());
      
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

      setValorTotal(diffDays * ferramenta.preco);
    } else {
      setValorTotal(ferramenta?.preco || 0);
    }
  }, [dataInicio, dataFim, ferramenta])


  async function reservar(data: Inputs) {
    if (!dataInicio || !dataFim) {
      toast.error("Por favor, selecione as datas de início e fim da reserva.");
      return;
    }

    const response = await fetch(`${apiUrl}/reservas`, {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({
        clienteId: cliente.id,
        ferramentaId: Number(params.ferramentaId),
        descricao: data.descricao,
        dataInicio: dataInicio.toISOString(),
        dataFim: dataFim.toISOString()
      })
    })

    if (response.status === 201) {
      toast.success("Obrigado! Sua solicitação de reserva foi enviada. Aguarde nosso retorno.")
      reset()
      navigate("/")
    } else {
      const erroData = await response.json();
      toast.error(erroData.message || "Não foi possível enviar sua solicitação de reserva.")
    }
  }

  const InstructionStep = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <div className="flex items-start space-x-3">
      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full text-blue-600 dark:bg-blue-900 dark:text-blue-300">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-gray-800 dark:text-white">{title}</h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">{children}</p>
      </div>
    </div>
  );

  return (
    <section className="mt-6 mx-auto bg-white border border-gray-200 rounded-lg md:max-w-7xl dark:border-gray-700 dark:bg-gray-800 shadow-lg shadow-gray-500/70">
      <div className="grid md:grid-cols-2">
        <div className="p-4">
          <img className="object-contain w-full h-full rounded-lg"
            src={ferramenta?.foto} alt={`Foto da Ferramenta ${ferramenta?.nome}`} />
        </div>
        <div className="p-6 flex flex-col justify-center space-y-4">
          <h5 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            {ferramenta?.marca.nome} - {ferramenta?.nome}
          </h5>
          <p className="text-gray-700 dark:text-gray-400">
            <span className="font-semibold">Descrição:</span> {ferramenta?.descricao}
          </p>
          <p className="text-gray-700 dark:text-gray-400">
            <span className="font-semibold">Categoria:</span> {ferramenta?.categoria.nome}
          </p>
          <h6 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Diária: {Number(ferramenta?.preco).toLocaleString("pt-br", { style: 'currency', currency: 'BRL' })}
          </h6>
          <hr className="dark:border-gray-600" />

          {cliente.id ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Solicite sua Reserva
                </h3>
                <div className="space-y-4">
                  <InstructionStep icon={<HiCalendar size={20} />} title="Passo 1: Escolha as Datas">
                    Selecione o período desejado para a locação da ferramenta.
                  </InstructionStep>
                  <InstructionStep icon={<HiClipboardList size={20} />} title="Passo 2: Adicione uma Descrição">
                    Se necessário, adicione uma breve descrição para sua reserva.
                  </InstructionStep>
                  <InstructionStep icon={<HiCheck size={20} />} title="Passo 3: Confirme o Valor">
                    O valor total será calculado automaticamente com base nas datas.
                  </InstructionStep>
                  <InstructionStep icon={<HiMail size={20} />} title="Passo 4: Envie e Aguarde">
                    Após enviar, aguarde a confirmação que chegará em seu e-mail.
                  </InstructionStep>
                </div>
              </div>
              <form onSubmit={handleSubmit(reservar)} className="space-y-4">
                <div className="flex items-center mb-2">
                  <Datepicker
                    title="Data de Início"
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
                    title="Data de Fim"
                    key={dataInicio?.toISOString()}
                    language="pt-BR"
                    value={dataFim}
                    onChange={(date) => setDataFim(date)}
                    minDate={dataInicio!}
                  />
                </div>
                <input type="text" className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 cursor-not-allowed dark:bg-gray-700 dark:border-gray-600 dark:text-gray-400" value={`${cliente.nome} (${cliente.email})`} disabled readOnly />

                <textarea id="message" rows={3} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Se necessário, adicione uma observação para sua reserva (ex: 'preciso para um trabalho específico')..."
                  required
                  {...register("descricao")}>
                </textarea>
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg text-center">
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Valor Total Estimado</p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-white">
                    {valorTotal.toLocaleString("pt-br", { style: 'currency', currency: 'BRL' })}
                  </p>
                </div>

                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Solicitar Reserva
                </button>
              </form>
            </div>
          ) : (
            <div className="text-center p-6 bg-gray-100 dark:bg-gray-700 rounded-lg">
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Gostou desta ferramenta?
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">Faça o login para solicitar sua reserva agora mesmo!</p>
              <button onClick={() => navigate('/login')} className="mt-4 px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700">
                Ir para o Login
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}