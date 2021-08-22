import React from 'react'


class ToDoForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'text': '',
            'project': 0,
            'user': 0,
            'is_active': true
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name] : event.target.value
        })
    }

    handleSubmit(event) {
        this.props.createToDo(this.state.text, this.state.project, this.state.user, this.state.is_active);
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={(event)=> this.handleSubmit(event)}>
                <input type="text" name="text" placeholder="text" value={this.state.name} onChange={(event)=>this.handleChange(event)} />
                <select name="project" onChange={(event) => this.handleChange(event)}>
                        {this.props.projects.map((project) => <option value={project.id}>{project.name}</option>)}
                </select>
                <select name="user" onChange={(event) => this.handleChange(event)}>
                        {this.props.users.map((user) => <option value={user.id}>{user.first_name} {user.last_name}</option>)}
                </select>
                <input type="submit" value="Create" />
            </form>
        )
    }
}

export default ToDoForm