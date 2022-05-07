import './App.css';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setUser } from './redux/features/authSlice';
import Header from './components/Header';
import AddEditPlace from './pages/AddEditPlace';
import SinglePlace from './pages/SinglePlace';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import NotFound from './components/NotFound';
import TagPlaces from './pages/TagPlaces';

function App() {
 const dispatch = useDispatch();
 const user = JSON.parse(localStorage.getItem("profile"));

   useEffect(()=>{
     dispatch(setUser(user)); 
       // eslint-disable-next-line react-hooks/exhaustive-deps
   },[])  

  return (
    <BrowserRouter>
    <div className="App">
      <Header/>
       <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/places/search" element={<Home/>}></Route>
        <Route path="/places/tag/:tag" element={<TagPlaces/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/register" element={<Register/>}></Route>
        <Route 
          path="/addplace" 
          element={
            <PrivateRoute>
                <AddEditPlace/>
            </PrivateRoute>
          }>
          </Route>
        <Route 
           path="/editplace/:id" 
           element={
            <PrivateRoute>
                <AddEditPlace/>
            </PrivateRoute>
          }></Route>
        <Route path="/place/:id" element={<SinglePlace/>}></Route>
        <Route 
            path="/dashboard" 
            element={
              <PrivateRoute>
                  <Dashboard/>
              </PrivateRoute>
            }>
          </Route>    
          <Route path='*' element={<NotFound/>} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
