import { request } from "./config";

export const getThemes = async () => {
  return await request({
    endpoint: "themes",
    method: "GET",
  });
};
