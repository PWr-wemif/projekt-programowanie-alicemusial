import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider theme={{
      primaryColor: 'BlueGray',
      colors: {
      'BlueGray': [
        '#f3f4f7',
        '#e5e5e7',
        '#c6c8ce',
        '#a7aab7',
        '#8c90a2',
        '#7b8096',
        '#717792',
        '#60667f',
        '#555a72',
        '#474e66'
      ]
    }}}>
     <App />
    </MantineProvider>
  </React.StrictMode>,
)
