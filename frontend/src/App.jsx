// App.js
import { Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import CreatePage from './pages/CreatePage';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage.jsx';
import {useColorModeValue} from '@chakra-ui/react';
function App() {
  return (
    <>
      <Box minH="100vh" bg={useColorModeValue("gray.100","gray.900")}>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;
