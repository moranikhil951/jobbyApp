import './index.css'

import {Link, withRouter} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {RiHandbagFill} from 'react-icons/ri'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <nav>
      <div className="headers-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-image"
          />
        </Link>
        <div>
          <ul className="flex-info">
            <Link to="/">
              <li>
                <h1 className="Home-heading">Home</h1>
              </li>
            </Link>
            <Link to="/jobs">
              <li>
                <h1 className="Home-heading">Jobs</h1>
              </li>
            </Link>
          </ul>
        </div>

        <button type="button" className="buttonLogout" onClick={onClickLogout}>
          Logout
        </button>
      </div>
      <ul className="headers-container-mobile">
        <div>
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website"
              className="website-mobile-image"
            />
          </Link>
        </div>
        <div className="info-mobile-icon-con">
          <ul className="flex-info">
            <Link to="/">
              <li>
                <AiFillHome className="home-icon" />
              </li>
            </Link>
            <Link to="/jobs">
              <li>
                <RiHandbagFill className="jobs-icon" />
              </li>
            </Link>
            <li>
              <button
                type="button"
                className="logout-icon-button"
                onClick={onClickLogout}
              >
                <FiLogOut className="logout-icon" />
              </button>
            </li>
          </ul>
        </div>
      </ul>
    </nav>
  )
}

export default withRouter(Header)
