import { Button, Form, Modal } from "react-bootstrap";
import { useRef } from 'react'
import { OTHER_BUDGET_ID, useCategories } from "../contexts/CategoriesContext";

export default function AddExpenseModal({show, defaultCategoryId, handleClose}) {
    const descriptionRef = useRef()
    const amountRef = useRef()
    const CategoryIdRef = useRef()
    const {addExpense, categories} = useCategories()


    function handleSubmit(e){
        e.preventDefault()
        addExpense(
        {
            description:descriptionRef.current.value,
            amount:parseFloat(amountRef.current.value),
            categoryId: CategoryIdRef.current.value
        })
        handleClose()
        
    }

  return (
    <Modal show = {show} onHide={handleClose}>
        <Form onSubmit={handleSubmit}>
            <Modal.Header closeButton>
                <Modal.Title>New Expense</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group className="mb-3" controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control ref={descriptionRef} type="text" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="amount">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control ref={amountRef} type="number" required min={0} step={0.01} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="categoryId">
                    <Form.Label>Category</Form.Label>
                    <Form.Select defaultValue={defaultCategoryId} ref={CategoryIdRef}>
                        <option id={OTHER_BUDGET_ID}>Other</option>
                        {categories.map(category => (<option key={category.id} value={category.id}>{category.name}</option>))}
                    </Form.Select>
                </Form.Group>
                <div className="d-flex justify-content-end">
                    <Button variant="primary" type="submit">Add</Button>
                </div>
            </Modal.Body>

        </Form>
    </Modal>
  )
}
