import { GrUserAdmin } from "react-icons/gr";
import { BASE_URL } from "../App";
import axios from "axios";
import { useState } from "react";
import { AlertError, AlertSucces } from "./Alert";

interface MakeUserAdminProps {
  id: string;
  fetchUsers: () => void;
  token: string;
}

const MakeUserAdmin: React.FC<MakeUserAdminProps> = ({
  id,
  fetchUsers,
  token,
}) => {
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showAlertSucces, setShowAlertSucces] = useState(false);

  const handleMakeUserAdmin = async (id: string, token: string) => {
    try {
      await axios.put(
        `${BASE_URL}/users/admin/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setShowAlertSucces(true);
      setTimeout(() => {
        setShowAlertSucces(false);
      }, 5000);
      fetchUsers();
    } catch (error) {
      setShowErrorAlert(true);
      setTimeout(() => {
        setShowErrorAlert(false);
      }, 5000);
    }
  };

  return (
    <>
      {showAlertSucces && (
        <AlertSucces
          message={"User has successfully become an administrator"}
        />
      )}
      {showErrorAlert && <AlertError message={"Failed to make user admin."} />}
      <button
        onClick={() => handleMakeUserAdmin(id, token)}
        className="focus:outline-none"
      >
        <GrUserAdmin className="h-6 w-6 text-red-500 hover:text-red-700 cursor-pointer" />
      </button>
    </>
  );
};

export default MakeUserAdmin;
