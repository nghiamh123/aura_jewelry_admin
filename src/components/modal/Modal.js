import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
} from '@chakra-ui/react';

export default function ModalComponent({
  title,
  label = '',
  size = 'xxl',
  children,
  setId = () => {},
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const openModal = () => {
    onOpen();
    setId();
  };

  return (
    <>
      <Button onClick={openModal}>{label}</Button>
      <Modal isOpen={isOpen} onClose={onClose} size={size}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>{children}</ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
