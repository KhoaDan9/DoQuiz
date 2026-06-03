import { useEffect, useState } from "react";
import ModalActionUser from "./ModalActionUser";
import { FcPlus } from "react-icons/fc";
import TableUser from "./TableUser";
import { getAllUsers, getUserWithPaginate } from "../../services/apiService";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

const ManageUser = (props) => {
  const LIMIT_USER = 5;

  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
  const [listUsers, setListUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [isCreate, setIsCreate] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);

  const fetchListUsers = async () => {
    let res = await getAllUsers();
    if (res.EC === 0) {
      setListUsers(res.DT);
    }
  };

  const fetchListUsersWithPaginate = async (page) => {
    let res = await getUserWithPaginate(page, LIMIT_USER);
    if (res.EC === 0) {
      setListUsers(res.DT.users);
      setPageCount(res.DT.totalPages);
    }
  };

  const handleCreateUser = () => {
    setShowModalCreateUser(true);
    setSelectedUser({});
    setIsCreate(true);
  };

  const handleSelectUser = (user) => {
    setShowModalCreateUser(true);
    setSelectedUser(user);
    setIsCreate(false);
  };

  const handleDeleteUser = (user) => {
    setShowModalDeleteUser(true);
    setSelectedUser(user);
  };

  useEffect(() => {
    // fetchListUsers();
    fetchListUsersWithPaginate(currentPage);
  }, [currentPage]);

  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="users-content">
        <div className="btn-add-new">
          <button
            className="btn btn-primary"
            onClick={() => handleCreateUser()}
          >
            <FcPlus />
            Add new users
          </button>
        </div>
        <div className="table-users-container">
          {/* <TableUser
            listUsers={listUsers}
            handleSelectUser={handleSelectUser}
            handleDeleteUser={handleDeleteUser}
          /> */}
          <TableUserPaginate
            listUsers={listUsers}
            handleSelectUser={handleSelectUser}
            handleDeleteUser={handleDeleteUser}
            setCurrentPage={setCurrentPage}
            pageCount={pageCount}
            currentPage={currentPage}
          />
        </div>
        <ModalActionUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchListUsers={fetchListUsers}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          isCreate={isCreate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalDeleteUser
          show={showModalDeleteUser}
          setShow={setShowModalDeleteUser}
          fetchListUsers={fetchListUsers}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          deleteData={selectedUser}
          setDeleteUser={setSelectedUser}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default ManageUser;
