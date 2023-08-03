import React from 'react'
import { Button, Container, Stack } from "react-bootstrap";
import CategoryCard from "./components/CategoryCard";
import AddCategoryModal from "./components/AddCategoryModal";
import { useState } from "react";
import { OTHER_BUDGET_ID, useCategories } from "./contexts/CategoriesContext";
import AddExpenseModal from "./components/AddExpenseModal";
import OtherCategoryCard from "./components/OtherCategoryCard";
import TotalCategoryCard from "./components/TotalCategoryCard";
import ViewExpensesModal from "./components/ViewExpensesModal";
import {PieChart} from "./components/PieChart";
import TransactionList from "./components/TransactionList";
import './App.css';
import { Gear, MinusCircle, Plus } from "phosphor-react";
import SettingsModal from './components/SettingsModal';


function App() {
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false)
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState(false)
  const [viewExpensesModalCategoryId, setViewExpensesModalCategoryId] = useState()
  const [addExpenseModalCategoryId, setAddExpenseModalCategoryId] = useState()
  const {categories, getCategoryExpenses}  = useCategories()



  function openAddExpenseModal(categoryId){
    setShowAddExpenseModal(true)
    setAddExpenseModalCategoryId(categoryId)
  }
  return (
    <>
    <Container className="my-4">
      
      <div className="outer-expense-btn">
        <button className="expense-btn" onClick={() => openAddExpenseModal(OTHER_BUDGET_ID)}><MinusCircle size={80}/></button>
      </div>
      
      <Stack direction="horizontal" gap="2" className="mb-4">
        <h1 className="me-auto">Monya</h1>
        {/*<Button variant="primary" onClick={() => setShowAddCategoryModal(true)}>Add Category</Button>*/}
        <Button onClick={() => setShowSettingsModal(true)}><Gear size={30} /></Button>
      </Stack>

      <PieChart/>


      <div style={ {display:"grid", gridTemplateColumns:"repeat(auto-fill, minmax(300px, 1fr))", gap:"1rem", alignItems:"flex-start" }}>
      {categories.map(category => {
        const amount = getCategoryExpenses(category.id).reduce((total, expense) => total + expense.amount, 0)

        return (
          <CategoryCard 
            key={category.id} 
            name = {category.name} 
            amount = {amount} 
            max = {category.max}
            onAddExpenseClick={() => openAddExpenseModal(category.id)}
            onViewExpensesClick={() => setViewExpensesModalCategoryId(category.id)}

          />
        )
})}
      <OtherCategoryCard 
        onAddExpenseClick={openAddExpenseModal} 
        onViewExpensesClick={() => setViewExpensesModalCategoryId(OTHER_BUDGET_ID)} 
      />
      
      <TotalCategoryCard />
      <Button variant="primary" className="p-4" onClick={() => setShowAddCategoryModal(true)}><Plus size={50}/></Button>

      </div>
      <TransactionList/>
    </Container>
    

    <AddCategoryModal show={showAddCategoryModal} handleClose={() => setShowAddCategoryModal(false)}/>
    <AddExpenseModal show={showAddExpenseModal} defaultCategoryId={addExpenseModalCategoryId} handleClose={() => setShowAddExpenseModal(false)}/>
    <SettingsModal show={showSettingsModal} handleClose={() => setShowSettingsModal(false)}></SettingsModal>
    <ViewExpensesModal categoryId={viewExpensesModalCategoryId} handleClose={() => setViewExpensesModalCategoryId()}></ViewExpensesModal>
    
    
    </>
  )
}

export default App;
