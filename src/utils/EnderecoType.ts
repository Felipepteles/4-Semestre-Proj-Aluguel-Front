import type { ClienteType } from "./ClienteType"

export type EnderecoType = {
    id: number
    logradouro: string
    num: number
    bairro: string
    cidade: string
    estado: string
    cep: number
    clienteId: number
    cliente: ClienteType
}

