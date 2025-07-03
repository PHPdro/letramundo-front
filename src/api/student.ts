import { request } from "./config";

interface Student {
  id?: number;
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

export const deleteStudent = async (id: number) => {
  return await request({
    endpoint: `students/${id}`,
    method: "DELETE",
  });
};

export const updateStudent = async (data: Student) => {
  return await request({
    endpoint: `students/${data.id}`,
    method: "PUT",
    data: data,
  });
};
