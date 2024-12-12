import api from "./api";

class UserServices {
  async getAll() {
    const response = await api.get("/users");
    return response.data;
  }

  async add(data) {
    const response = await api.post("/users", data);
    return response.data;
  }
}

export default new UserServices();
