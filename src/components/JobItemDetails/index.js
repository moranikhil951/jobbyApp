import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {FiExternalLink} from 'react-icons/fi'
import Loader from 'react-loader-spinner'
import {MdLocationOn} from 'react-icons/md'
import {RiHandbagFill} from 'react-icons/ri'

import Headers from '../Header'
import SkillsCard from '../SkillsCard'
import SimilarCard from '../SimilarCard'

import './index.css'

const apisStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class JobItemDetails extends Component {
  state = {
    jobsList: [],
    lifeAtCompanyLists: [],
    skillsList: [],
    similarJobsList: [],
    updatedStatus: apisStatus.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({updatedStatus: apisStatus.loading})
    const {match} = this.props
    console.log(match)
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const jobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        jobDescription: data.job_details.job_description,
        id: data.job_details.id,
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      }
      const lifeAtCompanyList = {
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
      }
      const skillsCon = data.job_details.skills.map(skill => ({
        imageUrl: skill.image_url,
        name: skill.name,
        id: skill.id,
      }))

      const similarJobs = data.similar_jobs.map(similarJob => ({
        companyLogoUrl: similarJob.company_logo_url,
        employmentType: similarJob.employment_type,
        id: similarJob.id,
        jobDescription: similarJob.job_description,
        location: similarJob.location,
        rating: similarJob.rating,
        title: similarJob.title,
      }))

      this.setState({jobsList: jobDetails})
      this.setState({
        lifeAtCompanyLists: lifeAtCompanyList,
        skillsList: skillsCon,
        similarJobsList: similarJobs,
        updatedStatus: apisStatus.success,
      })
    } else {
      this.setState({updatedStatus: apisStatus.failure})
    }
  }

  renderFailureView = () => (
    <div className="failure-container-jobDetails">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="error-jobs-heading">Oops! Something Went Wrong</h1>
      <p className="error-jobs-para">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" id="button" className="Retry-button">
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container-job-details-con" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetailsView = () => {
    const {updatedStatus} = this.state

    switch (updatedStatus) {
      case apisStatus.success:
        return this.renderSuccessView()
      case apisStatus.failure:
        return this.renderFailureView()
      case apisStatus.loading:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  renderSuccessView = () => {
    const {
      jobsList,
      lifeAtCompanyLists,
      skillsList,
      similarJobsList,
    } = this.state
    const {
      title,
      companyLogoUrl,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      companyWebsiteUrl,
    } = jobsList
    const {description, imageUrl} = lifeAtCompanyLists
    return (
      <>
        <div className="responsive-container">
          <div className="job-info-container">
            <div className="company-info">
              <img
                alt="job details company logo"
                src={companyLogoUrl}
                className="company-url"
              />
              <div>
                <h1 className="title-heading">{title}</h1>
                <div className="rating-container">
                  <AiFillStar className="rating-icon" />
                  <p className="rating">{rating}</p>
                </div>
              </div>
            </div>

            <div className="flexing-container-lpa">
              <div className="mini-flex-location-and-jo-type">
                <div className="location-and-job-type-container">
                  <MdLocationOn className="location-icon" />
                  <p className="location-para">{location}</p>
                </div>
                <div className="location-and-job-type-container">
                  <RiHandbagFill className="hand-bag-fill-icon" />
                  <p className="location-para">{employmentType}</p>
                </div>
              </div>
              <p className="lpa">{packagePerAnnum}</p>
            </div>
            <hr className="horizantal-line" />
            <div className="visit-container">
              <h1 className="description-heading">Description</h1>
              <div className="flex-link">
                <a className="visit-link" href={companyWebsiteUrl}>
                  Visit
                </a>
                <FiExternalLink className="visit-icon" />
              </div>
            </div>
            <p className="description-para">{description}</p>

            <h1 className="skill-heading">Skills</h1>
            <ul className="unOrdered-list">
              {skillsList.map(eachSkill => (
                <SkillsCard eachSkills={eachSkill} key={eachSkill.id} />
              ))}
            </ul>
            <div>
              <h1 className="lifeAtCompany-heading">Life at Company</h1>
              <div className="lifeAtCompany-container">
                <p className="description-para">{description}</p>
                <img
                  src={imageUrl}
                  alt="life at company"
                  className="lifeAtCompaneyImage"
                />
              </div>
              <img
                src={imageUrl}
                alt="life at company"
                className="imageCompany"
              />
            </div>
          </div>
        </div>
        <h1 className="similar-heading">Similar Jobs</h1>
        <ul className="unOrdered-list-second">
          {similarJobsList.map(similarJob => (
            <SimilarCard eachSimilarJob={similarJob} key={similarJob.id} />
          ))}
        </ul>
      </>
    )
  }

  render() {
    return (
      <>
        <Headers />
        <div className="jobsDetails-Container">
          {this.renderJobDetailsView()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
