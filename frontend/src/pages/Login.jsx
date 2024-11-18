import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import './login.css'

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()

    const handleChanges = (e) => {
        setValues({...values, [e.target.name]:e.target.value})
    }
    const handleSumbit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3000/auth/login', values)
            if(response.status === 201) {
                localStorage.setItem('token', response.data.token)
                navigate('/home')
            }
        } catch(err) {
            console.log(err.message)
        }
    }
  return (
    <div className='form-container'>
        
            <h2 className='text-lg font-bold mb-4 text-center'>Login</h2>
            <form onSubmit={handleSumbit}>
                <div className="mb-4">
                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder='Enter Email'
                    name="email" onChange={handleChanges}/>
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className='block text-gray-700'>Password</label>
                    <input type="password" placeholder='Enter Password'
                    name="password" onChange={handleChanges}/>
                </div>
                <button>Submit</button>
            </form>
            <br />
            <div className="text-center">
                <span>Don't Have Account? </span><br></br>
                <Link to='/register' className='text-blue-500'> Register</Link>
            </div>
        
    </div>
  )
}

export default Login