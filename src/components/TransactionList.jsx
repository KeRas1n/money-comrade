import React from 'react'
import { useCategories } from "../contexts/CategoriesContext";
import { useCurrencies } from "../contexts/CurrencyContext";
import './TransactionList.module.css'
import { Stack } from 'react-bootstrap';
import Currency from "react-currency-formatter";

export default function TransactionList() {
    const {expenses, categories, getCategoryExpenses}  = useCategories()
    const {savedCurrency}  = useCurrencies()

    console.log(savedCurrency)

    const reversedExpenses = expenses.reverse()

    function groupItems(array, property) {
        return array.reduce(function(groups, item) {
            var name = item[property]
            var group = groups[name] || (groups[name] = []);
            group.push(item);
            return groups;
        }, { });
    }


    var groups = groupItems(reversedExpenses, 'date');

    let arrays = []
    

    for(var key in groups) {
        var group = groups[key];
        arrays.push({key, group})
    }

  return (
    <ul className='transactionList'>

        {arrays.reverse().map(array =>(
        //console.log(array.key)
        //<li>{array.key}</li>
        <div><li>{array.key}</li>
        {array.group.map(expense => (
            <li className='d-flex justify-content-between align-items-center'>
                <Stack direction="vertical" gap={1}>
                    <div className='fs-5'>
                    {categories.map(category =>
                        {if(category.id == expense.categoryId){
                            return category.name
                        }
                        })}
                    </div>

                    <div className='text-muted'>{expense.description}</div>

                    
                </Stack>
                <div className='fs-4'><Currency quantity={expense.amount} currency={savedCurrency}/></div>
            </li>
        ))}</div>
        
    ))}
        
        

    </ul>
  )
}
