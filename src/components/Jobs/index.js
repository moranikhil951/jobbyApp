import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import JobCard from '../JobCard'

import FilterGroup from '../FilterGroup'

import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    jobsDetailsList: [],
    searchInput: '',
    minimumSalaray: 0,
    employeeType: [],
    updateStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobsDetails()
  }

  getJobsDetails = async () => {
    this.setState({updateStatus: apiStatusConstants.loading})
    const {searchInput, minimumSalaray, employeeType} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employeeType.join()}&minimum_package=${minimumSalaray}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const updatedData = data.jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        jobsDetailsList: updatedData,
        updateStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({updateStatus: apiStatusConstants.failure})
    }
  }

  onChangeSarchInput = event => {
    const {searchInput} = this.state
    this.setState({searchInput: event.target.value})
    console.log(searchInput)
  }

  changeEmployeeOptions = type => {
    this.setState(
      prev => ({employeeType: [...prev.employeeType, type]}),
      this.getJobsDetails,
    )
    console.log(type)
  }

  onEnterButton = event => {
    if (event.key === 'Enter') {
      this.getJobsDetails()
    }
  }

  changeSalary = salary => {
    this.setState({minimumSalaray: salary}, this.getJobsDetails)
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure-image"
      />
      <h1 className="error-jobs-heading">Oops! Something Went Wrong</h1>
      <p className="error-jobs-para">
        We cannot seem to find the page you are looking for
      </p>
      <button
        type="button"
        id="button"
        onClick={this.getJobsDetails}
        className="Retry-button"
      >
        Retry
      </button>
    </div>
  )

  loadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  successView = () => {
    const {jobsDetailsList} = this.state
    return jobsDetailsList.length !== 0 ? (
      <div>
        <ul className="unordered-list-job-details">
          {jobsDetailsList.map(eachLists => (
            <JobCard jobData={eachLists} key={eachLists.id} />
          ))}
        </ul>
      </div>
    ) : (
      <div className="no-jobs-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          alt="no jobs"
          className="no-jobs-image"
        />
        <h1 className="jobs-no-found">No jobs Found</h1>
        <p className="no-jobs-description">
          We could not find any jobs. Try other filters
        </p>
      </div>
    )
  }

  renderView = () => {
    const {updateStatus} = this.state
    switch (updateStatus) {
      case apiStatusConstants.success:
        return this.successView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.loading:
        return this.loadingView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state

    return (
      <div>
        <Header />
        <div className="Jobs-Container">
          <div className="profile-and-job-details">
            <FilterGroup
              searchInput={searchInput}
              employmentTypesList={employmentTypesList}
              salaryRangesList={salaryRangesList}
              getJobsDetails={this.getJobsDetails}
              onChangeSarchInput={this.onChangeSarchInput}
              changeSalary={this.changeSalary}
              changeEmployeeList={this.changeEmployeeList}
              changeEmployeeOptions={this.changeEmployeeOptions}
            />
          </div>
          <div className="main-job-details-container">
            <div className="input-container-search-desktop">
              <input
                type="search"
                onChange={this.onChangeSarchInput}
                className="search-input-jobs-desktop"
                value={searchInput}
                onKeyDown={this.onEnterButton}
                placeholder="Search"
              />
              <button
                data-testid="searchButton"
                type="button"
                className="button-search"
              >
                <BsSearch
                  className="search-icon-desktop"
                  onClick={this.getJobsDetails}
                />
              </button>
            </div>

            <div>{this.renderView()}</div>
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
