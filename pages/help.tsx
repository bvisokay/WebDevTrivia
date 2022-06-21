import Link from "next/link"
import { SectionNarrow, SectionTitle, SectionText, SectionDivider } from "../styles/GlobalComponents"

const HelpPage = () => {
  return (
    <>
      <SectionNarrow>
        <SectionTitle>Change Category</SectionTitle>
        {/* <SectionDivider /> */}
        <SectionText>From the home screen, hit the settings button, select a catgeory from the dropdown selection.</SectionText>
      </SectionNarrow>
      <SectionNarrow>
        <SectionTitle>Change the Number of Questions</SectionTitle>
        {/* <SectionDivider /> */}
        <SectionText>Fromm the home screen, hit the settings button, select a number from the dropdown selection.</SectionText>
      </SectionNarrow>
      <SectionNarrow>
        <SectionTitle>Get Help</SectionTitle>
        {/* <SectionDivider /> */}
        <SectionText>
          Visit the <Link href="/support">support page</Link> and complete the form.
        </SectionText>
      </SectionNarrow>
    </>
  )
}
export default HelpPage
