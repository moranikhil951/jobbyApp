import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {RiHandbagFill} from 'react-icons/ri'

import './index.css'

const SimilarCard = props => {
  const {eachSimilarJob} = props
  return (
    <li className="listed-container">
      <div className="info-con">
        <img
          src={eachSimilarJob.companyLogoUrl}
          alt="similar job company logo"
          className="imageUrl"
        />
        <div>
          <h1 className="title">{eachSimilarJob.title}</h1>
          <div className="flex">
            <AiFillStar className="rating-icons" />
            <p className="similar-rating">{eachSimilarJob.rating}</p>
          </div>
        </div>
      </div>
      <h1 className="description-similar">Description</h1>
      <p className="description-similar-para">
        {eachSimilarJob.jobDescription}
      </p>

      <div className="icon-info-con">
        <MdLocationOn className="similar-icon" />
        <p className="info">Delhi</p>
      </div>
      <div className="icon-info-con">
        <RiHandbagFill className="similar-icon" />
        <p className="info">{eachSimilarJob.employmentType}</p>
      </div>
    </li>
  )
}

export default SimilarCard
