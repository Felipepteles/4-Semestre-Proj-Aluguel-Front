import { CardFerramenta } from "./components/./CardFerramenta";
import { InputPesquisa } from "./components/InputPesquisa";
import type { FerramentaType } from "./utils/FerramentaType";
import { useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL

export default function App() {
  const [ferramentas, setFerramentas] = useState<FerramentaType[]>([])

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${apiUrl}/ferramentas`)
      const dados = await response.json()
      setFerramentas(dados)
    }
    buscaDados()
  }, [])

  const listaFerramentas = ferramentas.map( ferramenta => (
    <CardFerramenta ferramenta={ferramenta} key={ferramenta.id}/>
  ))
  return (
    <>
      <InputPesquisa setFerramentas={setFerramentas} />
      <div className="max-w-7xl mx-auto">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          Ferramenta <span className="underline underline-offset-3 decoration-8 decoration-orange-400 dark:decoration-orange-600">em destaque</span>
        </h1>
        <div className="flex gap-3">
          {listaFerramentas}
        </div>
      </div>
    </>
  )
}
