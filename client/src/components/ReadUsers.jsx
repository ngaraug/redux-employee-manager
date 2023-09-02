import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUsers, readUsers } from '../redux/sliceUserDetails'
import { Link } from 'react-router-dom'


export default function ReadUsers() {
    
    const { users } = useSelector((state)=> state.app)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(readUsers())
    }, [])
    

    return (
        <div className='readContainer'>
            {users &&
                users.map((ele)=>{
                    return (<div key={ele._id} className='readCard'>
                    <h3>{ele.name}</h3>
                    <div>
                        <p>salary: {ele.salary}</p>
                        <p>age: {ele.age}</p>
                    </div>
                    <div>
                        <p> <Link to={`/edit/${ele._id}`}>Update</Link></p>
                        <p> <button onClick={()=> {
                            dispatch(deleteUsers(ele._id))
                            .then(()=>dispatch(readUsers()))}}>Delete</button>
                        </p> 
                    </div>
                </div>)
            })
            }
        </div>
    )
}
