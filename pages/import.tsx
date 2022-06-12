import UploadCSV from "../components/UploadCSV"
import { SectionNarrow, PageTitle } from "../styles/GlobalComponents"

const ImportPage = () => {
  return (
    <SectionNarrow>
      <PageTitle>Import Questions</PageTitle>
      <UploadCSV />
    </SectionNarrow>
  )
}
export default ImportPage
