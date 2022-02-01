import React from "react";

import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import "react-multi-date-picker/styles/layouts/mobile.css";
import "react-multi-date-picker/styles/backgrounds/bg-dark.css";
import styled from "styled-components";

import useBreakpoints from "../../utils/useBreakPoints";

const Wraper = styled.div`
  .custom-calendar.rmdp-wrapper,
  .rmdp-container .custom-calendar.ep-arrow::after,
  .custom-calendar .rmdp-month-picker,
  .custom-calendar .rmdp-year-picker {
    background-color: ${({ theme }) => theme.primary};
  }

  .rmdp-container .custom-calendar.ep-arrow[direction="bottom"] {
    border-top: none;
  }
  .rmdp-container .custom-calendar .rmdp-day,
  .rmdp-container .custom-calendar .rmdp-header-values {
    color: #9a9b9f;
  }
  .rmdp-container .custom-calendar .rmdp-day.rmdp-disabled {
    color: #223a4d;
  }
  .rmdp-day.rmdp-selected span:not(.highlight) {
    background-color: ${({ theme }) => theme.darkAccent};
    box-shadow: 0 0 3px #8798ad;
    color: white;
  }
  .rmdp-day:not(.rmdp-disabled):not(.rmdp-day-hidden) span:hover {
    background-color: ${({ theme }) => theme.accent};
    color: white;
  }

  .rmdp-container .custom-calendar.ep-arrow[direction="top"] {
    border-bottom: none;
  }
`;

const BirthdayPicker = ({ onChange, value, InputComponent }) => {
  const { isSm } = useBreakpoints();

  return (
    <Wraper>
      <DatePicker
        calendarPosition="bottom-right"
        className={`custom-calendar ${!isSm && "rmdp-mobile"}`}
        hideWeekDays
        calendar={persian}
        locale={persian_fa}
        format="DD / MMMM / YYYY"
        onChange={onChange}
        value={value}
        onOpen={() =>
          value === "" ? onChange(new DateObject().subtract(12, "year")) : null
        }
        render={InputComponent}
        maxDate={new DateObject().subtract(12, "year")}
        minDate={new DateObject().subtract(100, "year")}
      />
    </Wraper>
  );
};

export default BirthdayPicker;
