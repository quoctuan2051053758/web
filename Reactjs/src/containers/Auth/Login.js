import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions"
import './Login.scss';
import {handleLoginApi} from '../../services/userService'
import { FormattedMessage } from 'react-intl';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state={
            username:'',
            password:'',
            isShowPassword:false,
            errMessage:''
        }
    }

    handleOnChangeInput=(event)=>{
        this.setState({
            username:event.target.value
        })
       
    }
    handleOnChangePassword=(event)=>{
        this.setState({
            password:event.target.value
        })
    }
    handleLogin=async()=>{
        //console.log('user name:',this.state.username,' Password: ',this.state.password)
        //console.log('All state' , this.state)
        this.setState({
            errMessage:''
        })
        try{
            let data=await handleLoginApi(this.state.username,this.state.password)
            if(data&&data.errCode !== 0){
                this.setState({
                    errMessage:data.message
                })
            }
            if(data && data.errCode ===0){
                this.props.userLoginSuccess(data.user)
                console.log("login succeeds")
            }
        
        }catch(error){
            if(error.response){
                if(error.response.data){
                    this.setState({
                    errMessage:error.response.data.message
                })
                }
            }
            console.log(error)
            // this.setState({
            //     errMessage:e.message
            // })
        }
        
    }
    handleShowHidePassword=()=>{
        this.setState({
            isShowPassword:!this.state.isShowPassword
        })
    }
    render() {
        return (
            
                
           <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content row'>
                        <div className='col-12 text-login'>Login</div>
                        <div className='col-12 form-group login-input'>
                            <label>Username</label>
                            <input type='text' placeholder='Enter your username' className='form-control'
                            value={this.state.username}
                            onChange={(event)=>this.handleOnChangeInput(event)}
                            />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password</label>
                            <div className='custom-input-password'>
                                <input type={this.state.isShowPassword?'text':'password'} className='form-control' 
                                placeholder='Enter your Password'
                                onChange={(event)=>this.handleOnChangePassword(event)}
                                />
                                <span onClick={()=>this.handleShowHidePassword()}>
                                <i class={this.state.isShowPassword?'fas fa-eye':'fas fa-eye-slash'}></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12'style={{color:'red'}}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12'>
                            <button className='btn-login'onClick={()=>this.handleLogin()}>Login</button>
                        </div>
                        <div className='col-12'>
                            <span>Fogot your password</span>
                        </div>
                        <div className='col-12 text-login'>Or Login with</div>
                    </div>
                    
                </div>
           </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        //userLoginFail: () => dispatch(actions.adminLoginFail()),
        userLoginSuccess:(userInFor)=>dispatch(actions.userLoginSuccess(userInFor))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
