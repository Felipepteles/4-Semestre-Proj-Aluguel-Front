import type { CategoriaType } from "./CategoriaType"
import type { MarcaType } from "./MarcaType"
import type {AdminType} from "./AdminType"

export type FerramentaType = {
    id: number
    nome: string
    descricao: string
    foto: string
    preco: number
    status: boolean
    createdAt: Date
    updatedAt: Date
    categoriaId: number
    categoria: CategoriaType
    marcaId: number
    marca: MarcaType
    adminId: string
    admin: AdminType
}

