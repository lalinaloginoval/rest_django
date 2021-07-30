import React from 'react'
import { useParams } from 'react-router-dom'

const ProjectItem = ({project}) => {
   return (
       <tr>
           <td>{project.name}</td>
           <td>{project.link}</td>
           <td>{project.users}</td>
       </tr>
   )
}

const ProjectByUserList = ({projects}) => {
    let { id } = useParams();
    let filtered_projects = projects.filter((p) => p.users.includes(parseInt(id)))

   return (
       <table>
           <th>Name</th>
           <th>Link</th>
           <th>Users</th>
           {filtered_projects.map((project) => <ProjectItem project={project} />)}
       </table>
   )
}

export default ProjectByUserList