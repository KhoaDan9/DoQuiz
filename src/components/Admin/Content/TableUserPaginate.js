import ReactPaginate from "react-paginate";
import { useTranslation } from "react-i18next";

const TableUserPaginate = (props) => {
  const { listUsers, pageCount, currentPage, setCurrentPage } = props;
  const { t } = useTranslation();

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <>
      <table className="table table-striped table-hover table-manage-user">
        <thead>
          <tr>
            <th className="text-center" scope="col">
              #
            </th>
            <th className="text-center" scope="col">
              ID
            </th>
            <th scope="col">{t("user-mng.table.username")}</th>
            <th scope="col">{t("user-mng.table.email")}</th>
            <th scope="col">{t("user-mng.table.role")}</th>
            <th className="text-center" scope="col">
              {t("user-mng.table.image")}
            </th>
            <th className="text-center" scope="col">
              {t("user-mng.table.action")}
            </th>
          </tr>
        </thead>
        <tbody>
          {listUsers &&
            listUsers.length > 0 &&
            listUsers.map((user, index) => {
              return (
                <tr key={`table-users-${index}`}>
                  <th className="text-center" scope="row">
                    {index + 1}
                  </th>
                  <td className="text-center">{user.id}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td className="text-center">
                    {user.image ? (
                      <img
                        style={{ height: "100px" }}
                        src={`data:image/jpeg;base64,${user.image}`}
                      />
                    ) : (
                      <span>{t("user-mng.table.no-img")}</span>
                    )}
                  </td>
                  <td
                    className="text-center"
                    style={{ width: "1%", whiteSpace: "nowrap" }}
                  >
                    <button className="btn btn-info">
                      {t("user-mng.table.view")}
                    </button>
                    <button
                      className="btn btn-secondary mx-3"
                      onClick={() => props.handleSelectUser(user)}
                    >
                      {t("user-mng.table.update")}
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => props.handleDeleteUser(user)}
                    >
                      {t("user-mng.table.delete")}
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
      <ReactPaginate
        nextLabel={t("user-mng.table.next")}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel={t("user-mng.table.prev")}
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
        forcePage={currentPage - 1}
      />
    </>
  );
};
export default TableUserPaginate;
