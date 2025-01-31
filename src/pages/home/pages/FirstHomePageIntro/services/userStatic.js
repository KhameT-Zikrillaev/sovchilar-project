import api from "../../../../../services/api";

class UserStatic {
  async getSingle(status) {
    const response = await api.get("/users-uz/count/filter", { 
      params: { status } 
    });
    return response?.data;
  }
}

export default new UserStatic();
