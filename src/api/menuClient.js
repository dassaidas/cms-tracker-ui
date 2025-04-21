import api from "./apiClient";

const menuClient = {
  createMenu: (data) => {
    const cleanData = {
      ...data,
      parentId: data.parentId === "" ? null : data.parentId,
    };
    return api.post("/menus/createMenu", cleanData);
  },
  getParentMenus: () => api.get("/menus/parents").then((res) => res.data),
};

export default menuClient;
