import { useForm } from "react-hook-form"
import { useNavigate, useParams } from "react-router-dom"
import { maskCEP, maskTelefone } from "./utils/InputMasks"
import { toast } from "sonner"

type Inputs = {
  logradouro: string
  num: number
  bairro: string
  cidade: string
  estado: string
  cep: string
  tel1: string
  tel2: string
  clienteId: string
}

const apiUrl = import.meta.env.VITE_API_URL

const estados = [
  { id: "AC", nome: "Acre" },
  { id: "AL", nome: "Alagoas" },
  { id: "AP", nome: "Amapá" },
  { id: "AM", nome: "Amazonas" },
  { id: "BA", nome: "Bahia" },
  { id: "CE", nome: "Ceará" },
  { id: "DF", nome: "Distrito Federal" },
  { id: "ES", nome: "Espírito Santo" },
  { id: "GO", nome: "Goiás" },
  { id: "MA", nome: "Maranhão" },
  { id: "MT", nome: "Mato Grosso" },
  { id: "MS", nome: "Mato Grosso do Sul" },
  { id: "MG", nome: "Minas Gerais" },
  { id: "PA", nome: "Pará" },
  { id: "PB", nome: "Paraíba" },
  { id: "PR", nome: "Paraná" },
  { id: "PE", nome: "Pernambuco" },
  { id: "PI", nome: "Piauí" },
  { id: "RJ", nome: "Rio de Janeiro" },
  { id: "RN", nome: "Rio Grande do Norte" },
  { id: "RS", nome: "Rio Grande do Sul" },
  { id: "RO", nome: "Rondônia" },
  { id: "RR", nome: "Roraima" },
  { id: "SC", nome: "Santa Catarina" },
  { id: "SP", nome: "São Paulo" },
  { id: "SE", nome: "Sergipe" },
  { id: "TO", nome: "Tocantins" }
]

export default function CompleteCadCliente() {
  const { register, handleSubmit } = useForm<Inputs>()
  const navigate = useNavigate()
  const params = useParams()

  const optionsEstado = estados.map(estado => (
    <option key={estado.id} value={estado.id}>{estado.nome}</option>
  ))

  async function editaCliente(data: Inputs) {

    const tel2Limpo = data.tel2 ? data.tel2.replace(/\D/g, '') : "";

    const cleanedData = {
      ...data,
      cep: data.cep.replace(/\D/g, ''),
      tel1: data.tel1.replace(/\D/g, ''),
      tel2: tel2Limpo !== '' ? tel2Limpo : null
    }

    const response = await
      fetch(`${apiUrl}/enderecos`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          logradouro: cleanedData.logradouro,
          num: Number(cleanedData.num),
          bairro: cleanedData.bairro,
          cidade: cleanedData.cidade,
          estado: cleanedData.estado,
          cep: Number(cleanedData.cep),
          clienteId: params.clienteId
        })
      })
    if (response.status == 401) {
      localStorage.removeItem("clienteKey")
    }

    const response2 = await
      fetch(`${apiUrl}/telefones`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          tel1: cleanedData.tel1,
          tel2: cleanedData.tel2,
          clienteId: params.clienteId
        })
      })
    if (response.status == 401) {
      localStorage.removeItem("clienteKey")
    }


    console.log(response, response2)
    if (response.status == 201 && response2.status == 201) {
      toast.success("Ok! Cadastro realizado com sucesso...")
      navigate("/login")
    } else {
      toast.error("Erro... Não foi possível realizar o cadastro")
    }
  }

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>, maskFunction: (value: string) => string) => {
    const { value } = e.target
    e.target.value = maskFunction(value)
    return e
  }

  return (
    <section className="bg-white-50/10 dark:bg-gray-900 py-10">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-auto lg:py-0">
        <div className="w-full bg-white rounded-lg dark:border md:mt-0 sm:max-w-5xl xl:p-0 dark:bg-gray-800 dark:border-gray-700 shadow-lg shadow-gray-500/70">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Complete o seu cadastro
            </h1>
            <form className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(editaCliente)}>
              <div className="flex gap-10 justify-around">
                <div className="w-full">
                  <div>
                    <label htmlFor="logradouro" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Logradouro:</label>
                    <input type="text" id="logradouro" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ex.: Rua Guarana com Rolha" required
                      {...register("logradouro")} />
                  </div>
                  <div>
                    <label htmlFor="num" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Número:</label>
                    <input type="num" id="num" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ex.: 123 ou 123A" required
                      {...register("num")} />
                  </div>
                  <div>
                    <label htmlFor="bairro" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bairro:</label>
                    <input type="text" id="bairro" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nome do Bairro" required
                      {...register("bairro")} />
                  </div>
                  <div>
                    <label htmlFor="cidade" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cidade:</label>
                    <input type="text" id="cidade" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nome da Cidade" required
                      {...register("cidade")} />
                  </div>
                </div>
                <div className="w-full">
                  <div>
                    <label htmlFor="estado" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Estado:</label>
                    <select id="estadoId"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
                      {...register("estado")}
                    >
                      {optionsEstado}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="cep" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CEP:</label>
                    <input type="text" id="cep" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Número do CEP" required
                      {...register("cep", {
                        onChange: (e) => handleInput(e, maskCEP)
                      })} 
                      maxLength={9} />
                  </div>
                  <div>
                    <label htmlFor="tel1" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefone 1:</label>
                    <input type="text" id="tel1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ex.: 53999999999" required
                      {...register("tel1", {
                        onChange: (e) => handleInput(e, maskTelefone)
                      })} 
                      maxLength={15} />
                  </div>
                  <div>
                    <label htmlFor="tel2" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Telefone 2:</label>
                    <input type="text" id="tel2" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ex.: 53999999999"
                      {...register("tel2", {
                        onChange: (e) => handleInput(e, maskTelefone)
                      })} 
                      maxLength={15} />
                  </div>
                </div>
              </div>
              <button type="submit" className="w-full text-white bg-amber-600 hover:bg-amber-700 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-amber-400 dark:hover:bg-amber-500 dark:focus:ring-amber-800">Finalizar</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}