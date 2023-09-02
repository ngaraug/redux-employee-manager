import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createUser } from '../redux/sliceUserDetails'
import { useNavigate } from 'react-router-dom'

export default function CreateUser() {
    const [user, setUser] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const updateUser = (e) => {
        setUser({...user, [e.target.name] : e.target.value})
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        // console.log("Users: ", user)
        dispatch(createUser(user))
        navigate('/read')
    }

    return (
        <div className='createFormContainer'>
            
            <form className='createForm'>
            <h3>Fill in details of the new user</h3>
                <label>
                    Name: 
                    <input type="text" name="name" onChange={updateUser} required/>
                </label>
                <label>
                    Age: 
                    <input type="number" name="age" onChange={updateUser} required/>
                </label>
                <label>
                    Salary: 
                    <input type="number" name="salary" onChange={updateUser} required/>
                </label>
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </div>
  )
}
