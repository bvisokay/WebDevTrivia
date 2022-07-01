import Link from "next/link"
import { SectionTitle, SectionNarrow, SectionDivider, SectionText } from "../styles/GlobalComponents"
import styled from "styled-components"
import Head from "next/head"
import { SITENAME } from "./_app"

const FlexParent = styled.div`
  display: flex;
  height: 400px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //border: 2px solid purple;
`

const NotFoundPage = () => {
  return (
    <>
      <Head>
        <title>Not Found | {SITENAME}</title>
      </Head>
      <SectionNarrow>
        <FlexParent>
          <SectionTitle>Not Found</SectionTitle>
          <SectionDivider />
          <SectionText>
            Head back to the{" "}
            <Link href="/">
              <a className="with-color">homepage</a>
            </Link>{" "}
            for a fresh start.
          </SectionText>
        </FlexParent>
      </SectionNarrow>
    </>
  )
}
export default NotFoundPage
