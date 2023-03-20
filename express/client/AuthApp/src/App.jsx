import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import useApi from './customHook/dbData'
function App() {
  const { createData, deleteData, loading, error, data, updateData } = useApi("http://localhost:5000/api/auth");
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  function handleRegister() {
    createData({ userName, email, password })
  }
  if (loading) {
    return <h1>Loading....</h1>
  }
  return (
    <div className="App">
      <form className="form-register" onSubmit={handleRegister}>
        <div>
          <label htmlFor="UserName">user name</label>
          <input type="text" name='userName' id='userName' onChange={(e) => { setUserName(e.target.value) }} />
        </div>
        <div>
          <label htmlFor="email">email</label>
          <input type="email" name='email' id='email' onChange={(e) => { setEmail(e.target.value) }} />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input type="password" name='password' id='password' onChange={(e) => { setPassword(e.target.value) }} />
        </div>
        <input type="submit" value="register" />
      </form>
      {error ? <h1>{error.message} </h1> : null}
    </div>
  )
}

export default App
