import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {


  return (
    <div className='navContainer'>
        <h1>Employee manager</h1>
        <h3>By Gaurang Mestry</h3>
        <p>Using MERN stack, Redux and Redux-thunk</p>
        < Link to="/" className='navButton'> Create User</Link>
        <Link to="/read" className='navButton'>View All Users </Link>
        <hr />
    </div>
  )
}
