import React, {useState, Fragment} from 'react';
import {useQuery} from "react-query"; // new import

import {useUser} from "../../contexts/UserContext";
import getData from "../../utils/api";  // new import

import Spinner from "../UI/Spinner";

export default function UsersList () {
  const [loggedInUser] = useUser();

  // switch to calling useQuery
  const {data: users = [], status, error} = useQuery(
    "users",
    () => getData("http://localhost:3001/users")
  );

  const [selectedUser, setSelectedUser] = useState(null);
  const user = selectedUser || loggedInUser;

  if (status === "error") {
    return <p>{error.message}</p>
  }

  if (status === "loading") {
    return <p>
      <Spinner/>{" "}
      Loading users...
    </p>
  }

  return (
    <Fragment>
      <ul className="users items-list-nav">
        {users.map(u => (
          <li
            key={u.title}
            className={u.id === user?.id ? "selected" : null}
          >
            <button
              className="btn"
              onClick={() => {
                setSelectedUser(u);
              }}
            >
              {u.name}
            </button>
          </li>
        ))}
      </ul>

      {user && (
        <div className="item user">
          <div className="item-header">
            <h2>{user.name}</h2>
          </div>
          <div className="user-details">
            <h3>{user.title}</h3>
            <p>{user.notes}</p>
          </div>
        </div>
      )}
    </Fragment>
  );
}