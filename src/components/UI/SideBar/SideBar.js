import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal'


const SidebarModal = () => {
  const [smShow, setSmShow] = useState(false);


  return (
  <>
      <button onClick={() => setSmShow(true)}>Small modal</button>{' '}
      <Modal className='cart-modal'
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Small Modal
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>...</Modal.Body>
      </Modal>
  </>
  )
}

export default SidebarModal
