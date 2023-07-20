import React, { useState, createContext, useContext } from "react";

const CalendarContext = createContext();
const CalendarModalContext = createContext();

// calendar
export const CalendarProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(null); // 선택한 요일
  const [selectedTodoData, setSelectedTodoData] = useState(null); // 선택한 하나의 단일 스케줄
  const [selectedTodayScheduleArr, setSelectedTodayScheduleArr] = useState([]); // 선택한 하루 동안의 스케줄 array

  return (
    <CalendarContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        selectedTodoData,
        setSelectedTodoData,
        selectedTodayScheduleArr,
        setSelectedTodayScheduleArr,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendar = () => {
  return useContext(CalendarContext);
};

// modal, nonmodal
export const CalendarModalProvider = ({ children }) => {
  const [isAddScheduleModalOpen, setIsAddScheduleModalOpen] = useState(false);

  return (
    <CalendarModalContext.Provider
      value={{ isAddScheduleModalOpen, setIsAddScheduleModalOpen }}
    >
      {children}
    </CalendarModalContext.Provider>
  );
};

export const useCalendarModal = () => {
  return useContext(CalendarModalContext);
};
