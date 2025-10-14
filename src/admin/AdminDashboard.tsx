import './AdminDashboard.css'
import { useEffect, useState } from "react";
import { VictoryPie, VictoryLabel, VictoryTheme } from "victory";

const apiUrl = import.meta.env.VITE_API_URL

type graficoMarcaType = {
  marca: string
  num: number
}

type graficoClienteType = {
  cidade: string
  num: number
}

type geralDadosType = {
  clientes: number
  ferramentas: number
  reservas: number
}

export default function AdminDashboard() {
  const [ferramentasMarca, setFerramentasMarca] = useState<graficoMarcaType[]>([])
  const [clientesCidade, setClientesCidade] = useState<graficoClienteType[]>([])
  const [dados, setDados] = useState<geralDadosType>({} as geralDadosType)

  useEffect(() => {
    async function getDadosGerais() {
      const response = await fetch(`${apiUrl}/dashboard/gerais`)
      const dados = await response.json()
      setDados(dados)
    }
    getDadosGerais()

    async function getDadosGraficoMarca() {
      const response = await fetch(`${apiUrl}/dashboard/ferramentasMarca`)
      const dados = await response.json()
      setFerramentasMarca(dados)
    }
    getDadosGraficoMarca()

    async function getDadosGraficoCliente() {
      const response = await fetch(`${apiUrl}/dashboard/clientesCidade`)
      const dados = await response.json()
      setClientesCidade(dados)
    }
    getDadosGraficoCliente()

  }, [])

  const listaFerramentasMarca = ferramentasMarca.map(item => (
    { x: item.marca, y: item.num }
  ))

  const listaClientesCidade = clientesCidade.map(item => (
    { x: item.cidade, y: item.num }
  ))

  return (
    <div className="container mt-24">
      <h2 className="text-3xl mb-4 font-bold">Visão Geral do Sistema</h2>

      <div className="w-2/3 flex justify-between mx-auto mb-5">
        <div className="border-blue-600 border rounded p-6 w-1/3 me-3">
          <span className="bg-blue-100 text-blue-800 text-xl text-center font-bold mx-auto block px-2.5 py-2 rounded dark:bg-blue-900 dark:text-blue-300">
            {dados.clientes}</span>
          <p className="font-bold mt-2 text-center">Nº Clientes</p>
        </div>
        <div className="border-red-600 border rounded p-6 w-1/3 me-3">
          <span className="bg-red-100 text-red-800 text-xl text-center font-bold mx-auto block px-2.5 py-2 rounded dark:bg-red-900 dark:text-red-300">
            {dados.ferramentas}</span>
          <p className="font-bold mt-2 text-center">Nº Ferramentas</p>
        </div>
        <div className="border-green-600 border rounded p-6 w-1/3">
          <span className="bg-green-100 text-green-800 text-xl text-center font-bold mx-auto block px-2.5 py-2 rounded dark:bg-green-900 dark:text-green-300">
            {dados.reservas}</span>
          <p className="font-bold mt-2 text-center">Nº Reservas</p>
        </div>
      </div>

      <div className="div-graficos">
        <svg className='flex items-baseline justify-center' viewBox="30 55 400 400">
          <VictoryPie
            standalone={false}
            width={365}
            height={400}
            data={listaFerramentasMarca}
            innerRadius={0}
            labelRadius={80}
            theme={VictoryTheme.material}
            style={{
              labels: {
                fontSize: 9,
                fill: "#000000",
                fontFamily: "Arial",
                fontWeight: "bold"
              }
            }}
          />
          <VictoryLabel
            textAnchor="middle"
            style={{
              fontSize: 12,
              fill: "#000000",
              fontFamily: "Arial",
              fontWeight: "bold",
            }}
            x={300}
            y={60}
            text={["Ferramentas por Marca"]}
          />
        </svg>

        <svg className='flex items-baseline justify-center' viewBox="30 55 400 400">
          <VictoryPie
            standalone={false}
            width={365}
            height={400}
            data={listaClientesCidade}
            innerRadius={0}
            labelRadius={80}
            theme={VictoryTheme.material}
            style={{
              labels: {
                fontSize: 9,
                fill: "#000000",
                fontFamily: "Arial",
                fontWeight: "bold"
              }
            }}
          />
          <VictoryLabel
            textAnchor="middle"
            style={{
              fontSize: 12,
              fill: "#000000",
              fontFamily: "Arial",
              fontWeight: "bold"
            }}
            x={300}
            y={60}
            text={["Clientes por Cidade"]}
          />
        </svg>
      </div>
    </div>
  )
}