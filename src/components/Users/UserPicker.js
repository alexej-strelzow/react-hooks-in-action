import React, {useEffect} from "react";
import {useQuery} from "react-query";

import {useUser} from "../../contexts/UserContext";
import getData from "../../utils/api";

export default function UserPicker() {
  const [user, setUser] = useUser();

  const {data: users = []} = useQuery(
    "users",
    () => getData("http://localhost:3001/users"),
    {
      suspense: true
    }
  );

  useEffect(() => {
    setUser(users[0]);
  }, [users, setUser]);

  function handleSelect(e) {
    const selectedID = parseInt(e.target.value);
    const selectedUser = users.find(u => u.id === selectedID);
    setUser(selectedUser);
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