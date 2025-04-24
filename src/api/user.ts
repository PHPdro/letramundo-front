import { request } from "./config";

interface CreateUser {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export const createUser = async (data: CreateUser) => {
  return await request({
    endpoint: "register",
    method: "POST",
    data: data,
  });
};
