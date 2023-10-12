import {Component} from 'react'
import Cookies from 'js-cookie'

import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', errorMsg: false}

  inputPassword = event => {
    this.setState({password: event.target.value})
  }

  inputUsername = event => {
    this.setState({username: event.target.value})
  }

  submitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    const {history} = this.props
    history.replace('/')
  }

  onLogin = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.submitSuccess(data.jwt_token)
    }
    this.setState({errorMsg: true})
  }

  render() {
    const {username, password, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="Login-container">
        <div className="login-stucture-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="image-website"
          />
          <form className="form-container" onSubmit={this.onLogin}>
            <div className="input-container">
              <label htmlFor="userNameInput" className="label" type="text">
                USERNAME
              </label>
              <input
                id="userNameInput"
                type="text"
                className="input"
                placeholder="Username"
                onChange={this.inputUsername}
                value={username}
              />
            </div>
            <div className="input-container">
              <label htmlFor="passwordInput" className="label" type="text">
                PASSWORD
              </label>
              <input
                value={password}
                id="passwordInput"
                type="password"
                className="input"
                placeholder="Password"
                onChange={this.inputPassword}
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            {errorMsg ? (
              <p className="error-message">
                Username and Password did not match
              </p>
            ) : null}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
