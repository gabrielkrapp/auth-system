import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../App";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { AiOutlinePlusCircle } from "react-icons/ai";

interface User {
  id: string;
  username: string;
  permissions: string;
}

const Admin = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
      setError("Failed to fetch users.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleDeleteUser = async (id: string) => {
    if (id === "23e3b910-b001-466d-9462-2e7ba205339f") {
      setError("You can't delete the admin user.");
      return;
    } else {
      try {
        await axios.delete(`${BASE_URL}/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchUsers();
      } catch (err) {
        console.log(err);
      }
    }
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
      <button className="flex items-center text-blue-500 hover:text-blue-700 bg-white px-3 py-2 rounded shadow transition duration-150 ease-in-out mb-3">
        <AiOutlinePlusCircle className="mr-2" />
        Add User
      </button>
      <div className="flex flex-wrap justify-center items-start w-full">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
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
                <FaEdit className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer" />
                <button
                  onClick={() => handleDeleteUser(user.id)}
                  className="focus:outline-none"
                >
                  <FaTrash className="h-6 w-6 text-red-500 hover:text-red-700 cursor-pointer" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Admin;
