import React, {useContext, useEffect, useState} from "react";
import {FaSpinner} from "react-icons/fa";

// import separate contexts for user and setUser
import UserContext, {UserSetContext} from "../../contexts/UserContext";

export default function UserPicker() {
  // get user and setUser from separate contexts
  const user = useContext(UserContext);
  const setUser = useContext(UserSetContext);

  const [users, setUsers] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then(resp => resp.json())
      .then(data => {
        setUsers(data);
        setUser(data[0]);
      });
  }, [setUser]);

  function handleSelect (e) {
    const selectedID = parseInt(e.target.value);
    const selectedUser = users.find(u => u.id === selectedID);
    setUser(selectedUser);
  }

  if (users === null) {
    return <FaSpinner className="icon-loading"/>
  }

  return (
    <select
      className="user-picker"
      onChange={handleSelect}
      value={user?.id}
    >
      {users.map(u => (
        <option key={u.id} value={u.id}>{u.name}</option>
      ))}
    </select>
  );
}