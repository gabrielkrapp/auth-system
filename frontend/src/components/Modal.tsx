import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  borderRadius: 5,
  boxShadow: 24,
  p: 4,
};

interface ModalProps {
  handleClose: () => void;
  handleSave: () => void;
  openModal: boolean;
  permission: string;
  setPermission: (value: string) => void;
  username: string;
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  password: string;
  isEditing: boolean;
}

export const BasicModal: React.FC<ModalProps> = ({
  openModal,
  handleClose,
  handleSave,
  permission,
  setPermission,
  username,
  setUsername,
  password,
  setPassword,
  isEditing,
}) => {
  return (
    <div>
      <Modal
        open={openModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {isEditing ? (
            <div className="mb-4">
              <label
                className="block text-sm font-bold mb-2"
                htmlFor="permission"
              >
                Permission
              </label>
              <select
                id="permission"
                value={permission}
                onChange={(e) =>
                  setPermission(e.target.value as "user" | "admin")
                }
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          ) : null}
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <button
            onClick={() => {
              handleSave();
              handleClose();
            }}
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {isEditing ? "EDIT" : "ADD"}
          </button>
        </Box>
      </Modal>
    </div>
  );
};
