import React, {useEffect} from "react";
import {useUser} from "../../contexts/UserContext";
import Spinner from "../UI/Spinner";

import useFetch from "../../utils/useFetch";

export default function UserPicker() {
  const [user, setUser] = useUser();

  const {data: users = [], status} = useFetch(
    "http://localhost:3001/users"
  );

  useEffect(() => {
    setUser(users[0]);
  }, [users, setUser]);

  function handleSelect (e) {
    const selectedID = parseInt(e.target.value);
    const selectedUser = users.find(u => u.id === selectedID);
    setUser(selectedUser);
  }

  if (status !== "success") {
    return <Spinner/>
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