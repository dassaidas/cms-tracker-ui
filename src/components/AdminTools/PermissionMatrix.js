import React, { useEffect, useState } from "react";
import permissionsClient from "../../api/permissionsClient";
import { useLoading } from "../../context/LoadingContext";
import { toast } from "react-toastify";

export default function PermissionMatrix() {
  const { setLoading } = useLoading();
  const [matrix, setMatrix] = useState([]);

  useEffect(() => {
    const fetchMatrix = async () => {
      setLoading(true);
      try {
        const data = await permissionsClient.getMatrix();
        setMatrix(data);
      } catch (err) {
        toast.error("Failed to load permission matrix");
      } finally {
        setLoading(false);
      }
    };

    fetchMatrix();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Permission Matrix</h2>
      {matrix.length === 0 ? (
        <p className="text-gray-500">No data available.</p>
      ) : (
        <div className="overflow-auto rounded border border-gray-300">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Role
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-gray-700">
                  Menus
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {matrix.map(({ role, menus }) => (
                <tr key={role}>
                  <td className="px-4 py-2 font-medium text-gray-800 whitespace-nowrap">
                    {role}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700">
                    {menus.length === 0 ? "-" : menus.join(", ")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
