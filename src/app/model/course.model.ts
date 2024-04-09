import { Teacher } from "./teacher.model";

export class Course {
  id: number;
  courseName: string;
  description: string;
  teacher: Teacher
}