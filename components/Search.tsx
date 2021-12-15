import { useContext } from "react"
import DispatchContext from "../store/DispatchContext"

const Search = () => {
  const appWideDispatch = useContext(DispatchContext)

  return (
    <div className="search-overlay">
      <label htmlFor="live-search-field" className="search-overlay-icon"></label>
      <input autoFocus type="text" autoComplete="off" id="live-search-field" className="live-search-field" placeholder="What are you interested in?" />
    </div>
  )
}

export default Search
