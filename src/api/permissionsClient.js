import api from "./apiClient";

const permissionsClient = {
  async getMatrix() {
    const response = await api.get("/permissions/matrix");
    return response.data;
  },
};

export default permissionsClient;
