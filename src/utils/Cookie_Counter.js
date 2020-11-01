import React from 'react'
import CookieConsent, { Cookies } from "react-cookie-consent";

const SetCookie = () => {
   const checkCookies = Cookies.get("CookieConsent")
   // Cookies & CounterAPI
   const updateCounter = async () => {
      // const data = await fetch("https://api.countapi.xyz/set/monsite.com/counterVisit?value=0")
      const data = await fetch("https://api.countapi.xyz/hit/localhost3000/counterVisit")
      const count = await data.json()
      return count
   }
   if (!checkCookies) {
      updateCounter()
   }
   return (
      <>
      {!checkCookies && 
      <CookieConsent
         buttonText="Ok"
         expires={1}
         style={{ background: "rgba(0, 0, 0, 0.7)" }}
         buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
         >
         Ce site Web utilise des cookies pour améliorer l'expérience utilisateur.{" "}
      </CookieConsent>
      }
      </>
   )
}
export default SetCookie