import {MdLocationOn} from 'react-icons/md'
import {AiFillStar} from 'react-icons/ai'
import {RiHandbagFill} from 'react-icons/ri'
import {Link} from 'react-router-dom'
import './index.css'

const JobCard = props => {
  const {jobData} = props
  return (
    <li>
      <Link to={`/jobs/${jobData.id}`} className="linked-job-card-items">
        <div className="listed-item">
          <div>
            <div className="jobs-card-con">
              <img
                src={jobData.companyLogoUrl}
                alt="company logo"
                className="job-card-company-url"
              />
              <div>
                <h1 className="job-card-heading">{jobData.title}</h1>
                <div className="jobs-card-rating">
                  <AiFillStar className="card-rating-icon" />
                  <h1 className="rating-card">{jobData.rating}</h1>
                </div>
              </div>
            </div>
            <div className="location-employtype-con">
              <div className="flexing-location-employment-type">
                <div className="location-and-employ-flex">
                  <MdLocationOn className="card-location-and-employetype-icon" />
                  <p className="card-location-name">{jobData.location}</p>
                </div>
                <div className="location-and-employ-flex">
                  <RiHandbagFill className="card-location-and-employetype-icon" />
                  <p className="card-location-employement">
                    {jobData.employmentType}
                  </p>
                </div>
              </div>
              <p className="card-lpa">{jobData.packagePerAnnum}</p>
            </div>
          </div>
          <hr className="hr-line" />
          <div>
            <h1 className="heading-description">Description</h1>
          </div>
          <p className="description-card">{jobData.jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobCard
