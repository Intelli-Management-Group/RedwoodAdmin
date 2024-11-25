import requests from "./api";

const PageServices = {
    uploadPages:  async (body) => {
        return requests.post("/page/upload", body);
      },

}
export default PageServices;
