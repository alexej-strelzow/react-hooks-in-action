import React, {useState, unstable_useTransition, Suspense} from "react";
import UsersList from "./UsersList";
import {useUser} from "../../contexts/UserContext";
import PageSpinner from "../UI/PageSpinner";
import UserDetails from "./UserDetails";
import {queryCache} from "react-query";
import getData from "../../utils/api";

export default function UsersPage() {
  const [loggedInUser] = useUser();
  const [selectedUser, setSelectedUser] = useState(null);
  const user = selectedUser || loggedInUser;

  const [startTransition, isPending] = unstable_useTransition({
    timeoutMs: 3000
  });

  function switchUser(nextUser) {
    startTransition(() => setSelectedUser(nextUser));

    queryCache.prefetchQuery(
      ["user", nextUser.id],
      () => getData(`http://localhost:3001/users/${nextUser.id}`)
    );

    queryCache.prefetchQuery(
      `http://localhost:3001/img/${nextUser.img}`,
      () => new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = `http://localhost:3001/img/${nextUser.img}`;
      })
    );
  }

  return user ? (
    <main className="users-page">
      <UsersList user={user} setUser={switchUser}/>

      <Suspense fallback={<PageSpinner/>}>
        <UserDetails userID={user.id} isPending={isPending}/>
      </Suspense>
    </main>
  ) : <PageSpinner/>;
}