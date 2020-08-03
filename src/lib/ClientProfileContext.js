import React, { createContext, useState } from 'react'

export const ClientProfileContext = createContext ({
   nom: "",
   prenom: "",
   email: "",
   adresse: "",
   cp: "",
   ville: "",
   setClientProfileContext: info => {}
})

const ClientProfileContextProvider = ({ children }) => {
   const clientProfileState = {
      nom: "",
      prenom: "",
      email: "",
      adresse: "",
      cp: "",
      ville: "",
      setClientProfileContext: info =>
         setClientProfile (prevState => ({
         ...prevState,
         [Object.keys(info)]: Object.values(info)[0]        // Cible la clé de l'objet info et recup sa valeur
      }))
   }

   const [clientProfile, setClientProfile] = useState(clientProfileState)
   return (<ClientProfileContext.Provider value={clientProfile} >{ children }</ClientProfileContext.Provider>)
}
export default ClientProfileContextProvider