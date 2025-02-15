import requests from "./api";

const AdminServices = {
  tokenVerify: async (token) => {
    // try {
    //   const headers = {
    //     Authorization: `Bearer ${token}`,
    //   };

    //   const response = await requests.customPost("/authenticate", {}, headers); 

    //   return response;
    // } catch (error) {
    //   console.error("Error in tokenVerify:", error.response ? error.response.data : error.message);
    //   throw error;  
    // }
  },
  getUserDetails: async (id) => {
    return requests.get(`/user/${id}/get-by-id`);
  },
  adminLogin: async (body) => {
    return requests.post("/customer/login", body);
  },
  addUser: async (body) => {
    return requests.post("/customer/signup", body);
  },
  getUserWiseCount: async () => {
    return requests.get("/user/count-by-status",);
  },
  getAllUser: async ({ page, perPageRecords, body }) => {
    return requests.post(`/user/list?page=${page}&pageSize=${perPageRecords}`, body);
  },
  userDelete: async (id) => {
    return requests.get(`/user/${id}/delete`);
  },
  multipleDeleteUser: async (body) => {
    return requests.post(`/user/multiple-delete`, body);
  },
  userUpdateStatus: async (body) => {
    return requests.post(`/user/bulk-status-change`, body);
  },
  userUpdateRoles: async (body) => {
    return requests.post(`/user/bulk-role-change`, body);
  }

}
export default AdminServices;
