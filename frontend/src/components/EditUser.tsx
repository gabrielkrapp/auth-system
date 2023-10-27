import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { BasicModal } from "./Modal";
import { BASE_URL } from "../App";
import { AlertError, AlertSucces } from "./Alert";

interface EditUserProps {
  id: string;
  permissions: string;
  username: string;
  token: string;
  fetchUsers: () => void;
}

const EditUser: React.FC<EditUserProps> = ({
  id,
  username,
  permissions,
  token,
  fetchUsers,
}) => {
  const [openModal, setOpenModal] = useState(false);
  const [newUsername, setNewUsername] = useState(username);
  const [newPassword, setNewPassword] = useState("");
  const [newPermission, setNewPermission] = useState(permissions);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showAlertSucces, setShowAlertSucces] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSave = async () => {
    try {
      await fetch(`${BASE_URL}/users/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: newUsername,
          password: newPassword,
          permissions: newPermission,
        }),
      });
      handleCloseModal();
      setShowAlertSucces(true);
      setTimeout(() => {
        setShowAlertSucces(false);
      }, 5000);
      fetchUsers();
    } catch (error) {
      console.log(error);
      setShowErrorAlert(true);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 5000);
    }
  };

  return (
    <>
      {showAlertSucces && (
        <AlertSucces message={"User has successfully eddited!"} />
      )}
      {showErrorAlert && <AlertError message={"Error eddting user!"} />}
      <button onClick={handleOpenModal} className="focus:outline-none">
        <FaEdit className="h-6 w-6 text-gray-500 hover:text-gray-700 cursor-pointer" />
      </button>
      <BasicModal
        openModal={openModal}
        handleClose={handleCloseModal}
        handleSave={handleSave}
        permission={newPermission}
        setPermission={setNewPermission}
        username={newUsername}
        password={newPassword}
        setUsername={setNewUsername}
        setPassword={setNewPassword}
        isEditing={true}
      />
    </>
  );
};

export default EditUser;
