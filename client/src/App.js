import './App.css';
import Home from './components/Home'
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import LoginForm from './components/Login';
import { useState } from 'react';

function App() {
  const [userLoggedIn, setUserLoggedIn] = useState()

  if (!userLoggedIn) return <LoginForm setUserLoggedIn={setUserLoggedIn} />
  else return <Home />

  // return (
  //   <Router>
  //     <div className="App">
  //       <Routes>
  //         <Route path='/' element={<Home />} />
  //         {/* <Route path='/login' element={<LoginForm />} /> */}
  //       </Routes>
  //     </div>
  //   </Router>
  // );
}

export default App;
