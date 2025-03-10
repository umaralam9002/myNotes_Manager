import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import React from "react";
import Home from "./components/Home.jsx";
import Navbar from "./components/Navbar.jsx";
import Personal from "./components/Personal.jsx";
import AuthSlider from "./components/Authslider.jsx";
import TaskState from "./contextApi/TaskState.jsx";
import "./App.css";
import Educational from "./components/Educational.jsx";
import Working from "./components/Working.jsx";
import General from "./components/General.jsx";
import { ToastContainer } from "react-toastify";

function App() {

   

  return (
    <TaskState>
      <Router>
        <AppContent />
      </Router>
    </TaskState>
  );
}

function AppContent() {

  
  const location = useLocation();
  const isAuthPage = location.pathname.startsWith("/auth"); 

  return (
    <>
      {!isAuthPage && <Navbar className="fixed top-0 w-full z-50" />}

      <div className="min-h-screen w-screen bg-gradient-to-br from-blue-400 via-purple-300 to-pink-300 pt-16 h-[calc(100vh-4rem)] overflow-y-auto">
        <Routes>
          <Route exact path="/" element={<Home  />} />
          <Route exact path="/personal" element={<Personal  />} />
          <Route exact path="/educational" element={<Educational  />} />
          <Route exact path="/working" element={<Working  />} />
          <Route exact path="/general" element={<General  />} />
          <Route exact path="/auth" element={<AuthSlider  />} />
        </Routes>
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
