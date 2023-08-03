import React from 'react'
import { Route, Routes } from 'react-router'
import HomePage from '../pages/HomePage'
import SettingsPage from '../pages/SettingsPage'

export default function AppRouter() {
  return (
    <Routes>
      <Route path="home" element={<HomePage/>} />
      <Route path="settings" element={<SettingsPage/>} />
    </Routes>
  )
}
