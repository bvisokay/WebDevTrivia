import Link from "next/link"
import { Section, SectionNarrow } from "../styles/GlobalComponents"

const HelpPage = () => {
  return (
    <SectionNarrow>
      <h2>Get Help</h2>
      <p>
        Visit the <Link href="/support">support page</Link> and complete the form.
      </p>
      <h2>Change Category</h2>
      <p>From the home screen, hit the settings button, select a catgeory from the dropdown selection.</p>
      <h2>Change the Number of Questions</h2>
      <p>Fromm the home screen, hit the settings button, select a number from the dropdown selection.</p>
    </SectionNarrow>
  )
}
export default HelpPage
