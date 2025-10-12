import type { ClienteType } from "./ClienteType"
import type { FerramentaType } from "./FerramentaType"

export type ReservaType = {
    id: number
    ferramentaId: number
    ferramenta: FerramentaType
    clienteId: string
    cliente: ClienteType
    descricao: string
    dataInicio: string
    dataFim: string
    status: string
    valor: number
}
