import React, { useContext, useState } from 'react'
import {v4 as uuidV4} from 'uuid'
import useLocalStorage from '../hooks/UseLocalStorage'

const CurrencyContext = React.createContext()


export function useCurrencies(){
    return useContext(CurrencyContext)
}


export const CurrencyProvider = ({children}) =>{
    const [savedCurrency, setSavedCurrency] = useLocalStorage("currency", {})


    function changeCurrency(currency){
        setSavedCurrency(currency)
        console.log("Context - " + currency)
    }


    return <CurrencyContext.Provider value={{
        savedCurrency,
        changeCurrency
    }}>
        {children}
    </CurrencyContext.Provider>
}