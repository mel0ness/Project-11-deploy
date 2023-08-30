import React from "react"
import { Helmet, HelmetProvider } from "react-helmet-async"

const ReactHelmet = () => {

return (
  <HelmetProvider>
    <Helmet>
        <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <meta name="description" content="Argent Bank - To keep and manage your money safely" />
    </Helmet>
    </HelmetProvider>
)
}

export default ReactHelmet;