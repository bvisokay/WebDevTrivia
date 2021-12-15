const Search = () => {
  return (
    <div className="search-overlay">
      <div className="search-overlay-top shadow-sm">
        <div className="container container--narrow">
          <label htmlFor="live-search-field" className="search-overlay-icon">
            <i className="fas fa-search"></i>
          </label>
          <input autoFocus type="text" autoComplete="off" id="live-search-field" className="live-search-field" placeholder="What are you interested in?" />
          <span className="close-live-search">
            <i className="fas fa-times-circle"></i>
          </span>
        </div>
      </div>
    </div>
  )
}

export default Search
