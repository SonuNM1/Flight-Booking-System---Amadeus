
import './App.css';
import Login from './components/Login';
import Register from './components/Register';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Homepage from './pages/Homepage';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path="/" element={<Homepage/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
