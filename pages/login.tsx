import { useState } from "react"

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault()
  /* try catch */
}

const Login = () => {
  const [username, setUsername] = useState<string>()
  const [password, setPassword] = useState<string>()

  return (
    <>
      {/* If logged in show a form */}
      {/* loginCTX.isLoggedIn && (...)  */}
      <form onSubmit={handleSubmit} className="login-form">
        <div className="login-form--container">
          <h2 className="brandColor text-center">Login</h2>
          <div className="login-form--control">
            <input autoFocus onChange={e => setUsername(e.target.value)} name="username" className="login-form--input" type="text" placeholder="Username" autoComplete="off" />
          </div>
          <div className="login-form--control">
            <input onChange={e => setPassword(e.target.value)} name="password" className="login-form--input" type="password" placeholder="Password" />
          </div>
          <div className="login-form--btn-div">
            <button className="login-form--btn">Sign In</button>
          </div>
        </div>
      </form>
    </>
  )
}

export default Login
