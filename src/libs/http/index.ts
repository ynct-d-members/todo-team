import { instance } from "./config";

async function get<T>(path: string) {
  return await instance.get<T>(path).then((res) => {
    return res.data;
  });
}

async function post<T>(path: string, data: unknown) {
  return await instance.post<T>(path, data).then((res) => {
    return res.data;
  });
}

// delete は組み込み関数なので remove にした
async function remove<T>(path: string) {
  return await instance.delete<T>(path).then((res) => {
    return res.data;
  });
}

async function patch<T>(path: string, data: unknown) {
  return await instance.patch<T>(path, data).then((res) => {
    return res.data;
  });
}

export const http = {
  get,
  post,
  remove,
  patch,
};
