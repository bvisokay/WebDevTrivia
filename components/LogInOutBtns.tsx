import { useContext } from "react"
import { GlobalDispatchContext } from "../store/GlobalContext"
import { BtnPrimary } from "../styles/GlobalComponents/Button"

export default function LogInOutBtns() {
  const appDispatch = useContext(GlobalDispatchContext)
  return (
    <div>
      <BtnPrimary
        onClick={() => {
          appDispatch({ type: "login" })
        }}
      >
        Log In
      </BtnPrimary>
      <BtnPrimary
        onClick={() => {
          appDispatch({ type: "logout" })
        }}
      >
        Log Out
      </BtnPrimary>
    </div>
  )
}
