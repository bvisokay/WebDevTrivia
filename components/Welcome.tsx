import { SectionNarrow, SectionTitle, SectionDivider, SectionText } from "../styles/GlobalComponents"

export default function Welcome() {
  return (
    <SectionNarrow>
      <SectionTitle>For the Love of Trivia</SectionTitle>
      <SectionDivider />
      <SectionText>Time to put your knowledge to the test.</SectionText>
      <SectionText>This site was created out of passion for the topics and the love of trivia.</SectionText>
      <SectionText>
        <strong>Good Luck and have fun!</strong>
      </SectionText>
    </SectionNarrow>
  )
}
