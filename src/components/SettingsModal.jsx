import { Button, Form, Modal } from "react-bootstrap";
import { useRef, useState } from 'react'
import {currencyData} from '../currency-details'
import { useCurrencies } from "../contexts/CurrencyContext";


export default function SettingsModal({show, handleClose}) {
    const {savedCurrency, changeCurrency} = useCurrencies()

    const currencies = Object.values(currencyData[0])

    function changeCurrentCurrency(currency){
        changeCurrency(currency)
        
        handleClose()
        
    }

  return (
    <Modal show = {show} onHide={handleClose}>
        <Form>
            <Modal.Header closeButton>
                <Modal.Title>Settings</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group className="mb-3" controlId="categoryId">
                    <Form.Label>Currency</Form.Label>
                    <Form.Select onChange={(e) => changeCurrentCurrency(e.target.value)}>
                        <option key={savedCurrency} value={savedCurrency}>{savedCurrency}</option>
                        {currencies.map(currency => (<option key={currency.code} value={currency.code}>{currency.name}</option>))}
                    </Form.Select>
                </Form.Group>
            </Modal.Body>

        </Form>
    </Modal>
  )
}
