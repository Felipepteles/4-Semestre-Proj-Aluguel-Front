import type { ClienteType } from "./ClienteType"
import type { FerramentaType } from "./FerramentaType"

export type ReservaType = {
    id: number
    dataInicio: string
    dataFim: string
    status: string
    valor: number
    descricao: string
    clienteId: string
    cliente: ClienteType
    ferramentaId: number
    ferramenta: FerramentaType
}
