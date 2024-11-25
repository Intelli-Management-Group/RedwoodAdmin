import requests from "./api";

const AdminServices = {
    adminLogin:  async (body) => {
        return requests.post("/admin/login", body);
      },

}
export default AdminServices;
