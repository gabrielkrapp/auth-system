import { useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BASE_URL } from "../App";
import { BasicModal } from "./Modal";
import { AlertError, AlertSucces } from "./Alert";

interface AddUserProps {
  fetchUsers: () => void;
}

const AddUser: React.FC<AddUserProps> = ({ fetchUsers }) => {
  const [openModal, setOpenModal] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [permission, setPermission] = useState("");
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
      await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
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
        <AlertSucces message={"User has successfully added!"} />
      )}
      {showErrorAlert && <AlertError message={"Error adding user!"} />}
      <button
        onClick={handleOpenModal}
        className="flex items-center text-blue-500 hover:text-blue-700 bg-white px-3 py-2 rounded shadow transition duration-150 ease-in-out mb-3"
      >
        <AiOutlinePlusCircle className="mr-2" />
        Add User
      </button>
      <BasicModal
        openModal={openModal}
        handleClose={handleCloseModal}
        handleSave={handleSave}
        permission={permission}
        setPermission={setPermission}
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        isEditing={false}
      />
    </>
  );
};

export default AddUser;
