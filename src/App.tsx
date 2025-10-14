import { CardFerramenta } from "./components/./CardFerramenta";
import { InputPesquisa } from "./components/InputPesquisa";
import type { FerramentaType } from "./utils/FerramentaType";
import { useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL

export default function App() {
  const [ferramentas, setFerramentas] = useState<FerramentaType[]>([])

  async function buscaDados() {
    const response = await fetch(`${apiUrl}/ferramentas`)
    if (response.status == 401) {
      localStorage.removeItem("clienteKey")
    }
    const dados = await response.json()
    setFerramentas(dados)
  }
  useEffect(() => {
    buscaDados()
  }, [])

  const limpaPesquisa = () => {
    setFerramentas([])
    buscaDados()
  }
  const listaFerramentas = ferramentas.map(ferramenta => (
    <CardFerramenta ferramenta={ferramenta} key={ferramenta.id} />
  ))
  return (
    <>
      <InputPesquisa setFerramentas={setFerramentas} limpar={limpaPesquisa} />
      <div className="max-w-7xl mx-auto">
        <h1 className="[text-shadow:_0_2px_4px_rgba(0,0,0,0.5)] mb-4 text-4xl font-noto p-3 font-bold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-6xl dark:text-white">
          Ferramentas <span className="underline underline-offset-3 decoration-8 decoration-blue-700 dark:decoration-blue-600">disponíveis</span>
        </h1>
        <div className="flex gap-3 flex-wrap justify-around">
          {listaFerramentas}
        </div>
      </div>
    </>
  )
}
