import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateUser } from '../redux/sliceUserDetails'

export default function UpdateUser() {
    const dispatch = useDispatch()
    const { id } = useParams()
    const allUsers = useSelector((state)=> state.app.users)
    const navigate = useNavigate()

    const [updatedData, setUpdatedData] = useState({})
    
    useEffect(() => {
        if (id){
            const singleUser = allUsers.filter((user)=> user._id === id)
            setUpdatedData(singleUser[0])
        }
    }, [])
    
    function isEmpty(updatedData) {             //function for checking if updatedData is empty
        for (const prop in updatedData) {
          if (Object.hasOwn(updatedData, prop)) {
            return false;
          }
        }
        return true;
    }

    const newData = (e)=>{
        setUpdatedData({...updatedData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        // console.log(updatedData)
        dispatch(updateUser(updatedData))
        .then(()=> navigate('/read'))
        .catch(err=> console.log(err))
        
    }
    
    if(!isEmpty(updatedData)){
        // console.log(updatedData)
        return (
            <div className='createFormContainer'>
                    
                <form className='createForm'>
                <h3>Update details of the user</h3>
                    <label>
                        Name: 
                        <input type="text" name="name" value={updatedData.name}
                            onChange={newData}
                         required/>
                    </label>
                    <label>
                        Age: 
                        <input type="number" name="age" value={updatedData.age}
                        onChange={newData} 
                        required/>
                    </label>
                    <label>
                        Salary: 
                        <input type="number" name="salary" value={updatedData.salary}
                        onChange={newData} 
                        required/>
                    </label>
                    <button 
                    onClick={handleSubmit}
                    >
                        Submit</button>
                </form>
            </div>
          )
    }
    

  
}
