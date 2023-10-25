import axios from "axios";
import { useEffect, useState } from "react";
import { BASE_URL } from "../App";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";

interface UserData {
  id: string;
  username: string;
  permissions: string;
}

const Home = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  const loggout = () => {
    localStorage.removeItem("authToken");
    window.location.reload();
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/getuser`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
      } catch (error) {
        setError("Failed to login.");
      }
    };

    fetchUserData();
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="relative bg-white p-8 rounded-lg shadow-md w-96">
        {userData?.permissions === "admin" && (
          <div
            className="absolute top-4 right-4 cursor-pointer"
            onClick={() => navigate("/admin")}
          >
            <FaUser size={24} />
          </div>
        )}
        <h1 className="text-2xl font-bold mb-4">Well Come!</h1>

        {loading ? (
          <p className="mb-4 text-gray-500">Loading...</p>
        ) : userData ? (
          <>
            <p className="mb-4">Your user infos:</p>
            <div className="mb-4 bg-gray-50 p-4 rounded">
              <p>
                <span className="font-bold">ID:</span> {userData.id}
              </p>
              <p>
                <span className="font-bold">Username:</span> {userData.username}
              </p>
              <p>
                <span className="font-bold">Permissions:</span>{" "}
                {userData.permissions}
              </p>
            </div>
          </>
        ) : (
          <div className="mb-4 p-4 bg-red-50 text-red-700 rounded border border-red-400">
            <p>Erro ao buscar os dados do usuário.</p>
            {error && <p className="mt-2 text-sm">{error}</p>}
          </div>
        )}

        <button
          onClick={loggout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
