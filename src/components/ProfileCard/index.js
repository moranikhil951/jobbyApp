import {Component} from 'react'

import Cookies from 'cookies-js'

import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class ProfileCard extends Component {
  state = {profileData: [], profileStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.profileDetails()
  }

  profileDetails = async () => {
    this.setState({profileStatus: apiStatusConstants.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)

      const updatedData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({
        profileData: updatedData,
        profileStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({profileStatus: apiStatusConstants.failure})
    }
  }

  renderSuccessView = () => {
    const {profileData} = this.state
    console.log(profileData)
    return (
      <div className="profile-container">
        <img
          src={profileData.profileImageUrl}
          alt={profileData.name}
          className="profile-image"
        />
        <h1 className="name">{profileData.name}</h1>
        <p className="bio">{profileData.shortBio}</p>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="retry-con">
      <button
        className="Retry-button"
        type="button"
        onClick={this.profileDetails}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loading-container-profile" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  rendeingProfile = () => {
    const {profileStatus} = this.state

    switch (profileStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return <div>{this.rendeingProfile()}</div>
  }
}

export default ProfileCard
