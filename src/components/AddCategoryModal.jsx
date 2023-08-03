import { Button, Form, Modal } from "react-bootstrap";
import { useRef } from 'react'
import { useCategories } from "../contexts/CategoriesContext";

export default function AddCategoryModal({show, handleClose}) {
    const nameRef = useRef()
    const maxRef = useRef()
    const {addCategory} = useCategories()


    function handleSubmit(e){
        e.preventDefault()
        addCategory(
            {
                name:nameRef.current.value,
                max:parseFloat(maxRef.current.value)
        })
        handleClose()
        
    }

  return (
    <Modal show = {show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>New Category</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control ref={nameRef} type="text" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="max">
                    <Form.Label>Maximum Spending</Form.Label>
                    <Form.Control ref={maxRef} type="number" required min={0} step={0.01} />
                </Form.Group>
                <div className="d-flex justify-content-end">
                    <Button variant="primary" type="submit">Add</Button>
                </div>
            </Modal.Body>

        </Form>
    </Modal>
  )
}
