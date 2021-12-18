import { useContext } from "react"
import { GlobalStateContext } from "../store/GlobalContext"

//comps
import LanguageBtn from "./LanguageBtn"
import { Section } from "../styles/GlobalComponents"

export default function LanguagePreference() {
  const GlobalAppState = useContext(GlobalStateContext)
  return (
    <Section>
      Current Language is: {GlobalAppState.language}
      <LanguageBtn></LanguageBtn>
    </Section>
  )
}
