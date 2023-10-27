import { FaTrash } from "react-icons/fa";
import { BASE_URL } from "../App";
import axios from "axios";
import { useState } from "react";
import { AlertError, AlertSucces } from "./Alert";

interface DeleteUserProps {
  id: string;
  permissions: string;
  fetchUsers: () => void;
  token: string;
}

const DeleteUser: React.FC<DeleteUserProps> = ({
  id,
  permissions,
  fetchUsers,
  token,
}) => {
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showErrorAlertAdmin, setShowErrorAlertAdmin] = useState(false);
  const [showAlertSucces, setShowAlertSucces] = useState(false);

  const handleDeleteUser = async (id: string, permissions: string) => {
    if (permissions === "admin") {
      setShowErrorAlertAdmin(true);
      setTimeout(() => {
        setShowErrorAlertAdmin(false);
      }, 5000);
      return;
    } else {
      try {
        await axios.delete(`${BASE_URL}/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setShowAlertSucces(true);
        setTimeout(() => {
          setShowAlertSucces(false);
        }, 5000);
        fetchUsers();
      } catch (err) {
        setShowErrorAlert(true);
        setTimeout(() => {
          setShowErrorAlert(false);
        }, 5000);
      }
    }
  };

  return (
    <>
      {showAlertSucces && (
        <AlertSucces message={"User has successfully deleted!"} />
      )}
      {showErrorAlertAdmin && (
        <AlertError message={"You can't delete an admin user!"} />
      )}
      {showErrorAlert && <AlertError message={"Error deleting a user!"} />}
      <button
        onClick={() => handleDeleteUser(id, permissions)}
        className="focus:outline-none"
      >
        <FaTrash className="h-6 w-6 text-red-500 hover:text-red-700 cursor-pointer" />
      </button>
    </>
  );
};

export default DeleteUser;
