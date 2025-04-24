import { request } from "./config";

interface Student {
  name: string;
  year: number;
  class: string;
  theme_id: number;
}

export const createStudent = async (data: Student) => {
  return await request({
    endpoint: "students",
    method: "POST",
    data: data,
  });
};

export const getStudents = async () => {
  return await request({
    endpoint: "students",
    method: "GET",
  });
};
