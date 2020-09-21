import React, {useState, Fragment} from 'react';
import Spinner from "../UI/Spinner";
import {useUser} from "../../contexts/UserContext";

import useFetch from "../../utils/useFetch";

export default function UsersList () {
  const [selectedUser, setSelectedUser] = useState(null);

  const [loggedInUser] = useUser();
  const user = selectedUser || loggedInUser;

  const {data : users = [], status, error} = useFetch(
    "http://localhost:3001/users"
  );

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