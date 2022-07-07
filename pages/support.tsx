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
        <SectionText>See an Error? Need Assistance?</SectionText>
        {/* <SectionText> Do you have a question that you would like to see added? Interested in helping curate the data set?</SectionText> */}
        <SectionText>Complete the form below and we&apos;ll get right on it.</SectionText>
      </SectionNarrow>

      <SupportForm />

      <br></br>
      <br></br>
      <SectionNarrow>
        <SectionTitle>Credits</SectionTitle>
        <SectionDivider />
        <SectionText style={{ textAlign: "center" }}>
          Free SVG Background by{" "}
          <a className="with-color" target="_blank" rel="noreferrer" href="https://bgjar.com">
            BGJar
          </a>
        </SectionText>
      </SectionNarrow>
    </div>
  )
}

export default Support
