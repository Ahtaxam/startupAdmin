import { Button, Modal } from "flowbite-react";
export function CustomModal({ openModal, setOpenModal, children }) {
  return (
    <>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
            {children}
        </Modal.Body>
      </Modal>
    </>
  );
}
