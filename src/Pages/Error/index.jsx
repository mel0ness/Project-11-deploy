import "../../Style/Components/HomeFeatures/homefeatures.scss"
import error from "../../Assets/error.webp"
import { HelmetProvider } from "react-helmet-async"
import { useSelector } from "react-redux"
import { statusConnexion, connexion } from "../../Utils/Selectors"

const Error = () => {
  const status = useSelector(statusConnexion);
  const statusSecond = useSelector(connexion)
  const statusProblem = status? (status === 500? true : false) : (statusSecond === "rejected")

    return ( <div className="feature-item">
       <HelmetProvider>
          <title>Argent Bank - Error</title>
          </HelmetProvider>
      {statusProblem ? (
       
         
       <div> <img src={error} alt="Chat Icon" className="feature-icon" />
        <h1 className="feature-item-title"> Sorry, internal server error!</h1></div>
      ) :
      ( <div>
    <img src={error} alt="Chat Icon" className="feature-icon" />
    <h1 className="feature-item-title"> This page doesn't exist!</h1></div>
  )
    }</div>
    )
}

export default Error;