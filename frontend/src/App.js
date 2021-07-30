import React from 'react';
import axios from 'axios';
import './App.css';
import UserList from './components/User.js'
import ProjectList from './components/Project.js'
import ProjectByUserList from "./components/ProjectByUser.js";
import ToDoList from "./components/ToDo.js";
import Menu from './components/Menu.js'
import Footer from './components/Footer.js'
import {Route, Link, Switch, Redirect, HashRouter} from 'react-router-dom'

const NotFound404 = ({location}) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}

class App extends React.Component {
    projects;
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': []
        }
    }

    componentDidMount() {
        axios.get('http://127.0.0.1:8000/api/users')
            .then(response => {
                const users = response.data.results
                this.setState({ 'users': users })
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/projects')
            .then(response => {
                const projects = response.data.results
                this.setState({ 'projects': projects })
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/todos')
            .then(response => {
                const todos = response.data.results
                this.setState({ 'todos': todos })
            }).catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <Menu/>
                <HashRouter>
                    <nav>
                        <ul>
                            <li>
                                <Link to='/'>Users</Link>
                            </li>
                            <li>
                                <Link to='/projects'>Projects</Link>
                            </li>
                            <li>
                                <Link to='/todos'>ToDos</Link>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                        <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}/>}/>
                        <Route exact path='/todos' component={() => <ToDoList todos={this.state.todos}/>}/>
                        <Route path="/user/:id"><ProjectByUserList projects={this.state.projects}/></Route>
                        <Redirect from='/users' to='/'/>
                        <Route component={NotFound404}/>
                    </Switch>
                </HashRouter>
                <Footer/>
            </div>
        )
    }
}

export default App;