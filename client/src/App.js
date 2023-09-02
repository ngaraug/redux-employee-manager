import './App.css';
import CreateUser from './components/CreateUser';
import ReadUsers from './components/ReadUsers';
import NavBar from './components/NavBar';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import UpdateUser from './components/UpdateUser';

function App() {
  return (
   <>
    <BrowserRouter >
      <NavBar />
      <Routes>
          <Route exact path='/' element={<CreateUser />} />
          <Route exact path='/read' element={<ReadUsers />} />
          <Route exact path='/edit/:id' element={<UpdateUser />} />
      </Routes>
    </BrowserRouter>
   </>
  );
}

export default App;
