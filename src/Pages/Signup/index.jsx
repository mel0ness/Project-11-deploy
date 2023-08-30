import "../../Style/Pages/Signup/signup.scss"
import { HelmetProvider} from "react-helmet-async"
import { useState } from "react"
import * as newUserActions from "../../Features/newUser"
import { useNavigate } from "react-router"
import { newUserFetch, newUserStatus } from "../../Utils/Selectors"
import { useDispatch, useSelector } from "react-redux"
import { dontStock } from "../../Features/rememberMe"


const Signup = () => {

const dispatch = useDispatch();
const navigate = useNavigate();
const [animation, createAnimation] = useState(false)
const [fields, fieldserror] = useState(false)
const [email, updateUserEmail] = useState("")
const [password, updateUserPassword] = useState("")
const [firstname, updateUserFirstname] = useState("")
const [lastname, updateUserLastname] = useState("")
const [username, updateUsername] = useState("")
const userStatusReload = useSelector(newUserStatus)

const sending = (e) => {
    e.preventDefault();

    if(!password || !username || !email || !firstname || !lastname)
    {fieldserror(true)
    }

    else {
        fieldserror(false)
createAnimation(true)
dispatch(signUp(email, password, firstname, lastname, username))
dispatch(dontStock())

    }
}

const redirect = (status) => {

    if (status === 200) {
navigate("../sign-in");
    }
    else if (status === 500 || status === "rejected") {
      navigate("../error")
    }
    else if (status === 400) {
    navigate("/sign-up")
    createAnimation(false)
  }}

function signUp(email, password, firstname, lastname, username) {
   
    return async (dispatch, getState) => {
        const signingup = {
            "email": email,
            "password": password,
            "firstName": firstname,
            "lastName": lastname,
            "userName": username
        }
        const chargeUtil = JSON.stringify(signingup);
    const status = newUserFetch(getState())
   
    
    
    if (status === 'pending') {
      return
    }
    dispatch(newUserActions.fetch())

    try {
        let response = await fetch("http://localhost:3001/api/v1/user/signup", {
            method: "POST",
            headers: {
              accept: "application/json",
              "Content-Type": "application/json",
            },
            body: chargeUtil,
          });
          let data = await response.json();
      await dispatch(newUserActions.resolved(data))

      const newUserStatustoKeep = newUserStatus(getState())
        // console.log(statusActualized);
      redirect(newUserStatustoKeep)
      
    } catch (error) {
      await dispatch(newUserActions.rejected(error))
      redirect("rejected")
    }}
  
  }

    return (
        <main className="main bg-dark">
          
          <HelmetProvider>
          <title>Argent Bank - Sign up</title>
          </HelmetProvider>
          {userStatusReload === 400 ? (<div className="failure">Invalids fields datas</div>) : <div></div>}
        <section className="sign-in-content">
          <i className="fa fa-user-circle sign-in-icon"></i>
          <h1>Sign Up</h1>
          <form onSubmit={e => sending(e)} ><div className="input-wrapper">
              
              <label htmlFor="email">Email</label
              ><input type="text" id="email" value={email} onInput={e => updateUserEmail(e.target.value)} />
            </div> 
            <div className="input-wrapper">
              <label htmlFor="password">Password</label
              ><input type="password" id="password" value={password} onInput={e => updateUserPassword(e.target.value)} />
            </div> 
            <div className="input-wrapper">
              
              <label htmlFor="firstname">Firstname</label
              ><input type="text" id="firstname" value={firstname} onInput={e => updateUserFirstname(e.target.value)} />
            </div> 
            <div className="input-wrapper">
              
              <label htmlFor="lastname">Lastname</label
              ><input type="text" id="lastname" value={lastname} onInput={e => updateUserLastname(e.target.value)} />
            </div> 
            <div className="input-wrapper">
              <label htmlFor="username">Username</label
              ><input type="text" id="username" value={username} onInput={e => updateUsername(e.target.value)} />
            </div>

            
    {animation? (  <button type="submit" className="sign-in-button"><div className="animationFetch"></div></button>) : ( <button type="submit" className="sign-in-button">Sign Up</button>)}
    {fields? ( <div className="NotFound">Fields must be filled!</div>) : (<div></div>)}
         
         
          </form>
        </section>
      </main>
  )
}

export default Signup;