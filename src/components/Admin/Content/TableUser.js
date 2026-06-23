const TableUser = (props) => {
  const { listUsers } = props;

  return (
    <table className="table table-striped table-hover">
      <thead>
        <tr>
          <th className="text-center" scope="col">
            #
          </th>
          <th className="text-center" scope="col">
            ID
          </th>
          <th scope="col">Username</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th className="text-center" scope="col">
            Image
          </th>
          <th className="text-center" scope="col">
            Action
          </th>
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
                <td className="text-center">
                  <img
                    style={{ height: "100px" }}
                    src={`data:image/jpeg;base64,${user.image}`}
                  />
                </td>

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
