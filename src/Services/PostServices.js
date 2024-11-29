import requests from "./api";

const PostServices = {
  uploadPost: async (body) => {
    return requests.post("/post/upload", body);
  },
  updatePost:async(id) =>{
    return requests.get(`/post/edit`);
  },
  getPostList: async ({ page, perPageRecords, body }) => {
    // if (body) {
    //   return requests.post(`/page/list?page=${page}&pageSize=${perPageRecords}&type=${documentType}`,);
    // }else{
        return requests.post(`/post/list?page=${page}&pageSize=${perPageRecords}`,body);
    // } 
  },
  getPostDetails:async (id) =>{
    return requests.get(`/post/${id}/get-by-id`);
  },
 
  deletePost: async (id) => {
    return requests.get(`/post/${id}/delete`);
  },
  multiDeletePost:async (body) =>{
    return requests.post(`/post/multiple-delete`,body);

  }

}
export default PostServices;
