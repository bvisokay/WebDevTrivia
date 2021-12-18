import { useContext } from "react"
import { GlobalDispatchContext } from "../store/GlobalContext"

export default function LanguageBtn() {
  const GlobalAppDispatch = useContext(GlobalDispatchContext)
  return (
    <>
      <p>Set Language Preference:</p>
      <button
        onClick={() => {
          GlobalAppDispatch({ type: "setEnglish" })
        }}
      >
        English
      </button>
      <button
        onClick={() => {
          GlobalAppDispatch({ type: "setSpanish" })
        }}
      >
        Spanish
      </button>
      <button
        onClick={() => {
          GlobalAppDispatch({ type: "setLatin" })
        }}
      >
        Latin
      </button>
    </>
  )
}
