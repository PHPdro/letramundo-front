import { request } from "./config";

export const studentProgress = async (id: number) => {
  return await request({
    endpoint: `students/${id}/progress`,
    method: "PUT",
  });
};
