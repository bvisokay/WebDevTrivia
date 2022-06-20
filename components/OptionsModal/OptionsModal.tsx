import React, { useEffect, useState, useContext } from "react"
import { BackDrop, SettingsPanel } from "./OptionsModalStyles"
import { BtnPrimary } from "../../styles/GlobalComponents/Button"
import { SectionTitle, FormControl } from "../../styles/GlobalComponents"
import { GlobalDispatchContext } from "../../store/GlobalContext"

import { OptionsModalProps } from "../../lib/types"

const OptionsModal: React.FC<OptionsModalProps> = ({ /* setSelectedDifficulty, */ saveSettingsHandler, closeSettingsHandler }) => {
  const appDispatch = useContext(GlobalDispatchContext)
  // set some state
  const [isCategoriesLoading, setIsCategoriesLoading] = useState(true)
  const [categories, setCategories] = useState<string[]>([])
  /* this state should be passed in as props */
  /* const [selectedCategory, setSelectedCategory] = useState("all") */
  // end setting state

  // get existing categories on render inside of useEffect
  useEffect(() => {
    setIsCategoriesLoading(true)
    //async function called immediatly after to avoid useEffect being async
    const getCategoriesOnLoad = async () => {
      try {
        const response = await fetch("/api/categories")
        const data = await response.json()
        setCategories(data)
        setIsCategoriesLoading(false)
      } catch (error) {
        throw new Error()
      }
    }
    getCategoriesOnLoad()
    // teardown function goes here
  }, []) // end useEfect

  return (
    <BackDrop>
      <SettingsPanel>
        <SectionTitle dark={true}>Settings</SectionTitle>
        {isCategoriesLoading ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={saveSettingsHandler}>
            <FormControl>
              <label htmlFor="">Category</label>
              <select autoFocus name="Category" id="category" onChange={e => appDispatch({ type: "setSelectedCategory", value: e.target.value })}>
                <option value="all">All</option>
                {categories.sort().map((category, index) => {
                  return (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  )
                })}
              </select>
            </FormControl>

            {/* Need to prevent showing option for more questions that exist or will get error */}
            <FormControl>
              <label htmlFor="">Number of Questions</label>
              <select name="Number of Questions" id="numQ" onChange={e => appDispatch({ type: "setSelectedTotalQs", value: +e.target.value })}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="25">25</option>
              </select>
            </FormControl>

            {/* Need to prevent showing option for more questions that exist or will get error */}
            {/* bring Back Later */}
            {/*   <FormGroup>
            <label htmlFor="">Difficulty</label>
            <select
              name="Number of Questions"
              id="numQ"
              onChange={e => {
                const selectedDifficulty = e.target.value
                setSelectedDifficulty(selectedDifficulty)
              }}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </FormGroup> */}

            <div className="btn-container">
              <BtnPrimary type="submit">Start</BtnPrimary>
              <BtnPrimary type="button" onClick={closeSettingsHandler}>
                Cancel
              </BtnPrimary>
            </div>
          </form>
        )}
      </SettingsPanel>
    </BackDrop>
  )
}

export default OptionsModal
