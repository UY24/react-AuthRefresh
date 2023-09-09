import axios from "axios";
axios.defaults.baseURL = "http://127.0.0.1:8000/api/";
let refresh = false;

axios.interceptors.response.use(
  (resp) => resp,
  async (error) => {
    if (error.response.status === 401 && !refresh) {
      refresh = true;

      const response = await axios.post(
        "refresh",
        // { withCredentials: true },
        // { crossOrigin: true }
      );

      if (response.status === 200) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data["access_token"]}`;

        return axios(error.config);
      }
    }
    refresh = false;
    return error;
  }
);
