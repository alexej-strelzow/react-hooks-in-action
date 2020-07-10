import React, {useState, useEffect, Fragment, useContext} from 'react';
import {FaSpinner} from "react-icons/fa";
import getData from "../../utils/api";
import UserContext from "../../contexts/UserContext";

export default function UsersList () {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [users, setUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // destructure user from context
  const {user : loggedInUser} = useContext(UserContext);
  const user = selectedUser || loggedInUser;

  useEffect(() => {
    getData("http://localhost:3001/users")
      .then(data => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  if (error) {
    return <p>{error.message}</p>
  }

  if (isLoading) {
    return <p>
      <FaSpinner className="icon-loading"/>{" "}
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