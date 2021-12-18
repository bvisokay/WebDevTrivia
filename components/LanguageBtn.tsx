import { useContext } from "react"
import { GlobalDispatchContext } from "../store/GlobalContext"
import { BtnSecondary } from "../styles/GlobalComponents/Button"

export default function LanguageBtn() {
  const GlobalAppDispatch = useContext(GlobalDispatchContext)
  return (
    <>
      <p>Set Language Preference:</p>
      <BtnSecondary
        onClick={() => {
          GlobalAppDispatch({ type: "setEnglish" })
        }}
      >
        English
      </BtnSecondary>
      <BtnSecondary
        onClick={() => {
          GlobalAppDispatch({ type: "setSpanish" })
        }}
      >
        Spanish
      </BtnSecondary>
      <BtnSecondary
        onClick={() => {
          GlobalAppDispatch({ type: "setLatin" })
        }}
      >
        Latin
      </BtnSecondary>
    </>
  )
}
