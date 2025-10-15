import { Button, Modal, ModalBody, ModalHeader, type ModalProps } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

type ConfirmModalProps = ModalProps & {
  onSuccess: () => void
  title: string
}

export default function ConfirmModal({ show, onClose, onSuccess, title}: ConfirmModalProps) {

  return (
    <>
      <Modal show={show} size="md" onClose={onClose} popup>
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              {title}
            </h3>
            <div className="flex justify-center gap-4">
              <Button className="cursor-pointer" color="blue" onClick={onSuccess}>
                Sim
              </Button>
              <Button className="cursor-pointer" color="alternative" onClick={onClose}>
                Não
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  )
}