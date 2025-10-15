import { toast } from "sonner";
import { FaListOl } from "react-icons/fa6";
import { TiDeleteOutline } from "react-icons/ti";
import { useAdminStore } from "../context/AdminContext";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useForm, type FieldValues, type UseFormRegister } from "react-hook-form";

import type { AdminType } from "../../utils/AdminType"
import SelectNivel from "./SelectNivel";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal";

type listaAdminProps = {
  adminLinha: AdminType;
  admins: AdminType[];
  setAdmins: React.Dispatch<React.SetStateAction<AdminType[]>>;
}

type Inputs = {
  nivel: string
}

const apiUrl = import.meta.env.VITE_API_URL

export default function ItemAdmin({ adminLinha, admins, setAdmins }: listaAdminProps) {
  const { admin } = useAdminStore()
  const [openModal, setOpenModal] = useState(false);
  const {
    register,
    handleSubmit
  } = useForm<Inputs>()
  const [confirmModal, setConfirmModal] = useState(false);

  async function excluirAdmin() {
    if (!admin || admin.nivel == "ADMIN") {
      toast.error("Você não tem permissão para excluir admins");
      return;
    }

    const response = await fetch(`${apiUrl}/admins/${adminLinha.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${admin.token}`
        },
      },
    )

    if (response.ok) {
      const admins2 = admins.filter(a => a.id != adminLinha.id)
      setAdmins(admins2)
      toast.success("Admin excluído com sucesso")
    } else {
      toast.error("Erro... Admin não foi excluído")
    }
  }

  async function alterarNivel(data: Inputs) {

    const response = await fetch(`${apiUrl}/admins/${adminLinha.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${admin.token}`
        },
        body: JSON.stringify({
          nivel: data.nivel
        })
      },
    )

    if (response.ok) {
      const admins2 = admins.map(a => {
        if (a.id == adminLinha.id) {
          return { ...a, nivel: data.nivel }
        }
        return a
      })
      setAdmins(admins2)
      toast.success("Nível Alterado com Sucesso")
      setOpenModal(false)
    } else {
      toast.error("Erro... Nível não foi alterado")
    }


  }

  return (
    <>
      <tr key={adminLinha.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
        <td className={`px-6 py-4`}>
          {adminLinha.nome}
        </td>
        <td className={`px-6 py-4`}>
          {adminLinha.email}
        </td>
        <td className={`px-6 py-4`}>
          {adminLinha.nivel}
        </td>
        <td className="px-6 py-4">
          <TiDeleteOutline className="text-3xl text-red-600 inline-block cursor-pointer" title="Excluir"
            onClick={() => setConfirmModal(true)} />&nbsp;
          <FaListOl className="text-3xl text-yellow-600 inline-block cursor-pointer" title="Alterar Nível"
            onClick={() => setOpenModal(true)} />
        </td>
      </tr>
      <Modal show={openModal} size="md" popup onClose={() => setOpenModal(false)}>
        <ModalHeader />
        <ModalBody>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Selecione o novo nível do Administrador</h3>
            <form onSubmit={handleSubmit(alterarNivel)} action="">
              <SelectNivel register={register as unknown as UseFormRegister<FieldValues>} />
              <div className="w-full mt-4">
                <Button type="submit">Confirmar</Button>
              </div>
            </form>
          </div>
        </ModalBody>
      </Modal>
      <ConfirmModal title="Tem certeza que deseja excluir o Administrador?" show={confirmModal} onClose={() => setConfirmModal(false)} onSuccess={excluirAdmin} />
    </>
  )
}
