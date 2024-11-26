import requests from "./api";

const AdminServices = {
    adminLogin:  async (body) => {
        return requests.post("/admin/login", body);
      },
      addUser: async(body) => {
        return requests.post("/admin-panel-user/upsert", body);
      },
      getUserWiseCount:async() => {
        return requests.get("/admin-panel-user/user-count-by-status", );
      },
      getAllUser:async() =>{
        return requests.post("/admin-panel-user/list", );
      },
      userDelete: async (id) => {
        return requests.get(`/admin-panel-user/${id}/delete`);
      },
      multipleDeleteUser:async (body) =>{
        return requests.post(`/admin-panel-user/multiple-delete`,body);
    
      }

}
export default AdminServices;
