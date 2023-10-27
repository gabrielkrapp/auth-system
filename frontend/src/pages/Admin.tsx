import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../App";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import DeleteUser from "../components/DeleteUser";
import EditUser from "../components/EditUser";
import AddUser from "../components/AddUser";
import { AlertError } from "../components/Alert";
import MakeUserAdmin from "../components/MakeUserAdmin";

const Admin = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data.rows);
      setLoading(false);
    } catch (err) {
      setShowErrorAlert(true);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 5000);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="self-start mb-4">
        <button
          onClick={handleBackClick}
          className="flex items-center text-blue-500 hover:text-blue-700 bg-white px-3 py-2 rounded shadow transition duration-150 ease-in-out"
        >
          <FaArrowLeft className="mr-2" />
          Back
        </button>
      </div>
      <h1 className="text-3xl font-bold mb-6 mt-6">User List</h1>
      <AddUser fetchUsers={fetchUsers} />
      <div className="flex flex-wrap justify-center items-start w-full">
        {loading ? (
          <p>Loading...</p>
        ) : showErrorAlert ? (
          <AlertError message={"Failed to fetch users."} />
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className="m-4 relative bg-white p-8 rounded-lg shadow-md w-80 h-30"
            >
              <p>
                <span className="font-bold">ID:</span> {user.id}
              </p>
              <p>
                <span className="font-bold">Username:</span> {user.username}
              </p>
              <p>
                <span className="font-bold">Permissions:</span>{" "}
                {user.permissions}
              </p>
              <div className="absolute top-1 right-1 flex space-x-2">
                <EditUser
                  id={user.id}
                  permissions={user.permissions}
                  username={user.username}
                  token={token || ""}
                  fetchUsers={fetchUsers}
                />
                <MakeUserAdmin
                  id={user.id}
                  fetchUsers={fetchUsers}
                  token={token || ""}
                />
                <DeleteUser
                  id={user.id}
                  permissions={user.permissions}
                  fetchUsers={fetchUsers}
                  token={token || ""}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Admin;
