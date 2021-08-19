import React from 'react'
import {Link} from "react-router-dom";


const UserItem = ({user}) => {
   return (
       <tr>
           <td><Link to={`user/${user.id}`}>{user.username}</Link></td>
           <td>{user.first_name}</td>
           <td>{user.last_name}</td>
           <td>{user.email}</td>
           <td>{user.is_staff.toString()}</td>
           <td>{user.is_superuser.toString()}</td>
       </tr>
   )
}

const UserList = ({users}) => {
   return (
       <table>
           <th>User Name</th>
           <th>First name</th>
           <th>Last Name</th>
           <th>Email</th>
           <th>Staff</th>
           <th>SuperUser</th>
           {users.map((user) => <UserItem user={user} />)}
       </table>
   )
}

export default UserList