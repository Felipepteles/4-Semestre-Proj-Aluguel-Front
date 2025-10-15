import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { maskCPF } from "./utils/InputMasks"

type Inputs = {
  nome: string
  email: string
  cpf: string
  senha: string
  senha2: string
}

const apiUrl = import.meta.env.VITE_API_URL

export default function CadCliente() {
  const { register, handleSubmit } = useForm<Inputs>()
  const navigate = useNavigate()

  async function cadastraCliente(data: Inputs) {

    const cleanedData = {
      ...data,
      cpf: data.cpf.replace(/\D/g, '')
    }

    if (data.senha != data.senha2) {
      toast.error("Erro... Senha e Confirme Senha precisam ser iguais")
      return
    }

    const response = await
      fetch(`${apiUrl}/clientes`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          nome: data.nome,
          cpf: cleanedData.cpf,
          email: data.email,
          senha: data.senha
        })
      })
    if (response.status == 401) {
      localStorage.removeItem("clienteKey")
    }
    const cliente = await response.json()
    console.log(response)
    if (response.status == 201) {
      toast.success("Ok! Cadastro realizado com sucesso...")
      navigate(`/completeCadCliente/${cliente.id}`)
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
    <section className="bg-gray-50/10 dark:bg-gray-900 py-10">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-auto lg:py-0">
        <div className="w-full bg-white rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 shadow-lg shadow-gray-500/70">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Cadastro de Cliente
            </h1>
            <form className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(cadastraCliente)}>
              <div>
                <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome:</label>
                <input type="text" id="nome" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Seu nome completo" required
                  {...register("nome")} />
              </div>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">E-mail:</label>
                <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="nome@gmail.com" required
                  {...register("email")} />
              </div>
              <div>
                <label htmlFor="cpf" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">CPF:</label>
                <input type="text" id="cpf" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Somente números" required
                  {...register("cpf", {
                    onChange: (e) => handleInput(e, maskCPF)
                  })} 
                  maxLength={14} />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha de Acesso:</label>
                <input type="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
                  {...register("senha")} />
              </div>
              <div>
                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirme a Senha:</label>
                <input type="password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
                  {...register("senha2")} />
              </div>
              <button type="submit" className="w-full text-white bg-amber-600 hover:bg-amber-700 focus:ring-4 focus:outline-none focus:ring-amber-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-amber-400 dark:hover:bg-amber-500 dark:focus:ring-amber-800">Criar sua Conta</button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Já possui uma conta? <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Faça Login</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}