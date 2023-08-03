import React, { useContext, useState } from 'react'
import {v4 as uuidV4} from 'uuid'
import useLocalStorage from '../hooks/UseLocalStorage'

const CategoriesContext = React.createContext()

export const OTHER_BUDGET_ID = "Other"



export function useCategories(){
    return useContext(CategoriesContext)
}


export const CategoriesProvider = ({children}) =>{
    const [categories, setCategories] = useLocalStorage("categories", [])
    const [expenses, setExpenses] = useLocalStorage("expenses", [])


    function getCategoryExpenses(categoryId){
        return expenses.filter(expense => expense.categoryId === categoryId)
    }

    var today = new Date(),
    date = today.getDate() + '.' + (today.getMonth() + 1) + '.' + today.getFullYear() ;

    function addExpense({description, amount, categoryId}){
        setExpenses(prevExpenses =>{ 
            return [...prevExpenses, {id: uuidV4(), description, amount, categoryId, date}]
        })
    }
    function addCategory({name, max}){
        setCategories(prevCategories =>{
            if(prevCategories.find(category => category.name === name)){
                return prevCategories
            }
            return [...prevCategories, {id: uuidV4(), name, max}]
        })
    }
    function deleteCategory({id}){
        setExpenses(prevExpenses => {
            return prevExpenses.map(expense => {
                if(expense.categoryId !== id) return expense
                return {...expense, categoryId:OTHER_BUDGET_ID}
            })
        })
        setCategories(prevCategories =>{
            return prevCategories.filter(category => category.id !== id)
        })
        
    }
    function deleteExpense({id}){
        setExpenses(prevExpenses =>{
            return prevExpenses.filter(expense => expense.id !== id)
        })
    }


    return <CategoriesContext.Provider value={{
        categories,
        expenses,
        getCategoryExpenses,
        addExpense,
        addCategory,
        deleteCategory,
        deleteExpense
    }}>
        {children}
    </CategoriesContext.Provider>
}