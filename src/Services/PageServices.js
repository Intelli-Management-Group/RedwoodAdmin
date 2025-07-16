import requests from "./api";

const PageServices = {
  uploadPages: async (body) => {
    return requests.uploadPosts("/page/upload", body);
  },
  getPageList: async ({ page, perPageRecords, documentType }) => {
    //console.log("getPageList")

    if (documentType === "all") {
      return requests.post(`/page/list?page=${page}&pageSize=${perPageRecords}`,);
    } else {
      return requests.post(`/page/list?page=${page}&pageSize=${perPageRecords}&type=${documentType}`,);
    }

  },
  
  getPageListFilter: async ({ page, perPageRecords, body }) => {
    const queryParams = new URLSearchParams({
      page,
      pageSize: perPageRecords,
    }).toString();
  
    return requests.post(`/page/list?${queryParams}`, body); // Pass FormData as `body`
  },
  

  deletePages: async (id) => {
    return requests.get(`/page/${id}/delete`);
  },
  multiDeletePages:async (body) =>{
    return requests.post(`/page/multiple-delete`,body);

  }

}
export default PageServices;
