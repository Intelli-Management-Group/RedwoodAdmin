import requests from "./api";

const MediaServices = {
   MediaUpload:  async (body) => {
        return requests.upload("/media/upload", body);
      },
    getMediaList: async(body) =>{
      return requests.post("/media/list", body);
    }
}
export default MediaServices;
