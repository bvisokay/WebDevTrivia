import React, { useEffect, useState } from "react"
import { BackDrop, SettingsPanel, FormGroup } from "./OptionsModalStyles"
import { BtnTertiary } from "../../styles/GlobalComponents/Button"
import { SectionTitle, FormControl } from "../../styles/GlobalComponents"

interface OptionsModalProps {
  setSelectedTotalQs: (value: number) => void
  setSelectedCategory: (value: string) => void
  /* setSelectedDifficulty: (value: string) => void */
  saveSettingsHandler: (e: React.FormEvent) => void
  closeSettingsHandler: () => void
}

const OptionsModal: React.FC<OptionsModalProps> = ({ setSelectedTotalQs, /* setSelectedDifficulty, */ setSelectedCategory, saveSettingsHandler, closeSettingsHandler }) => {
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
        <SectionTitle>Settings</SectionTitle>
        {isCategoriesLoading ? (
          <p>Loading...</p>
        ) : (
          <form onSubmit={saveSettingsHandler}>
            <FormControl>
              <label htmlFor="">Category</label>
              <select name="Category" id="category" onChange={e => setSelectedCategory(e.target.value)}>
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
              <select
                name="Number of Questions"
                id="numQ"
                onChange={e => {
                  const selectedQuestionNr = e.target.value
                  setSelectedTotalQs(+selectedQuestionNr)
                }}
              >
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
              <BtnTertiary type="submit">Start</BtnTertiary>
              <BtnTertiary type="button" onClick={closeSettingsHandler}>
                Cancel
              </BtnTertiary>
            </div>
          </form>
        )}
      </SettingsPanel>
    </BackDrop>
  )
}

export default OptionsModal
