import React from 'react'
import ReactDOM from 'react-dom/client'
import { Tusmo } from './Tusmo.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Tusmo wordToFind='funeraire' />
  </React.StrictMode>
)
