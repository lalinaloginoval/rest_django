import React from 'react'

const ProjectItem = ({project, deleteProject}) => {
   return (
       <tr>
           <td>{project.name}</td>
           <td>{project.link}</td>
           <td>{project.users}</td>
           <button onClick={()=>deleteProject(project.id)} type='button'>Delete</button>
       </tr>
   )
}

const ProjectList = ({projects, deleteProject}) => {
   return (
       <table>
           <th>Name</th>
           <th>Link</th>
           <th>Users</th>
           <th/>
           {projects.map((project) => <ProjectItem project={project} deleteProject={deleteProject}/>)}
       </table>
   )
}

export default ProjectList