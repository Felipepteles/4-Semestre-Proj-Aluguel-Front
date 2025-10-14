import type { EnderecoType } from "./EnderecoType"
import type { TelefoneType } from "./TelefoneType"

export type ClienteType = {
    id: string
    nome: string
    email: string
    cpf: string
    enderecoId: string
    Endereco: EnderecoType[]
    telefoneId: string
    Telefone: TelefoneType[]
}