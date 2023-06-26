import { useContext } from "react"
import { GlobalDispatchContext } from "../store/GlobalContext"
import SupportForm from "../components/SupportForm"
import { SectionTitle, SectionText, SectionNarrow, SectionDivider } from "../styles/GlobalComponents"

const Support = () => {
  const appDispatch = useContext(GlobalDispatchContext)
  appDispatch({ type: "gameReset" })
  return (
    <div>
      <SectionNarrow
        style={{
          backgroundColor: "transparent"
        }}
      >
        <SectionTitle>Support</SectionTitle>
        <SectionDivider />
        <SectionText>See an Error&#63; Need Assistance&#63; Please complete the form below.</SectionText>
      </SectionNarrow>

      <SupportForm />
    </div>
  )
}

export default Support
