import { useEffect, useState } from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryPie, VictoryLabel, VictoryLine } from "victory";

const apiUrl = import.meta.env.VITE_API_URL;

type RankingType = {
    nome: string;
    total: number;
}
type CategoriaReservasType = {
    categoria: string;
    total: number;
}
type NovosClientesType = {
    mes: string;
    total: number;
}
type GeralDadosType = {
    clientes: number;
    ferramentas: number;
    reservas: number;
}

export default function AdminDashboard() {
    const [dadosGerais, setDadosGerais] = useState<GeralDadosType>({} as GeralDadosType);
    const [topFerramentas, setTopFerramentas] = useState<RankingType[]>([]);
    const [topMarcas, setTopMarcas] = useState<RankingType[]>([]);
    const [reservasCategoria, setReservasCategoria] = useState<CategoriaReservasType[]>([]);
    const [novosClientes, setNovosClientes] = useState<NovosClientesType[]>([]);

    useEffect(() => {
        const fetchData = async (endpoint: string, setter: Function) => {
            try {
                const response = await fetch(`${apiUrl}${endpoint}`);
                if (!response.ok) {
                    throw new Error(`Erro ao buscar dados de ${endpoint}`);
                }
                const data = await response.json();
                setter(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData("/dashboard/gerais", setDadosGerais);
        fetchData("/dashboard/topFerramentas", setTopFerramentas);
        fetchData("/dashboard/topMarcas", setTopMarcas);
        fetchData("/dashboard/reservasCategoria", setReservasCategoria);
        fetchData("/dashboard/novosClientesMes", setNovosClientes);
    }, []);

    const topFerramentasData = topFerramentas.map(item => ({ x: item.nome, y: item.total }));
    const topMarcasData = topMarcas.map(item => ({ x: item.nome, y: item.total }));
    const reservasCategoriaData = reservasCategoria.map(item => ({ x: item.categoria, y: item.total }));

    const mesesOrdenados = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
    const novosClientesData = [...novosClientes]
        .sort((a, b) => mesesOrdenados.indexOf(a.mes) - mesesOrdenados.indexOf(b.mes))
        .map(item => ({ x: item.mes, y: item.total }));

    const chartTitleStyle = {
        fontSize: 14,
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        fontWeight: 'bold',
        fill: '#334155'
    };
    const barChartAxisStyle = {
        tickLabels: {
            fontSize: 7,
            padding: 5,
            angle: -45,
            textAnchor: 'end',
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
        }
    };

    return (
        <div className="p-6 mt-32 bg-slate-50">
            <h2 className="text-4xl font-extrabold text-slate-800 mb-8">Visão Geral do Sistema</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-3 rounded-xl shadow-lg text-center border-l-4 border-blue-500">
                    <span className="text-4xl font-bold block text-slate-700">{dadosGerais.clientes}</span>
                    <p className="text-base font-medium text-slate-500 mt-2">Clientes Cadastrados</p>
                </div>
                <div className="bg-white p-3 rounded-xl shadow-lg text-center border-l-4 border-red-500">
                    <span className="text-4xl font-bold block text-slate-700">{dadosGerais.ferramentas}</span>
                    <p className="text-base font-medium text-slate-500 mt-2">Ferramentas no Catálogo</p>
                </div>
                <div className="bg-white p-3 rounded-xl shadow-lg text-center border-l-4 border-green-500">
                    <span className="text-4xl font-bold block text-slate-700">{dadosGerais.reservas}</span>
                    <p className="text-base font-medium text-slate-500 mt-2">Total de Reservas</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                <div className="bg-white p-2 rounded-xl shadow-lg min-h-[500px]">
                    <VictoryChart
                        theme={VictoryTheme.material}
                        domainPadding={20}
                        padding={{ top: 50, bottom: 80, left: 50, right: 30 }}
                    >
                        <VictoryLabel text="Top 5 Ferramentas Mais Reservadas" x={165} y={10} textAnchor="middle" style={chartTitleStyle} />
                        <VictoryAxis style={barChartAxisStyle} />
                        <VictoryAxis dependentAxis tickFormat={(x) => (`${x}`)} />
                        <VictoryBar data={topFerramentasData} x="x" y="y" style={{ data: { fill: "#3b82f6" } }} />
                    </VictoryChart>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-lg min-h-[500px]">
                    <VictoryChart
                        theme={VictoryTheme.material}
                        domainPadding={20}
                        padding={{ top: 50, bottom: 80, left: 50, right: 30 }}
                    >
                        <VictoryLabel text="Top 5 Marcas Mais Populares" x={175} y={10} textAnchor="middle" style={chartTitleStyle} />
                        <VictoryAxis style={barChartAxisStyle} />
                        <VictoryAxis dependentAxis tickFormat={(x) => (`${x}`)} />
                        <VictoryBar data={topMarcasData} x="x" y="y" style={{ data: { fill: "#ef4444" } }} />
                    </VictoryChart>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-lg min-h-[500px]">
                    <svg viewBox="0 0 400 400">
                        <VictoryLabel text="Reservas por Categoria" x={185} y={10} textAnchor="middle" style={chartTitleStyle} />
                        <VictoryPie
                            standalone={false}
                            width={400} height={400}
                            data={reservasCategoriaData}
                            innerRadius={0}
                            labelRadius={100}
                            style={{ labels: { fontSize: 12, fill: "black", fontWeight: "semibold" } }}
                            colorScale={["#10b981", "#f97316", "#8b5cf6", "#f59e0b"]}
                        />
                        <VictoryLabel
                            textAnchor="middle"
                            style={{ fontSize: 18, fontWeight: 'bold', fill: 'white' }}
                            x={200} y={200}
                            text="Categorias"
                        />
                    </svg>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-lg min-h-[500px]">
                    <VictoryChart
                        theme={VictoryTheme.material}
                        padding={{ top: 50, bottom: 50, left: 50, right: 30 }}
                    >
                        <VictoryLabel text="Novos Clientes por Mês" x={170} y={10} textAnchor="middle" style={chartTitleStyle} />
                        <VictoryAxis />
                        <VictoryAxis dependentAxis />
                        <VictoryLine
                            data={novosClientesData}
                            style={{
                                data: { stroke: "#14b8a6", strokeWidth: 3 },
                                parent: { border: "1px solid #ccc" }
                            }}
                        />
                    </VictoryChart>
                </div>
            </div>
        </div>
    );
}

