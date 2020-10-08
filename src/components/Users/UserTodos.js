import React from "react";
import {useQuery} from "react-query";
import getData from "../../utils/api";

export default function UserTodos({id}) {
  const {data : todos} = useQuery(
    ["todos", id],
    () => getData(
      `http://localhost:3001/todos?userId=${id}`,
      1500
    ),
    {suspense: true}
  );

  return (
    <div className="user-todos">
      <h3>User Todos</h3>
      <ul>
        {todos.map(todo => <li key={todo.id}>{todo.todo}</li>)}
      </ul>
    </div>
  )
}