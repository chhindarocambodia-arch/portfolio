const SkillCard = ({ skill }) => {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium">{skill.name}</span>
      <div className="flex items-center gap-2">
        <div className="w-20 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
            style={{ width: `${skill.proficiency}%` }}
          ></div>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400 w-8">
          {skill.proficiency}%
        </span>
      </div>
    </div>
  )
}

export default SkillCard
