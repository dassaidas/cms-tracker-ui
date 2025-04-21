import { useState, useEffect } from "react";
import menuClient from "../../api/menuClient";
import { toast } from "react-toastify";

export default function MenuForm() {
  const [form, setForm] = useState({
    name: "",
    path: "",
    icon: "",
    parentId: "",
    orderIndex: 1,
    isActive: true,
    type: "page",
  });

  const [parentMenus, setParentMenus] = useState([]);

  useEffect(() => {
    menuClient
      .getParentMenus()
      .then(setParentMenus)
      .catch(() => toast.error("Failed to load parent menus"));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await menuClient.createMenu(form);
      toast.success("Menu created successfully");
      setForm({
        name: "",
        path: "",
        icon: "",
        parentId: "",
        orderIndex: 1,
        isActive: true,
        type: "page",
      });
    } catch (err) {
      toast.error("Failed to create menu");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        placeholder="Menu Name"
        required
      />
      <input
        name="path"
        value={form.path}
        onChange={handleChange}
        placeholder="Route Path (e.g. /reports)"
        required
      />
      <input
        name="icon"
        value={form.icon}
        onChange={handleChange}
        placeholder="Icon (e.g. FaUsers)"
      />

      <select name="parentId" value={form.parentId} onChange={handleChange}>
        <option value="">No Parent (Top-level)</option>
        {parentMenus.map((menu) => (
          <option key={menu.id} value={menu.id}>
            {menu.name}
          </option>
        ))}
      </select>

      <input
        type="number"
        name="orderIndex"
        value={form.orderIndex}
        onChange={handleChange}
      />
      <select name="type" value={form.type} onChange={handleChange}>
        <option value="page">Page</option>
        <option value="group">Group</option>
      </select>

      <label>
        <input
          type="checkbox"
          name="isActive"
          checked={form.isActive}
          onChange={handleChange}
        />
        Active
      </label>

      <button type="submit">➕ Create Menu</button>
    </form>
  );
}
