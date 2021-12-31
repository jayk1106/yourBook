import React, { useContext, useState } from 'react'
import {useNavigate } from 'react-router-dom'
import alertContext from '../context/alerts/alertContext';


export default function Signup() {

    const {showAlert} = useContext(alertContext);
    let navigate = useNavigate();

    const [state , setState] = useState({name: '' ,email:'' , password : ''});

    const handleOnChange = (e) =>{
        setState({...state , [e.target.name] : e.target.value})
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        // API CALL
        const response = await fetch(`http://localhost:4000/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body : JSON.stringify({name: state.name ,email : state.email , password : state.password}),
      });
      const res = await response.json();
      if(res.authToken){
        // save the authToken in localstorage and redirect
        localStorage.setItem('token' , res.authToken);
        navigate('/');
        showAlert("Account Created Successfully" , "success");
      }else{
        showAlert("Enter a valid email or password..." , "danger");
      }
    }




  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="name"
          aria-describedby="emailHelp"
          name="name"
          value={state.name}
          onChange={handleOnChange}
          minLength="3"
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          aria-describedby="emailHelp"
          name="email"
          value={state.email}
          onChange={handleOnChange}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          name="password"
          id="password"
          value={state.password}
          onChange={handleOnChange}
          minLength="5"
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
}
