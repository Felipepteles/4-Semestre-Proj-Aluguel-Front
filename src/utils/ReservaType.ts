import type { ClienteType } from "./ClienteType"
import type { FerramentaType } from "./FerramentaType"

export type ReservaType = {
    id: number
    ferramenta: FerramentaType
    cliente: ClienteType
    ferramentaId: number
    dataInicio: string
    clienteId: string
    descricao: string
    createdAt: string
    dataFim: string
    status: string
    valor: number
}
