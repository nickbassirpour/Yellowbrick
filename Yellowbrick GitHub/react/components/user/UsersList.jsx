import React, { useState, useEffect } from "react";
import "rc-pagination/assets/index.css";
import locale from "rc-pagination/lib/locale/en_US";
import debug from "sabio-debug";
import userService from "services/userService";
import MappedUsers from "./MappedUsers";
import Pagination from "rc-pagination";
import { Formik, Form, Field } from "formik";
import "../clients/clientlist.css";
import Select from "react-select";
import lookUp from "services/lookUpService";

function UsersList() {
  const [users, setUsers] = useState({
    userList: [],
    userRows: [],
    searchedUsers: [],
    filteredUsers: [],
    roleOptions: [],
    roleIdSelected: 0,
    pageSize: 10,
    totalCount: 0,
    totalSearchCount: 0,
    totalFilterCount: 0,
    currentPage: 1,
    searchInput: "",
    dependencyCount: 0,
    isUserFound: true,
    isSearching: false,
    isFilterActive: false,
    isFilterRendered: false,
  });
  const _logger = debug.extend("UserList");

  useEffect(() => {
    if (users.dependencyCount > 0) {
      userService
        .getAllByRole(
          users.roleIdSelected,
          users.currentPage - 1,
          users.pageSize
        )
        .then(onGetAllByRoleSuccess)
        .catch(onGetAllByRoleError);
    } else if (users.searchInput !== "") {
      userService
        .searchPaginate(
          users.currentPage - 1,
          users.pageSize,
          users.searchInput
        )
        .then(onSearchSuccess)
        .catch(onSearchError);
    } else {
      userService
        .getAllPaginated(users.currentPage - 1, users.pageSize)
        .then(onSelectAllSuccess)
        .catch(onSelectAllError);
    }
  }, [users.currentPage, users.searchInput, users.dependencyCount]);

  const onSelectAllSuccess = (response) => {
    _logger("selectAll running", response);
    setUsers((prevState) => {
      const uList = { ...prevState };
      uList.userList = response.item.pagedItems;
      uList.userRows = response.item.pagedItems.map(userMap);
      uList.totalCount = response.item.totalCount;

      return uList;
    });
  };
  const onSelectAllError = (err) => {
    _logger("selectAll Failed:", err);
  };
  const onSearchClick = (value) => {
    if (value.query !== "") {
      setUsers((prevState) => {
        const setQuery = { ...prevState };
        setQuery.searchInput = value.query;
        setQuery.currentPage = 1;

        return setQuery;
      });
    }
  };
  const onSearchSuccess = (response) => {
    setUsers((prevState) => {
      const searchData = { ...prevState };
      searchData.searchedUsers = response.item.pagedItems.map(userMap);
      searchData.totalSearchCount = response.item.totalCount;
      searchData.isSearching = true;
      searchData.isUserFound = true;

      return searchData;
    });
  };
  const onSearchError = (err) => {
    _logger("Search Failed:", err);
    setUsers((prevState) => {
      const setToggle = { ...prevState };
      setToggle.isUserFound = false;

      return setToggle;
    });
  };
  const userMap = (aUser) => {
    return (
      <MappedUsers
        useDefaultAvatar={useAvatarDefault}
        user={aUser}
        key={aUser.id}
      />
    );
  };

  const useAvatarDefault = (e) => {
    e.target.src =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRY5GfGomQwUzWsCqesYfd0TNe6MAg0cnsfiQ&usqp=CAU";
  };

  const onPageChange = (page) => {
    setUsers((prevState) => {
      const newPage = { ...prevState };
      newPage.currentPage = page;
      return newPage;
    });
  };
  const onShowAllClick = (values) => {
    if (values.query) {
      values.query = "";
    }

    setUsers((prevState) => {
      const toggle = { ...prevState };
      toggle.isSearching = false;
      toggle.isFilterActive = false;
      toggle.isFilterRendered = false;
      toggle.isUserFound = true;
      toggle.dependencyCount = 0;
      toggle.searchInput = "";
      toggle.currentPage = 1;

      return toggle;
    });
  };

  const onFilterClick = () => {
    if (!users.isFilterRendered) {
      lookUp.lookUp(["Roles"]).then(onGetLookUpSuccess).catch(onGetLookUpError);
    } else {
      onShowAllClick("filterOff");
    }
  };

  const onGetLookUpSuccess = (response) => {
    setUsers((prevState) => {
      const setRoles = { ...prevState };
      setRoles.roleOptions = response.item.roles.map(roleMap);
      setRoles.isFilterActive = !setRoles.isFilterActive;
      setRoles.isUserFound = true;
      return setRoles;
    });
  };

  const roleMap = (role) => {
    return {
      label: role.name,
      value: role.id,
    };
  };

  const onGetLookUpError = (err) => {
    _logger("getLookUp Failed:", err);
  };

  const handleSelectChange = (e) => {
    if (e === null) {
      setUsers((prevState) => {
        const setRole = { ...prevState };
        setRole.roleIdSelected = 0;
        setRole.isUserFound = true;

        return setRole;
      });
    } else
      setUsers((prevState) => {
        const setRole = { ...prevState };
        setRole.roleIdSelected = e.value;

        return setRole;
      });
  };

  const onFilterSubmit = () => {
    if (users.roleIdSelected !== 0) {
      setUsers((prevState) => {
        const runGet = { ...prevState };
        runGet.dependencyCount = ++runGet.dependencyCount;
        runGet.currentPage = 1;

        return runGet;
      });
    }
  };

  const onGetAllByRoleSuccess = (response) => {
    setUsers((prevState) => {
      const filter = { ...prevState };
      filter.filteredUsers = response.item.pagedItems.map(userMap);
      filter.totalFilterCount = response.item.totalCount;
      filter.isFilterRendered = true;
      filter.isUserFound = true;

      return filter;
    });
  };

  const onGetAllByRoleError = (err) => {
    _logger("getAllByRole Failed:", err);
    setClients((prevState) => {
      const setToggle = { ...prevState };
      setToggle.isUserFound = false;
      setToggle.dependencyCount = 0;

      return setToggle;
    });
  };

  return (
    <div className="row">
      <div className="col-lg-12 col-md-12 col-sm-12">
        <div className="border-bottom mb-4 d-md-flex align-items-center justify-content-between">
          <div className="mb-3 mb-md-0">
            <h1 className="mb-1 h2 fw-bold">User List</h1>
            <a className="active maintain-cursor" onClick={onFilterClick}>
              Filter By Role
            </a>
          </div>
          {users.isFilterActive ? (
            <div>
              <div className="d-flex align-items-center pt-4">
                <Select
                  className="basic-single me-2"
                  classNamePrefix="select"
                  placeholder="Select A Role..."
                  isSearchable={true}
                  isClearable={true}
                  name="roleSelect"
                  options={users.roleOptions}
                  onChange={handleSelectChange}
                  styles={{
                    input: (provided) => ({
                      ...provided,
                      height: "38px",
                      width: "195px",
                    }),
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderColor: state.isFocused ? "#FCC534" : "#e8e7ed",
                      boxShadow: state.isFocused
                        ? "0px 0px 0px 3px #eae7fc"
                        : 0,
                      "&:hover": {
                        borderColor: state.isFocused ? "#FCC534" : 0,
                      },
                    }),
                    placeholder: (provided) => ({
                      ...provided,
                      color: "#b1adc0",
                      marginLeft: "12px",
                      fontSize: "0.875rem",
                    }),
                  }}
                />
                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={onFilterSubmit}
                >
                  Filter
                </button>
                {users.isFilterRendered && (
                  <button
                    type="reset"
                    className="btn btn-primary ms-2"
                    onClick={() => onShowAllClick("filter")}
                  >
                    Show All
                  </button>
                )}
              </div>
              {users.isUserFound ? (
                <h6>&nbsp;</h6>
              ) : (
                <h6 className="ms-1 text-danger">No User Assigned This Role</h6>
              )}
            </div>
          ) : (
            <div>
              <Formik
                enableReinitialize={true}
                initialValues={{ query: "" }}
                onSubmit={onSearchClick}
              >
                {({ values }) => (
                  <Form>
                    <div className="mb-lg-0 pt-4 col-lg-12 col-md-12 col-sm-12 d-flex">
                      <div className="d-flex align-items-center">
                        <Field
                          type="text"
                          name="query"
                          className="form-control me-2"
                          placeholder="Search User List"
                        />
                        <button type="submit" className="btn btn-primary">
                          Search
                        </button>
                      </div>
                      {users.isSearching && (
                        <button
                          type="reset"
                          className="btn btn-primary ms-2"
                          onClick={() => onShowAllClick(values)}
                        >
                          Show All
                        </button>
                      )}
                    </div>
                  </Form>
                )}
              </Formik>
              {users.isUserFound ? (
                <h6>&nbsp;</h6>
              ) : (
                <h6 className="ms-1 text-danger">User Not Found</h6>
              )}
            </div>
          )}
        </div>
        <div className="card bg-white">
          <div className="p-0 card-body ">
            <div className=" overflow-hidden"></div>
            <div className="table-responsive ">
              <table
                role="table"
                className="text-nowrap table text-center align-middle table-light"
              >
                <thead className="table-light">
                  <tr role="row">
                    <th colSpan={1} role="columnheader">
                      ID
                    </th>
                    <th colSpan={1} role="columnheader" className="col-3">
                      NAME
                    </th>
                    <th colSpan={1} role="columnheader" className="col-3">
                      ROLE
                    </th>
                    <th colSpan={1} role="columnheader">
                      EMAIL
                    </th>
                    <th colSpan={1} role="columnheader">
                      STATUS
                    </th>
                  </tr>
                </thead>
                <tbody role="rowgroup">
                  {users.isFilterRendered
                    ? users.filteredUsers
                    : users.isSearching
                    ? users.searchedUsers
                    : users.userRows}
                </tbody>
              </table>
            </div>
            <div className="pb-3 active-page inactive-page carat-style hover-color ">
              <Pagination
                onChange={onPageChange}
                current={users.currentPage}
                total={
                  users.isFilterRendered
                    ? users.totalFilterCount
                    : users.isSearching
                    ? users.totalSearchCount
                    : users.totalCount
                }
                pageSize={users.pageSize}
                locale={locale}
                className="text-center"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersList;
