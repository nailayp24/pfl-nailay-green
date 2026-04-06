import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' 
import CoffeeMemberForm from './CoffeeMemberForm.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CoffeeMemberForm />
  </StrictMode>,
)