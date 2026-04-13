import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' 
import HeritageManager from './HeritageManager'


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <HeritageManager/>
  </StrictMode>,
)