import { CSVLink } from "react-csv"
import { SectionTitle } from "../styles/GlobalComponents"
import usersData from "../lib/users.json"
import React from "react"

// The react-csv implementation doesn't consistently work on localhost
// watched this video to implement: https://youtu.be/D9xiIZAPZUI

const data = [
  { firstName: "Warren", lastName: "Gee" },
  { firstName: "Pepper", lastName: "Onchini" },
  { firstName: "Rox", lastName: "aroni" },
  { firstName: "Luky", lastName: "Skywalky" }
]

const headers = [
  { label: "First Name", key: "firstName" },
  { label: "Last Name", key: "lastName" }
]

const csvReport = {
  filename: "Report.csv",
  headers: headers,
  data: data
}

// Try new approach

const downloadFile = (input: any) => {
  // Create a blob with the data we want to download as a file
  const blob = new Blob([input.data], { type: input.fileType })
  // Create an anchor element and dispatch a click event on it
  // to trigger a download
  const a = document.createElement("a")
  a.download = input.fileName
  a.href = window.URL.createObjectURL(blob)
  const clickEvt = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true
  })
  a.dispatchEvent(clickEvt)
  a.remove()
}

const exportToCsv = (e: any) => {
  e.preventDefault()

  // Headers for each column
  let headers = ["Id,Name,Surname,Age"]

  // Convert users data to a csv
  let usersCsv = usersData.users.reduce((acc: any, user) => {
    const { id, name, surname, age } = user
    acc.push([id, name, surname, age].join(","))
    return acc
  }, [])

  downloadFile({
    data: [...headers, ...usersCsv].join("\n"),
    fileName: "users.csv",
    fileType: "text/csv"
  })
}

const Export = () => {
  return (
    <>
      <SectionTitle>Export</SectionTitle>
      <CSVLink {...csvReport}>Export to CSV</CSVLink>
      <table className="usersTable">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Surname</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {usersData.users.map(user => {
            const { id, name, surname, age } = user
            return (
              <tr key={id}>
                <td>{id}</td>
                <td>{name}</td>
                <td>{surname}</td>
                <td>{age}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <div className="actionBtns">
        <button type="button" onClick={exportToCsv}>
          Export to CSV
        </button>
      </div>
    </>
  )
}

export default Export
