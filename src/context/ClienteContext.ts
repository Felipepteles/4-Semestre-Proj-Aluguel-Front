import type { ClienteType } from '../utils/ClienteType'
import { create } from 'zustand'

type ClienteStore = {
    cliente: ClienteType
    logaCliente: (clienteLogado: ClienteType) => void
    deslogaCliente: () => void
}

const initialState = (): ClienteType => {
    const dadoSalvo = localStorage.getItem("clienteKey")
    if (dadoSalvo) {
        return JSON.parse(dadoSalvo)
    }
    return {} as ClienteType
}

export const useClienteStore = create<ClienteStore>((set) => ({
    cliente: initialState(),
    logaCliente: (clienteLogado) => set({cliente: clienteLogado}),
    deslogaCliente: () => set({cliente: {} as ClienteType})
}))