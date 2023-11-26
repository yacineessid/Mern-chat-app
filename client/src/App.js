import './App.css';
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Register from './pages/Register';
import Login from './pages/Login';
import Chat from './pages/Chat';
import Navbar from './components/Navbar';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { ChatContextProvider } from './context/chatContext';
function App() {
  const {user}=useContext(AuthContext)
  return (
<ChatContextProvider user={user}>
<div className="App">

<Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={user?<Chat />:<Register/>} />
          <Route path="/login" element={user?<Chat/>:<Login/>} />
          <Route path="/" element={user?<Chat/>:<Login/>} />
          <Route path="*" element={<Navigate to="/chat" />} />
        </Routes>
      </BrowserRouter>
      </div>

      </ChatContextProvider>
  
  )
}

export default App;
