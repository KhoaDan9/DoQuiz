import ReactPaginate from "react-paginate";
import { useTranslation } from "react-i18next";

const CardUserPaginate = (props) => {
  const { listUsers, pageCount, currentPage, setCurrentPage } = props;
  const { t } = useTranslation();

  const handlePageClick = (event) => {
    setCurrentPage(event.selected + 1);
  };

  return (
    <>
      <div className="card-manage-user">
        {listUsers &&
          listUsers.length > 0 &&
          listUsers.map((user, index) => {
            return (
              <div
                key={`${index}-quiz`}
                className="card"
                style={{ width: "18rem" }}
              >
                <div className="div-img">
                  {user.image ? (
                    <img src={`data:image/jpeg;base64,${user.image}`} />
                  ) : (
                    <span>{t("user-mng.table.no-img")}</span>
                  )}
                </div>

                <div className="card-body">
                  <div className="div-card">
                    <table>
                      <tbody>
                        <tr>
                          <td className="user-col-width">Username</td>
                          <td>{user.username}</td>
                        </tr>
                        <tr>
                          <td className="user-col-width">Email</td>
                          <td>{user.email}</td>
                        </tr>
                        <tr>
                          <td className="user-col-width">Role</td>
                          <td>{user.role}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="btn-card">
                    <button
                      className="btn btn-secondary"
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
                  </div>
                </div>
              </div>
            );
          })}
      </div>

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
export default CardUserPaginate;
