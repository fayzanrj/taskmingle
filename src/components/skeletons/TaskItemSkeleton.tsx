
const TaskItemSkeletonItem = () => {
  return (
    <div className="block">
      <div className="w-80 h-56 sm:w-72 sm:h-40 rounded-xl dark:bg-[#404040] bg-gray-200 select-none block"></div>
      {/* <div className="w-40 h-5 sm:w-32 ml-2 rounded-full bg-gray-200 mt-2 block"></div> */}
    </div>
  );
};

const TaskItemSkeleton = () => {
  const skeletonCount = 3;
  const skeletons = Array.from({ length: skeletonCount });

  return (
    <div className="animate-pulse duration-75 w-full overflow-hidden py-10 px-10  flex justify-center gap-5 md:gap-5  flex-wrap ">
      {skeletons.map((_, index) => (
        <TaskItemSkeletonItem key={index} />
      ))}
    </div>
  );
};

export default TaskItemSkeleton;
