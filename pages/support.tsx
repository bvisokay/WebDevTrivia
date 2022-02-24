import SupportForm from "../components/SupportForm"
import { SectionTitle, SectionText, SectionNarrow, SectionDivider } from "../styles/GlobalComponents"

const support = () => {
  return (
    <div>
      <SectionNarrow>
        <SectionTitle>Reach Out</SectionTitle>
        <SectionDivider />
        <SectionText>Is there a feature you would like to see implemented? See an Error?</SectionText>
        <SectionText> Have question that you would like to see added? Interested in helping curate the data set?</SectionText>
        <SectionText>
          <strong>Complete the form below and we&apos;ll get back to you when we can.</strong>
        </SectionText>
      </SectionNarrow>

      <SupportForm />
    </div>
  )
}

export default support
