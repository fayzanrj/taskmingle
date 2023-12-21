import TasksCounter from "@/components/dashboard/TasksCounter";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";

const Dashboard = async () => {
  const data = await getServerSession(authOptions);

  return (
    <div className="p-10">
      <section className="flex justify-center gap-3  md:gap-10 lg:gap:20 flex-wrap">
        <TasksCounter
          header="Today's Tasks"
          totalTasks={20}
          completedTasks={13}
        />
        <TasksCounter
          header="Monthly Tasks"
          totalTasks={31}
          completedTasks={23}
        />
        <TasksCounter
          header="Overdue Tasks"
          totalTasks={3}
          completedTasks={1}
        />
      </section>

      <section className="mt-10">
        <div className="flex justify-between items-center">
          <h3 className="text-3xl font-bold">Today's Board</h3>
          <Link href={"/dashboard/tasks/addtask"}>
            <p className="bg-[#19fa9a] font-semibold py-2 px-8 rounded-lg">
              Add Task
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
