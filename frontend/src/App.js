import React from 'react';
import axios from 'axios';
import './App.css';
import UserList from './components/User.js'
import ProjectList from './components/Project.js'
import ProjectByUserList from "./components/ProjectByUser.js";
import ToDoList from "./components/ToDo.js";
import Menu from './components/Menu.js'
import Footer from './components/Footer.js'
import LoginForm from './components/Auth.js'
import ProjectForm from "./components/ProjectForm.js";
import ToDoForm from "./components/ToDoForm.js";
import SearchBar from "./components/SearchBar.js";
import {Route, Link, Switch, Redirect, HashRouter} from 'react-router-dom'
import Cookies from 'universal-cookie'
import './bootstrap/css/bootstrap.min.css'
import './bootstrap/css/sticky-footer-navbar.css'

const NotFound404 = ({location}) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'token': '',
            'term': '',
        }
    }

    is_auth() {
        return !!this.state.token
    }

    get_token_from_storage() {
        const cookie = new Cookies()
        this.setState({'token': cookie.get('token')}, this.get_data)
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json',
            'Accept': 'application/json; version=v2'
        }
        const cookie = new Cookies()
        headers['Authorization'] = 'Token ' + cookie.get('token')

        return headers;
    }

    get_data() {
        const headers = this.get_headers()

        axios.get('http://127.0.0.1:8000/api/users', {headers})
            .then(response => {
                const users = response.data.results
                this.setState({'users': users})
            }).catch(error => {
            this.setState({
                'users': []
            })
            console.log(error)
        })

        axios.get('http://127.0.0.1:8000/api/projects', {headers})
            .then(response => {
                const projects = response.data.results
                this.setState({'projects': projects})
            }).catch(error => {
            this.setState({
                'projects': []
            })
            console.log(error)
        })

        axios.get('http://127.0.0.1:8000/api/todos', {headers})
            .then(response => {
                const todos = response.data.results
                this.setState({'todos': todos})
            }).catch(error => {
            this.setState({
                'todos': []
            })
            console.log(error)
        })
    }

    get_token(login, password) {
        console.log(login, password);
        axios.post('http://127.0.0.1:8000/api-token-auth/',
            {
                "username": login,
                "password": password
            })
            .then(
                response => {
                    const cookie = new Cookies()
                    cookie.set('token', response.data.token)
                    this.setState({'token': response.data.token}, this.get_data)
                }
            ).catch(
            error => console.log(error)
        )
    }

    logout() {
        const cookie = new Cookies()
        cookie.set('token', '')
        this.setState({'token': ''}, this.get_data)
    }

    componentDidMount() {
        this.get_token_from_storage()
    }

    render() {
        return (
            <div>
                <Menu/>
                <HashRouter>
                    <header>
                        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                            <a className="navbar-brand" href="#">DRF</a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse"
                                    data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
                                    aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"/>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarCollapse">
                                <ul className="navbar-nav mr-auto">
                                    <li className="nav-item active">
                                        <Link className="nav-link" to='/'>Users</Link>
                                    </li>
                                    <li className="nav-item active">
                                        <Link className="nav-link" to='/projects'>Projects</Link>
                                    </li>
                                    <li className="nav-item active">
                                        <Link className="nav-link" to='/todos'>ToDos</Link>
                                    </li>
                                    <li className="nav-item active">
                                        {this.is_auth() ?
                                            <a className="nav-link" onClick={() => this.logout()}>Logout</a> :
                                            <Link className="nav-link" to='/login'>Login</Link>}
                                    </li>
                                </ul>
                            </div>
                            <div className="row">
                                <div className="col-sm-12">
                                    <SearchBar
                                        term={this.state.term}
                                        data={this.state.projects}
                                        update={this.updateData.bind(this)}
                                    />
                                </div>
                            </div>
                        </nav>
                    </header>
                    <Switch>
                        <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                        <Route exact path='/projects' component={() => <ProjectList
                            projects={this.state.projects}
                            todos={this.state.todos}
                            deleteProject={(id) => this.deleteProject(id)}/>}/>
                        <Route exact path='/projects/create' component={() => <ProjectForm
                            users={this.state.users}
                            createProject={(name, link, users) => this.createProject(name, link, users)}/>}/>
                        <Route exact path='/todos' component={() => <ToDoList
                            todos={this.state.todos}
                            deleteToDo={(todo) => this.deleteToDo(todo)}/>}/>
                        <Route exact path='/todos/create' component={() => <ToDoForm
                            users={this.state.users}
                            projects={this.state.projects}
                            createToDo={(text, project, user, is_active) => this.createToDo(text, project, user, is_active)}/>}/>
                        <Route exact path='/login' component={() => <LoginForm
                            get_token={(login, password) => this.get_token(login, password)}/>}/>
                        <Route path="/user/:id"><ProjectByUserList projects={this.state.projects}/></Route>
                        <Redirect from='/users' to='/'/>
                        <Route component={NotFound404}/>
                    </Switch>
                </HashRouter>
                <Footer/>
            </div>
        )
    }

    deleteProject(id) {
        const headers = this.get_headers()
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}/`, {headers})
            .then(response => {
                this.get_data()
            }).catch(error => console.log(error))
    }

    deleteToDo(todo) {
        const headers = this.get_headers()
        axios.put(`http://127.0.0.1:8000/api/todos/${todo.id}/`, todo, {headers})
            .then(response => {
                this.setState({'is_active': false}, this.get_data)
            }).catch(error => console.log(error))
    }

    createProject(name, link, users) {
        if (!name || !link || users.length === 0) {
            console.log("Empty params:", name, link, users)
            return;
        }

        const headers = this.get_headers()
        axios.post('http://127.0.0.1:8000/api/projects/',
            {
                'name': name,
                'link': link,
                'users': users
            }, {headers})
            .then(response => {
                this.get_data()
            })
            .catch(error => {
                console.log(error)
            })
    }

    createToDo(text, project, user) {
        if (!text || !project || !user) {
            console.log("Empty params:", text, project, user)
            return;
        }

        const headers = this.get_headers()
        axios.post('http://127.0.0.1:8000/api/todos/',
            {
                'text': text,
                'project': project,
                'user': user,
                'is_active': true,
            }, {headers})
            .then(response => {
                this.get_data()
            })
            .catch(error => {
                console.log(error)
            })
    }

    updateData(config) {
        this.setState({'projects': config.data, 'term': config.term});
    }
}

export default App;