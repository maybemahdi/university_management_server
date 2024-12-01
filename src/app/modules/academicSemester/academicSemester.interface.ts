export type TAcademicSemesterName = "Autumn" | "Summer" | "Fall";
export type TAcademicSemesterCode = "01" | "02" | "03";
export type TAcademicSemesterMonth =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export interface IAcademicSemester {
  name: TAcademicSemesterName;
  year: string;
  code: TAcademicSemesterCode;
  startMonth: TAcademicSemesterMonth;
  endMonth: TAcademicSemesterMonth;
}
export interface TAcademicSemesterNameCodeMapper {
  [key: string]: string;
}
