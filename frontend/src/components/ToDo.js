import React from 'react'


const ToDoItem = ({todo, deleteToDo}) => {
   return (
       <tr>
           <td>{todo.text}</td>
           <td>{todo.project}</td>
           <td>{todo.created}</td>
           <td>{todo.updated}</td>
           <td>{todo.user}</td>
           <td>{todo.is_active}</td>
           <button onClick={()=>deleteToDo(todo)} type='button'>Delete</button>
       </tr>
   )
}

const ToDoList = ({todos, deleteToDo}) => {
   return (
       <table>
           <th>Text</th>
           <th>Project</th>
           <th>Created</th>
           <th>Updated</th>
           <th>User</th>
           <th>Active</th>
           <th/>
           {todos.map((todo) => <ToDoItem todo={todo} deleteToDo={deleteToDo}/>)}
       </table>
   )
}

export default ToDoList