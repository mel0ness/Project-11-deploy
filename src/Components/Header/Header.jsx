import { Link } from "react-router-dom";
import Logo from "../../Assets/argentBankLogo.webp"
import "../../Style/Components/Header/header.scss"
import { Erase } from "../../Features/connexion";
import { useDispatch, useSelector } from "react-redux";
import { connected, userName } from "../../Utils/Selectors";
import {EraseUserState} from "../../Features/user";
import { EraseNewUser } from "../../Features/newUser";



const Header = () => {
  const dispatch = useDispatch();
  const userNameUser = useSelector(userName)
  const connectedUser = useSelector(connected)


  const eraseStates = () => {
    dispatch(Erase())
    dispatch(EraseUserState())
    dispatch(EraseNewUser())
  }

    return(
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img
          className="main-nav-logo-image"
          src={Logo}
          alt="Argent Bank Logo"
          width="200px"
          height="55px"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      {connectedUser? (<div className="flexyHeader"> <Link className="main-nav-item" to="./user">
          <i className="fa fa-user-circle"></i>
          {userNameUser}
        </Link>
        <Link className="main-nav-item" to="/" onClick={() => eraseStates()}>
          <i className="fa fa-user-circle"></i>
           Sign Out
        </Link></div>) : (
      <div>
        <Link className="main-nav-item" to="/sign-in" onClick={() => eraseStates()}>
          <i className="fa fa-user-circle"></i>
           Sign In 
        </Link>
      </div>)}
    </nav>)
}

export default Header;