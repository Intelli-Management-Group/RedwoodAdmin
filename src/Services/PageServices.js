import requests from "./api";

const PageServices = {
  uploadPages: async (body) => {
    return requests.post("/page/upload", body);
  },
  getPageList: async ({ page, perPageRecords, documentType }) => {
    console.log("page", page);
    console.log("perPageRecords", perPageRecords);
    console.log("documentType", documentType);
    return requests.post(`/page/list?page=${page}&pageSize=${perPageRecords}&type=${documentType}`,);
  },
  deletePages:async(id) =>{
    return requests.get(`/page/${id}/delete`);
  }

}
export default PageServices;
