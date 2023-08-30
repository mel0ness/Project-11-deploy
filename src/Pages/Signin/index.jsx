import "../../Style/Pages/Signin/signin.scss"
import { Erase } from "../../Features/connexion";
import { HelmetProvider } from "react-helmet-async"
import { useEffect, useState } from "react";
import * as connexionActions from "../../Features/connexion"
import * as rememberActions from "../../Features/rememberMe"
import {  connexion, message, statusConnexion, mail, stock } from "../../Utils/Selectors";
import { useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { newUserStatus } from "../../Utils/Selectors";
import { EraseNewUser } from "../../Features/newUser";


const SignIn = () => {
  const [username, updateUsername] = useState("")
  const [password, updatePassword] = useState("")
  const [fields, fieldserror] = useState(false) 
  const [animation, createAnimation] = useState(false)
  const [remember, rememberChange] = useState(false)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const mailStocked = useSelector(mail)
  const isStocked = useSelector(stock)
  const messageError = useSelector(message);
  const newProfileCreated = useSelector(newUserStatus);

  const rememberUser = () => {
    if(isStocked) {
      updateUsername(mailStocked)
      rememberChange(true)
    }
  }

  useEffect(
      rememberUser
    , [mailStocked, isStocked]
  )

 

const rememberMe = () => {
if (remember) {
  rememberChange(false)
  dispatch(rememberActions.dontStock())
}
else {
  rememberChange(true)
  dispatch(rememberActions.stockUserName(username))
}
}

const erasing = () => {
  dispatch(EraseNewUser())
  dispatch(connexionActions.Erase())
}

  const redirect = (status) => {

    if (status === 200) {
navigate("../user");
    }
    else if (status === 500 || status === "rejected") {
      navigate("../error")
    }
    else if (status === 400) {
    navigate("/sign-in")
    createAnimation(false)
  }}

  function signIn(username, password) {
   
    return async (dispatch, getState) => {
        const login = {
            "email": username,
            "password": password
        }
        const chargeUtil = JSON.stringify(login);
    const status = connexion(getState())
   
    
    
    if (status === 'pending') {
      return
    }
    dispatch(connexionActions.fetch())

    try {
        let response = await fetch("http://localhost:3001/api/v1/user/login", {
            method: "POST",
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
            },
            body: chargeUtil,
          });
          let data = await response.json();
      await dispatch(connexionActions.resolved(data))
   dispatch(connexionActions.connected())

      const statusConnexionRedirect = statusConnexion(getState())
        // console.log(statusActualized);
      redirect(statusConnexionRedirect)
      
    } catch (error) {
      await dispatch(connexionActions.rejected(error))
      redirect("rejected")
    }}
  
  }

  const sending = (e) => {
    e.preventDefault();
   
    if(!password || !username)
    {fieldserror(true)
      dispatch(Erase())
    }

    else {
      fieldserror(false)
      createAnimation(true)
    dispatch(signIn(username, password))}
    
   
  }

 

    return (
        <main className="main bg-dark">
          
          <HelmetProvider>
          <title>Argent Bank - Sign in</title>
          </HelmetProvider>
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign In</h1>
          {newProfileCreated === 200 ? (<div className="success">Your profile has been successfully created! You can sign in</div>) : <div></div>}
          <form onSubmit={e => sending(e)}>{ messageError === 'Error: User not found!' ? (
            <div className="input-wrapper">
              
              <label htmlFor="username">Username</label
              ><input type="text" id="username" value={username} onInput={e => updateUsername(e.target.value)} />
              <div className="NotFound">User not found!</div>
            </div>) :
             (<div className="input-wrapper">
              
              <label htmlFor="username">Username</label
              ><input  type="text" id="username" value={username} onInput={e => updateUsername(e.target.value)} />
            </div>) }
            {messageError === 'Error: Password is invalid' ? (
            <div className="input-wrapper">
              <label htmlFor="password">Password</label
              ><input  type="password" id="password" value={password} onInput={e => updatePassword(e.target.value)} />
              <div className="NotFound">Password is invalid!</div>
            </div>) : (<div className="input-wrapper">
              <label htmlFor="password">Password</label
              ><input  type="password" id="password" value={password} onInput={e => updatePassword(e.target.value)} />
            </div>)}
            {remember? (<div className="input-remember">
              <input type="checkbox" id="remember-me" onChange={() => rememberMe()} checked/><label htmlFor="remember-me"
                >Remember me</label
              >
            </div>) : (<div className="input-remember">
              <input type="checkbox" id="remember-me" onChange={() => rememberMe()}/><label htmlFor="remember-me"
                >Remember me</label
              >
            </div>)}
    {animation? (  <button type="submit" className="sign-in-button"><div className="animationFetch"></div></button>) : ( <button type="submit" className="sign-in-button">Sign In</button>)}
    {fields? ( <div className="NotFound">Fields must be filled!</div>) : (<div></div>)}
         
         <Link to="../sign-up" className="createAccount" onClick={() => erasing()}>You don't have an account yet? Create one</Link>
          </form>
        </section>
      </main>
  )}



export default SignIn;