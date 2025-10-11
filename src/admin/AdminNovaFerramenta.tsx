import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { useState, useEffect } from "react"
import type { MarcaType } from "../utils/MarcaType"
import type { CategoriaType } from "../utils/CategoriaType"
import { useAdminStore } from "./context/AdminContext"

const apiUrl = import.meta.env.VITE_API_URL

type Inputs = {
  nome: string
  descricao: string
  foto: string
  preco: number
  marcaId: number
  categoriaId: number
  adminId: string
}

export default function AdminNovoCarro() {
  const [marcas, setMarcas] = useState<MarcaType[]>([])
  const [categorias, setCategorias] = useState<CategoriaType[]>([])
  const { admin } = useAdminStore()

  const {
    register,
    handleSubmit,
    reset,
    setFocus
  } = useForm<Inputs>()

  useEffect(() => {
    async function getMarcas() {
      const response = await fetch(`${apiUrl}/marcas`)
      const dados = await response.json()
      setMarcas(dados)
    }
    getMarcas()
    setFocus("nome")

    async function getCategorias() {
      const response = await fetch(`${apiUrl}/categorias`)
      const dados = await response.json()
      setCategorias(dados)
    }
    getCategorias()
    setFocus("nome")

  }, [])



  const optionsMarca = marcas.map(marca => (
    <option key={marca.id} value={marca.id}>{marca.nome}</option>
  ))

  const optionsCategoria = categorias.map(categoria => (
    <option key={categoria.id} value={categoria.id}>{categoria.nome}</option>
  ))

  async function incluirFerramenta(data: Inputs) {

    const novaFerramenta: Inputs = {
      nome: data.nome,
      descricao: data.descricao,
      foto: data.foto,
      preco: Number(data.preco),
      marcaId: Number(data.marcaId),
      categoriaId: Number(data.categoriaId),
      adminId: admin.id
    }

    const response = await fetch(`${apiUrl}/ferramentas`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${admin.token}`
        },
        body: JSON.stringify(novaFerramenta)
      },
    )

    if (response.status == 201) {
      toast.success("Ok! Ferramenta cadastrada com sucesso")
      reset()
    } else {
      toast.error("Erro no cadastro da Ferramenta...")
    }
  }

  return (
    <>
      <h1 className="mb-4 mt-24 text-2xl font-bold leading-none tracking-tight text-gray-900 md:text-3xl lg:text-4xl dark:text-white me-56">
        Inclusão de Ferramentas
      </h1>

      <form className="max-w-xl mx-auto" onSubmit={handleSubmit(incluirFerramenta)}>
        <div className="mb-3">
          <label htmlFor="nome" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Nome da Ferramenta</label>
          <input type="text" id="nome"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
            {...register("nome")}
          />
        </div>
        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div className="mb-3">
            <label htmlFor="marcaId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Marca</label>
            <select id="marcaId"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              {...register("marcaId")}
            >
              {optionsMarca}
            </select>
          </div>
        </div>

        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div className="mb-3">
            <label htmlFor="marcaId" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Categoria</label>
            <select id="categoriaId"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              {...register("categoriaId")}
            >
              {optionsCategoria}
            </select>
          </div>
        </div>
        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div className="mb-3">
            <label htmlFor="preco" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Preço R$</label>
            <input type="number" id="preco"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              {...register("preco")}
            />
          </div>
        </div>
        <div className="grid gap-6 mb-3 md:grid-cols-2">
          <div className="mb-3">
            <label htmlFor="foto" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              URL da Foto</label>
            <input type="text" id="foto"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required
              {...register("foto")}
            />
          </div>

        </div>

        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Incluir</button>
      </form>
    </>
  )
}

