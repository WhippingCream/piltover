import { DayOfWeek, IDatePickerProps } from "@fluentui/react";

import { DateTime } from "luxon";

export const CONSTANT_KR_DAY_OF_WEEK_LIST = [
  "일요일",
  "월요일",
  "화요일",
  "수요일",
  "목요일",
  "금요일",
  "토요일",
];
export const CONSTANT_KR_DAY_OF_WEEK_SHORT_LIST = [
  "일",
  "월",
  "화",
  "수",
  "목",
  "금",
  "토",
];
export const CONSTANT_KR_MONTH_LIST = [
  "1월",
  "2월",
  "3월",
  "4월",
  "5월",
  "6월",
  "7월",
  "8월",
  "9월",
  "10월",
  "11월",
  "12월",
];

export const DatePickerKrOptions: IDatePickerProps = {
  firstDayOfWeek: DayOfWeek.Sunday,
  dateTimeFormatter: {
    formatDay: (date: Date) => `${DateTime.fromJSDate(date).day}`,
    formatMonth: (date: Date) => `${DateTime.fromJSDate(date).month}`,
    formatYear: (date: Date) => `${DateTime.fromJSDate(date).year}`,
    formatMonthDayYear: (date: Date) =>
      `${DateTime.fromJSDate(date).year}년 ${
        DateTime.fromJSDate(date).month
      }월 ${DateTime.fromJSDate(date).day}일`,
    formatMonthYear: (date: Date) =>
      `${DateTime.fromJSDate(date).year}년 ${
        DateTime.fromJSDate(date).month
      }월`,
  },
  strings: {
    months: CONSTANT_KR_MONTH_LIST,
    shortMonths: CONSTANT_KR_MONTH_LIST,
    days: CONSTANT_KR_DAY_OF_WEEK_LIST,
    shortDays: CONSTANT_KR_DAY_OF_WEEK_SHORT_LIST,
    goToToday: "오늘 날짜로 이동",
    prevMonthAriaLabel: "이전 달로 넘어가기",
    nextMonthAriaLabel: "다음 달로 넘어가기",
    prevYearAriaLabel: "이전 해로 넘어가기",
    nextYearAriaLabel: "다음 해로 넘어가기",
  },
  placeholder: "날짜를 선택해 주세요.",
  ariaLabel: "날짜를 선택해 주세요.",
  formatDate: (date) => (date ? DateTime.fromJSDate(date).toFormat("DD") : ""),
};
