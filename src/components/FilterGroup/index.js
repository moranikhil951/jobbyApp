import {BsSearch} from 'react-icons/bs'

import ProfileCard from '../ProfileCard'
import './index.css'

const FilterGroup = props => {
  const renderSearchInput = () => {
    const {searchInput, getJobsDetails} = props

    const mobileSearchInput = event => {
      const {onChangeSarchInput} = props
      onChangeSarchInput(event)
    }
    const onEnter = event => {
      if (event.key === 'Enter') {
        getJobsDetails()
      }
    }

    return (
      <div className="input-container-search-mobile">
        <input
          type="search"
          onChange={mobileSearchInput}
          value={searchInput}
          onKeyDown={onEnter}
          className="search-input-jobs-mobile"
          placeholder="Search"
        />
        <button
          data-testedid="searchButton"
          type="button"
          className="button-mobile"
        >
          <BsSearch className="search-icon-mobile" onClick={getJobsDetails} />
        </button>
      </div>
    )
  }

  const renderEmployment = () => {
    const {employmentTypesList} = props
    return (
      <div>
        <h1 className="filter-headings">Type of Employment</h1>
        <ul className="filterunordered-list">
          {employmentTypesList.map(eachType => {
            const {changeEmployeeOptions} = props
            const onChangeEmployee = event => {
              changeEmployeeOptions(event.target.value)
              console.log(event.target.value)
            }
            return (
              <li
                onChange={onChangeEmployee}
                key={eachType.employmentTypeId}
                className="filter-listed-items"
              >
                <input
                  type="checkbox"
                  id={eachType.employmentTypeId}
                  value={eachType.employmentTypeId}
                />
                <label
                  htmlFor={eachType.employmentTypeId}
                  className="label-filter-group"
                >
                  {eachType.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  const renderSalary = () => {
    const {salaryRangesList} = props
    return (
      <div>
        <h1 className="filter-headings">Salary Range</h1>
        <ul className="filterunordered-list">
          {salaryRangesList.map(eachSalary => {
            const {changeSalary} = props
            const onChangeSalary = event => {
              changeSalary(event.target.value)
            }
            return (
              <li key={eachSalary.salaryRangeId} onChange={onChangeSalary}>
                <input
                  type="radio"
                  id={eachSalary.salaryRangeId}
                  value={eachSalary.salaryRangeId}
                  name="salary"
                />
                <label
                  htmlFor={eachSalary.salaryRangeId}
                  className="label-filter-group"
                >
                  {eachSalary.label}
                </label>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  return (
    <div className="filter-group">
      {renderSearchInput()}
      <ProfileCard />
      <hr className="line" />
      {renderEmployment()}
      <hr className="line" />
      {renderSalary()}
    </div>
  )
}

export default FilterGroup
