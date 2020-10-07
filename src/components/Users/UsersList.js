import React, {unstable_useTransition} from 'react';
import {useQuery} from "react-query";
import getData from "../../utils/api";
import Spinner from "../UI/Spinner";

export default function UsersList ({user, setUser}) {
  const {data: users} = useQuery(
    "users",
    () => getData("http://localhost:3001/users"),
    {suspense: true}
  );

  return (
    <ul className="users items-list-nav">
      {users.map(u => (
        <li
          key={u.title}
          className={u.id === user?.id ? "selected" : null}
        >
          <ButtonPending
            className="btn"
            onClick={() => setUser(u)}
          >
            {u.name}
          </ButtonPending>
        </li>
      ))}
    </ul>
  );
}

function ButtonPending ({children, onClick, ...props}) {
  const [startTransition, isPending] = unstable_useTransition({timeoutMs: 3000});

  function handleClick () {
    startTransition(onClick);
  }

  return (
    <button
      onClick={handleClick}
      {...props}
    >
      {isPending && <Spinner/>}
      {children}
      {isPending && <Spinner/>}
    </button>
  );
}