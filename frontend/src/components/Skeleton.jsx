const Skeleton = ({ className = '' }) => {
  return (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}></div>
  )
}

export const ProjectCardSkeleton = () => {
  return (
    <div className="card">
      <Skeleton className="h-48 w-full rounded-xl mb-4" />
      <Skeleton className="h-6 w-3/4 mb-2" />
      <Skeleton className="h-4 w-full mb-1" />
      <Skeleton className="h-4 w-2/3 mb-4" />
      <div className="flex gap-2">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </div>
  )
}

export const SkillCardSkeleton = () => {
  return (
    <div className="card">
      <Skeleton className="h-12 w-12 rounded-xl mb-4" />
      <Skeleton className="h-5 w-24 mb-2" />
      <Skeleton className="h-3 w-full" />
    </div>
  )
}

export const MessageSkeleton = () => {
  return (
    <div className="card">
      <div className="flex justify-between items-start mb-2">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-20" />
      </div>
      <Skeleton className="h-4 w-48 mb-2" />
      <Skeleton className="h-4 w-full" />
    </div>
  )
}

export default Skeleton
