"use client";
import { Months } from "@/constants/Months";
import { AppContext } from "@/context/AppContext";
import { fetchTasks } from "@/libs/FetchTasks";
import { getErrorMessage } from "@/libs/GetErrorMessage";
import { TaskProps } from "@/props/TaskProps";
import axios from "axios";
import { addDays, format } from "date-fns";
import { useSession } from "next-auth/react";
import React, { useContext, useEffect, useRef, useState } from "react";
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

  // context
  const { isOpen } = useContext(AppContext);

  // Variable states
  const [active, setActive] = useState<Date>(new Date());
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const controller = useRef(new AbortController());

  // Scrolling to center of date picker calender if it is scrollable when mounted
  useEffect(() => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.scrollWidth;
      const scrollPosition = containerWidth / 2 - window.innerWidth / 2;
      scrollContainerRef.current.scrollTo(scrollPosition, 0);
    }

    // Cleanup function when the component is unmounted
    return () => {
      controller.current.abort();
    };
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

    const { signal } = controller.current;
    try {
      const currentTasks: TaskProps[] | undefined = await fetchTasks(
        date,
        // @ts-ignore
        session?.user?.accessToken
      );
      setTasks(currentTasks);
    } catch (error) {
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

      <div
        className={`w-full mx-auto flex justify-center gap-1 overflow-hidden duration-500 text-white ${
          isOpen ? "md:w-[calc(100vw_-20rem)]" : "md:w-full"
        } `}
      >
        {/* Scroll left button */}
        <button
          className="xl:opacity-30"
          aria-label="scroll-btn-left"
          onClick={() => handleScroll("prev")}
        >
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
              aria-label="date-picker-button"
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
        <button
          className="xl:opacity-30"
          aria-label="scroll-btn-right"
          onClick={() => handleScroll("next")}
        >
          <MdArrowForwardIos />
        </button>
      </div>
    </>
  );
};

export default DatePicker;
