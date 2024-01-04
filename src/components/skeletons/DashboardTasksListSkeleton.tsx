import React from "react";

const DashboardTasksListSkeleton = () => (
  <>
  <DashboardTasksListSkeletonItem/>
  <DashboardTasksListSkeletonItem/>
  <DashboardTasksListSkeletonItem/>
  <DashboardTasksListSkeletonItem/>
  </>
);

export default DashboardTasksListSkeleton;

const DashboardTasksListSkeletonItem = () => (
  <div className="min-w-[15rem] max-w-[15rem] h-44 rounded-lg dark:bg-[#404040] bg-gray-200 animate-pulse"></div>
);
