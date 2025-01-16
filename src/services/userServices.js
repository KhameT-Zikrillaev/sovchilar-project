import api from "./api";

class UserServices {
  async getAll(gender, ageFrom, ageTo, address, maritalStatus) {
    // console.log(gender, ageFrom, ageTo, address, maritalStatus);
    const response = await api.get(
      `/users-uz?${gender}&ageFrom=${ageFrom}&ageTo=${ageTo}${address}${maritalStatus}&status=ACTIVE`
    );
    return response.data;
  }
  async add(data) {
    const response = await api.post("/users-uz", data);
    return response.data;
  }
  async addimages(data) {
    const response = await api.post("/file/upload", data);
    return response.data;
  }
  async getSingle(id) {
    const response = await api.get(`/users-uz/${id}`);
    return response.data;
  }
  async postItem(data, url) {
    const response = await api.post(url, data);
    return response.data;
  }
  async getPhone(url) {
    const response = await api.get(url);
    return response.data;
  }
  async editUser(url, data) {
    const response = await api.put(url, data);
    return response.data;
  }
  async updatePassword(url, data) {
    const response = await api.put(url, data);
    return response.data;
  }
  async loginUser(url, data) {
    const response = await api.post(url, data);
    return response.data;
  }

  async postFavorite(url, data, headers) {
    const response = await api.post(url, data, headers);
    return response.data;
  }
}

export default new UserServices();
