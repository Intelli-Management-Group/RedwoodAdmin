import requests from "./api";

const MediaServices = {
   MediaUpload:  async (body) => {
        return requests.upload("/media/upload", body);
      },
    getMediaList: async(body) =>{
      return requests.post("/media/list", body);
    },
    deleteMedia:async(id) =>{
      return requests.get(`/media/${id}/delete`);
    }
}
export default MediaServices;
