import { useContext, useState } from 'react'
import { UserContext } from './UserContext'
import Register from './components/Register'
import Login from './components/Login'
import Navbar from './components/Navbar';
import Main from './components/Main'
import Homee from './components/Homee';
// import { BrowserRouter, Switch, Route } from 'react-router-dom';



function App() {
  const [currentForm, setCurrentForm] = useState("login")
  const currentUser = useContext(UserContext)

  function toggleForm(formName){
    setCurrentForm(formName)
  }
  
  

  return (
    <>
    {currentUser ?<>
          <Homee />
        </> :
        currentForm === "login" ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm}  />}
        
    </>
  );

  
}

export default App