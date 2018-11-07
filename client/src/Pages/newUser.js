import React, {
    Component
} from 'react';
import firebase from '../firebase.js';
import './styles.css';
import SafeNavBar from '../Components/NavBar/SafeNavBar';

class newUser extends Component {
    constructor(props) {
        super(props)
        this.handleChangeEmail = this.handleChangeEmail.bind(this)
        this.handleChangePassword = this.handleChangePassword.bind(this)
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChangeEmail(event) {
        this.setState({
            email: event.target.value
        })
    }

    handleChangePassword(event) {
        this.setState({
            password: event.target.value
        })
    }

    createUser = (e) => {
        e.preventDefault();
        console.log(this.state.email);
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
            console.log(error.code);
            console.log(error.message);
        })
    };

    render() {
        return (
            <div className="backgroundStyle">
                <SafeNavBar/>
                <h3> New Recipe </h3>
                <form id = "newUserForm" onSubmit = {this.createUser}>
                    <div>
                        <label>User Email</label><br/>
                        <input type="text" name="userEmailField" value={this.state.email} onChange={this.handleChangeEmail}/>
                    </div>
                    <div>
                        <label>Password</label> <br/>
                        <input type="text" name="userPasswordField" value={this.state.password} onChange={this.handleChangePassword}/>
                    </div>
                    <br/>
                        <button id="newUserButton" form="newUserForm" type="submit">Submit</button>
                    <br/>
                </form>
            </div>
        );
    }
}

export default newUser;