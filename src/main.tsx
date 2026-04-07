import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import RoleGuard from './components/RoleGuard'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Pets from './pages/Pets'
import MedicalRecords from './pages/MedicalRecords'
import Specialists from './pages/Specialists'
import Services from './pages/Services'
import Shop from './pages/Shop'
import Testimonials from './pages/Testimonials'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/specialists" element={<Specialists />} />
          <Route path="/services" element={<Services />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/dashboard" element={
            <RoleGuard>
              <Dashboard />
            </RoleGuard>
          }/>
          <Route path="/pets" element={
            <RoleGuard>
              <Pets />
            </RoleGuard>
          }/>
          <Route path="/pets/:petId/records" element={
            <RoleGuard>
              <MedicalRecords />
            </RoleGuard>
          }/>
          <Route path="/testimonials" element={
            <RoleGuard>
              <Testimonials />
            </RoleGuard>
          }/>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)