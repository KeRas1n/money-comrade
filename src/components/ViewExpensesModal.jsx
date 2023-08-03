import { Button, Modal, Stack } from "react-bootstrap";
import { OTHER_BUDGET_ID, useCategories } from "../contexts/CategoriesContext";
import { useCurrencies } from "../contexts/CurrencyContext";
import Currency from "react-currency-formatter";

export default function ViewExpensesModal({categoryId, handleClose}) {
    const { getCategoryExpenses, categories, deleteCategory, deleteExpense } = useCategories()
    const {savedCurrency}  = useCurrencies()


    const expenses = getCategoryExpenses(categoryId)

    const category = OTHER_BUDGET_ID === categoryId 
    ? {name:"Other", id: OTHER_BUDGET_ID} 
    : categories.find(c => c.id === categoryId)


  return (
    <Modal show = {categoryId != null} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    <Stack direction="horizontal" gap="2">
                        <div>Expenses - {category?.name}</div>
                        {categoryId !== OTHER_BUDGET_ID && (
                            <Button onClick={() => {
                                deleteCategory(category)
                                handleClose()
                            }} variant="outline-danger">Delete</Button>
                        )}
                    </Stack>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Stack direction="vetical" gap="3">
                    {expenses.map(expense => (
                        <Stack direction="horizontal" gap="2" key={expense.id}>
                            <div className="me-auto fs-4">{expense.description}</div>
                            <div className="fs-5"><Currency quantity={expense.amount} currency={savedCurrency}/></div>
                            <Button onClick={() => deleteExpense(expense)} size="sm" variant="outline-danger">
                                &times;
                            </Button>
                        </Stack>
                    ))}
                </Stack>
            </Modal.Body>

    </Modal>
  )
}
