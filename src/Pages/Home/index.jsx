import "../../Style/Pages/Home/home.scss"
import homeDatas from "../../Assets/homeDatas.json"
import HomeFeatures from "../../Components/HomeFeatures"
import { HelmetProvider } from "react-helmet-async"

const Home = () => {
    return (
        <main>
          <HelmetProvider>
          <title>Argent Bank - Home Page</title>
          </HelmetProvider>
    <div className="hero">
      <section className="hero-content">
        <h2 className="sr-only">Promoted Content</h2>
        <p className="subtitle">No fees.</p>
        <p className="subtitle">No minimum deposit.</p>
        <p className="subtitle">High interest rates.</p>
        <p className="text">Open a savings account with Argent Bank today!</p>
      </section>
    </div>
    <section className="features">
      <h2 className="sr-only">Features</h2>
{homeDatas.map(({id, src, title, p}) => 
<HomeFeatures src={src} title={title} p={p} key={id} />)
}
    </section>
  </main>
    )
}

export default Home;