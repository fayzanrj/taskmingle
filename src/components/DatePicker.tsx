"use client";
// Import required libraries and styles
import React, { useState, useRef, useEffect } from "react";
import { format, addDays } from "date-fns";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
import { Months } from "@/constants/Months";
import { TaskProps } from "@/props/TaskProps";
import axios from "axios";
import { useSession } from "next-auth/react";

interface HorizontalDatePickerProps {
  initialDate: Date;
  numDatesToShow: number;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setTasks: React.Dispatch<React.SetStateAction<TaskProps[]>>;
}

const DatePicker: React.FC<HorizontalDatePickerProps> = ({
  initialDate = new Date("2023-12-12"),
  numDatesToShow = 14,
  setTasks,
  setIsLoading,
}) => {
  
  const { data: session } = useSession();
  const [active, setActive] = useState<Date>(new Date());
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      const buttonWidth =
        scrollContainerRef.current.offsetWidth / numDatesToShow;
      const selectedIndex = dateRangeArray.findIndex(
        (date) => date.getTime() === active.getTime()
      );

      if (selectedIndex !== -1) {
        const scrollLeft =
          buttonWidth * selectedIndex -
          scrollContainerRef.current.offsetWidth / 2 +
          buttonWidth / 2;

        scrollContainerRef.current.scrollLeft = scrollLeft;
      }
    }
  }, [numDatesToShow]);

  const fetchTasks = async (date: any) => {
    setIsLoading(true);
    const encodedDate = encodeURIComponent(new Date(date).toDateString());

    // HEADERS FOR API REQUEST
    const headers = {
      "Content-Type": "application/json",
      // @ts-ignore
      accessToken: session?.user?.accessToken,
    };

    try {
      const res = await axios.get(`/api/tasks/getAllTasks/${encodedDate}`, {
        headers,
      });
      setTasks(res.data.tasks);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleClick = (date: Date): void => {
    setActive(date);
    fetchTasks(date);
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
            <div
              key={date.toString()}
              className={`w-12 px-2 lg:px-0 cursor-pointer mx-2 py-3 rounded-lg font-semibold ${
                active.toLocaleDateString() === date.toLocaleDateString()
                  ? "bg-green-300"
                  : ""
              }`}
              onClick={() => handleClick(date)}
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
            </div>
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
