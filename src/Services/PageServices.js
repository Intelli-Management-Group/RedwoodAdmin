import requests from "./api";

const PageServices = {
  uploadPages: async (body) => {
    return requests.post("/page/upload", body);
  },
  getPageList: async ({ page, perPageRecords, documentType }) => {
    
    if(documentType === "all"){
        return requests.post(`/page/list?page=${page}&pageSize=${perPageRecords}`,);
    }else{
      return requests.post(`/page/list?page=${page}&pageSize=${perPageRecords}&type=${documentType}`,);
    }
    
  },
  deletePages:async(id) =>{
    return requests.get(`/page/${id}/delete`);
  }

}
export default PageServices;
