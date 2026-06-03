const TableUser = (props) => {
  const { listUsers } = props;

  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">ID</th>
          <th scope="col">Username</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col">Image</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        {listUsers &&
          listUsers.length > 0 &&
          listUsers.map((user, index) => {
            return (
              <tr key={`table-users-${index}`}>
                <th scope="row">{index + 1}</th>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>{user.role}</td>
                <td>
                  <button className="btn btn-info">View</button>
                  <button
                    className="btn btn-secondary mx-3"
                    onClick={() => props.handleSelectUser(user)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => props.handleDeleteUser(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        {listUsers && listUsers.length === 0 && (
          <tr>
            <td colSpan={7}>Notfound data!</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
export default TableUser;
