import axios from "axios";
const apiServer = import.meta.env.VITE_BACKEND_SERVER;

export const call = async (cmd, args = {}, method) => {
  try {
    if (!method) {
      method = Object.keys(args).length == 0 ? "GET" : "POST";
    }
    let url = `${apiServer}/${cmd}`;
    if (Object.keys(args).length && method == "GET") {
      url += "?" + new URLSearchParams(args).toString();
    }

    let header = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    let config = {
      url,
      method,
      headers: header,
      data: JSON.stringify(args),
    };
    let { data: response } = await axios(config);
    return response;
  } catch (error) {
    console.log(error);
  }
};
