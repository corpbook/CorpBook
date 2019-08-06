import React, { Component } from 'react';
import Login from './components/Login.js';
import CreateProfile from './components/CreateProfile.js'
import HomePage from './components/HomePage'
import Cookies from 'js-cookie';
import 'tachyons';
let profileData;
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login:true,
            createProfile:false,
            homePage:false,
            cookies: Cookies.get('access_token')
        };
        this.loggedInFunction = this.loggedInFunction.bind(this);
        this.createProfleFunction = this.createProfleFunction.bind(this);
    
    };
   
//logic for conditional rendering
    loggedInFunction(){ //Dont render the login page go to profile
        this.setState({login:false, createProfile:true})
    }
    createProfleFunction(){
        this.setState({createProfile:false, homePage:true})
    }



    render() { 
        //login if cookies exist
        //if cookies exist go into CreateProfile
   
        if(this.state.login){          
            if(this.state.cookies){
                this.loggedInFunction();
                return (
                    <div className="App bg-light-yellow">
                        <CreateProfile createProfleFunction = {this.createProfleFunction}/>
                    </div>
                )
            }

        else{
            return (
                <div className="App bg-light-yellow">
                    <Login loggedInFunction = {this.loggedInFunction}/>
                </div>
            )
        }
        }

        if(this.state.createProfile){
            return (
                <div className="App bg-light-yellow">
                    <CreateProfile createProfleFunction = {this.createProfleFunction}/>
                </div>
            )
        }

        if(this.state.homePage){
            return (
                <div className="App bg-light-yellow">
                    <HomePage/>
                </div>
            )
        }

        /*Working on only */
        // return(
        //     <div className="App bg-light-yellow">
        //         <HomePage/>
        //     </div>
        // )
    }
}

export default App;