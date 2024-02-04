import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Login/Login';
import useToken from './useToken';

function App() {
  const { token, setToken, resetToken } = useToken();

  if(!token) {
    return <div className="App">
      <header className="App-header">
        <div className="wrapper">
          <h1>Application</h1><Login setToken={setToken} />
          </div>
      </header>
    </div>
  }

  return (
    <div className="App">
      <div className="App-header">
        <div className="wrapper">
          <h1>Application</h1>
          <h1 onClick={resetToken}>Logout</h1>
          
        </div>
      </div>
      <div>
          <Router>
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Router>
      </div>
    </div>
  );
}

export default App;
