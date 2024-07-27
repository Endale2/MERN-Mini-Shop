import { Routes, Route } from 'react-router-dom'
import { Button, Box } from '@chakra-ui/react'
import CreatePage from './pages/CreatePage'
import NavBar from './components/NavBar'
import HomePage from './pages/HomePage'




function App() {
  

  return (
    <>
    <Box minH="100vh" />
    <NavBar />
      <Routes>
        <Route path="/" element ={<HomePage />} />
        <Route path="/create" element ={<CreatePage />} />
    
      </Routes>
    </>
  )
}

export default App
