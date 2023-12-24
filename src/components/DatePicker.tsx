"use client";
// Import required libraries and styles
import React, { useState, useRef, useEffect } from "react";
import { format, addDays } from "date-fns";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { Months } from "@/constants/Months";
import { TaskProps } from "@/props/TaskProps";
import axios from "axios";
import { useSession } from "next-auth/react";
import { fetchTasks } from "@/libs/FetchTasks";

interface HorizontalDatePickerProps {
  initialDate: Date;
  numDatesToShow: number;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTasks: React.Dispatch<React.SetStateAction<TaskProps[] | undefined>>;
}

const DatePicker: React.FC<HorizontalDatePickerProps> = ({
  initialDate = new Date("2023-12-12"),
  numDatesToShow = 14,
  setTasks,
  setIsLoading,
  isLoading,
}) => {
  const { data: session } = useSession();
  const [active, setActive] = useState<Date>(new Date());
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const containerWidth = scrollContainerRef.current.scrollWidth;
      const scrollPosition = containerWidth / 2 - window.innerWidth / 2;
      scrollContainerRef.current.scrollTo(scrollPosition, 0);
    }
    
  }, []); 

  const handleScroll = (direction: "prev" | "next") => {
    if (scrollContainerRef.current) {
      const scrollAmount =
        direction === "next"
          ? scrollContainerRef.current.offsetWidth
          : -scrollContainerRef.current.offsetWidth;
      scrollContainerRef.current.scrollLeft += scrollAmount;
    }
  };

  const dateRangeArray = Array.from({ length: numDatesToShow }, (_, index) =>
    // @ts-ignore
    addDays(initialDate, index)
  );

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
    } finally {
      setIsLoading(false);
    }
  };

  const getMonth = (date: Date): string => {
    const month = date.getMonth();
    const year = date.getFullYear();
    return `${Months[month]} - ${year}`;
  };

  return (
    <>
      <div className="mx-auto text-center mt-5 mb-2">
        <p className="text-xl font-semibold">{getMonth(active)}</p>
      </div>
      <div className="w-full sm:w-[31rem] lg:w-[45rem] xl:w-full mx-auto flex justify-center gap-1 overflow-hidden duration-500">
        <button className="xl:opacity-30" onClick={() => handleScroll("prev")}>
          <MdArrowBackIos />
        </button>
        <div
          className="w-fit max-w-[90%] flex overflow-x-auto py-1 scroll-smooth NO_SCROLLBAR"
          ref={scrollContainerRef}
        >
          {dateRangeArray.map((date) => (
            <button
              key={date.toString()}
              className={`w-12 px-2 lg:px-0 cursor-pointer mx-2 py-3 rounded-lg font-semibold ${
                active.toLocaleDateString() === date.toLocaleDateString()
                  ? "bg-green-300"
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
        <button className="xl:opacity-30" onClick={() => handleScroll("next")}>
          <MdArrowForwardIos />
        </button>
      </div>
    </>
  );
};

export default DatePicker;
