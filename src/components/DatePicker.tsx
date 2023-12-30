"use client";
import { Months } from "@/constants/Months";
import { fetchTasks } from "@/libs/FetchTasks";
import { getErrorMessage } from "@/libs/GetErrorMessage";
import { TaskProps } from "@/props/TaskProps";
import { addDays, format } from "date-fns";
import { useSession } from "next-auth/react";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

// Date Picker interface
interface DatePickerProps {
  initialDate: Date;
  numDatesToShow: number;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTasks: React.Dispatch<React.SetStateAction<TaskProps[] | undefined>>;
}

const DatePicker: React.FC<DatePickerProps> = ({
  initialDate = new Date("2023-12-12"),
  numDatesToShow = 14,
  setTasks,
  setIsLoading,
  isLoading,
}) => {
  // Getting user data
  const { data: session } = useSession();

  // Variable states
  const [active, setActive] = useState<Date>(new Date());
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  // Scrolling to center of date picker calender if it is scrollable when mounted
  useEffect(() => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.scrollWidth;
      const scrollPosition = containerWidth / 2 - window.innerWidth / 2;
      scrollContainerRef.current.scrollTo(scrollPosition, 0);
    }
  }, []);

  // Handling scroll with buttons
  const handleScroll = (direction: "prev" | "next") => {
    if (scrollContainerRef.current) {
      const scrollAmount =
        direction === "next"
          ? scrollContainerRef.current.offsetWidth
          : -scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollLeft += scrollAmount;
    }
  };

  // Date Range Array
  const dateRangeArray = Array.from({ length: numDatesToShow }, (_, index) =>
    // @ts-ignore
    addDays(initialDate, index)
  );

  // Function to handle click i.e. selecting data and fetching tasks
  const handleClick = async (date: Date) => {
    setActive(date);
    setIsLoading(true);
    try {
      const currentTasks: TaskProps[] | undefined = await fetchTasks(
        date,
        // @ts-ignore
        session?.user?.accessToken
      );
      setTasks(currentTasks);
    } catch (error) {
      console.error(error);
      const errorMessage = getErrorMessage(error);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Getting selected date's month name
  const getMonth = (date: Date): string => {
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${Months[month]} - ${year}`;
  };

  return (
    <>
      {/* Month name */}
      <div className="mx-auto text-center mt-5 mb-2 text-white">
        <p className="text-xl font-semibold">{getMonth(active)}</p>
      </div>

      <div className="w-full sm:w-[31rem] lg:w-[45rem] xl:w-full mx-auto flex justify-center gap-1 overflow-hidden duration-500 text-white">
        {/* Scroll left button */}
        <button className="xl:opacity-30" onClick={() => handleScroll("prev")}>
          <MdArrowBackIos />
        </button>

        {/* Dates */}
        <div
          className="w-fit max-w-[90%] flex overflow-x-auto py-1 scroll-smooth NO_SCROLLBAR"
          ref={scrollContainerRef}
        >
          {dateRangeArray.map((date) => (
            // Date Button
            <button
              key={date.toString()}
              className={`w-12 px-2 lg:px-0 cursor-pointer mx-2 py-3 rounded-lg font-semibold ${
                active.toLocaleDateString() === date.toLocaleDateString()
                  ? "bg-green-300 text-[#323232]"
                  : ""
              }`}
              onClick={() => handleClick(date)}
              disabled={isLoading}
            >
              <p className="text-center">
                {
                  //@ts-ignore
                  format(date, "EEE")
                }
              </p>
              <p className="text-center">
                {
                  //@ts-ignore
                  format(date, "d")
                }
              </p>
            </button>
          ))}
        </div>

        {/* Right scroll button */}
        <button className="xl:opacity-30" onClick={() => handleScroll("next")}>
          <MdArrowForwardIos />
        </button>
      </div>
    </>
  );
};

export default DatePicker;
