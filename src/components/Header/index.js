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
            alt="website"
            className="website-image"
          />
        </Link>
        <div>
          <div className="flex-info">
            <Link to="/">
              <h1 className="Home-heading">Home</h1>
            </Link>
            <Link to="/jobs">
              <h1 className="Home-heading">Jobs</h1>
            </Link>
          </div>
        </div>

        <button type="button" className="buttonLogout" onClick={onClickLogout}>
          Logout
        </button>
      </div>
      <div className="headers-container-mobile">
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
          <div className="flex-info">
            <Link to="/">
              <AiFillHome className="home-icon" />
            </Link>
            <Link to="/jobs">
              <RiHandbagFill className="jobs-icon" />
            </Link>
            <button
              type="button"
              className="logout-icon-button"
              onClick={onClickLogout}
            >
              <FiLogOut className="logout-icon" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default withRouter(Header)
