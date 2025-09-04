import React from 'react'
import { Container, Divider } from '@mui/material'
import FileUpload from './components/FileUpload'

const App = () => (
  <Container maxWidth="lg" sx={{ py: 4 }}>
    <FileUpload />
    <Divider sx={{ my: 3 }} />
  </Container>
)

export default App