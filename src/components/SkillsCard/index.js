import './index.css'

const SkillCard = props => {
  const {eachSkills} = props

  return (
    <li className="listed-containers" key={eachSkills.id}>
      <img src={eachSkills.imageUrl} alt="img" className="imageUrl-skill" />
      <h1 className="skillNames">{eachSkills.name}</h1>
    </li>
  )
}

export default SkillCard
