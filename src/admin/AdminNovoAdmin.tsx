import { toast } from "sonner"
import { useForm } from "react-hook-form"
// import { useState, useEffect } from "react"
// import type { AdminType } from "../utils/AdminType"
import { useAdminStore } from "./context/AdminContext"

const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
  nome: string
  email: string
  senha: string
  senha2: string
  token: string
  nivel: number
  adminId: string
}

export default function AdminNovoAdmin() {
  const { admin } = useAdminStore()

  const {
    register,
    handleSubmit,
    reset
  } = useForm<Inputs>()

  async function incluirAdmin(data: Inputs) {

    if (data.senha != data.senha2) {
      toast.error("Erro... Senha e Confirme Senha precisam ser iguais")
      return
    }

    const response = await fetch(`${apiUrl}/admins`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${admin.token}`
        },
        body: JSON.stringify({
          nome: data.nome,
          email: data.email,
          senha: data.senha,
          token: data.token,
          nivel: Number(data.nivel),
          adminId: admin.id
        })
      },
    )

    if (response.status == 201) {
      toast.success("Ok! Admin cadastrado com sucesso")
      reset()
    } else {
      toast.error("Erro no cadastro do Admin...")
    }
  }

  return (
    <>
      <h1 className="mb-4 mt-24 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white me-56">
        Inclusão de Administradore do Sistema
      </h1>

      <form className="max-w-xl mx-auto" onSubmit={handleSubmit(incluirAdmin)}>
        <div className="mb-3">
          <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Nome do Administrador</label>
          <input type="text" id="nome"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nome completo" required
            {...register("nome")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            E-Mail</label>
          <input type="email" id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="nome@gmail.com" required
            {...register("email")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="senha" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Senha</label>
          <input type="password" id="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" required
            {...register("senha")}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Confirme a Senha</label>
          <input type="password" id="confirm-password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="••••••••" required
            {...register("senha2")}
          />
        </div>
        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div className="mb-3">
            <label htmlFor="nivel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Nível</label>
            <input type="number" id="nivel"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              {...register("nivel")}
            />
          </div>
        </div>
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Incluir</button>
      </form>
    </>
  )
}

