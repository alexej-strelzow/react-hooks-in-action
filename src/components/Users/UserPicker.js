import React, {useEffect} from "react";
import {useQuery} from "react-query"; // new import

import {useUser} from "../../contexts/UserContext";
import getData from "../../utils/api";  // new import

import Spinner from "../UI/Spinner";

export default function UserPicker() {
  const [user, setUser] = useUser();

  // switch to calling useQuery
  const {data: users = [], status} = useQuery(
    "users",
    () => getData("http://localhost:3001/users")
  );

  useEffect(() => {
    setUser(users[0]);
  }, [users, setUser]);

  function handleSelect(e) {
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