import { Label, Select } from "flowbite-react";
import type { FieldValues, UseFormRegister } from "react-hook-form";


const niveis = [
  { id: "ADMIN", nome: "Administrador" },
  { id: "MODERADOR", nome: "Moderador" },
  { id: "COMUM", nome: "Comum" }
]

type SelectNivelProps = {
  register: UseFormRegister<FieldValues>
}

export default function SelectNivel({ register }: SelectNivelProps) {

  return (
    <div className="max-w-md">
      <div className="mb-2 block">
        <Label htmlFor="niveis">Nível</Label>
      </div>
      <Select id="niveis" required {...register("nivel")}>
        <option value="" disabled >Selecione o nível</option>
        {niveis.map(nivel => (
          <option value={nivel.id} >{nivel.nome}</option>
        ))}
      </Select>
    </div>
  )
}