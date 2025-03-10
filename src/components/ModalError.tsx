import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@heroui/modal"
import { Button } from "@heroui/button"
import { useState } from "react"
export const ModalError = ({ content, title }:
    { content: string, title: string }) => {
    const onClose = () => {
        setIsOpen(false)
    }
    const [isOpen, setIsOpen] = useState(true)
    return (<Modal isOpen={isOpen}>
        <ModalContent>
            <>
                <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                <ModalBody>
                    {content}
                </ModalBody>
                <ModalFooter>
                    <Button color="danger" variant="light" onPress={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </>

        </ModalContent>
    </Modal>)
}