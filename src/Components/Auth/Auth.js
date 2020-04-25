import React, {useState} from 'react';
import './Auth.scss'
import axios from 'axios';
import {connect} from 'react-redux'
import {getEmployee} from '../../redux/reducer'

function Auth(props) {
    const [profile_pic, setProfilePic] = useState(''),
          [first_name, setFirstName] = useState(''),
          [last_name, setLastName] = useState(''),
          [password, setPass] = useState('');
    
    const handleRegister = () => {
        axios.post(`/auth/register`, {email: props.email, password, first_name, last_name, profile_pic})
        .then(res => {
            console.log(res.data)
          const { employee_id, first_name, last_name, profile_pic } = res.data
          props.getEmployee(employee_id, first_name, last_name, profile_pic)
            props.history.push('/dashboard')

            return axios.post(`/api/email`, {email:props.email})
        })
        .then(res => {
          props.history.push('/dashboard')
        })
        .catch(err => console.log(err))
    }

    // const welcomeEmail = () => {
    //   axios.post(`/api/email`, {email:props.email})
    //   .then(res => {
    //     props.history.push("/dashboard");
    //   })
    //   .catch(err => console.log(err))
    // }
    
    
    console.log(props)
    return (
      <div>
        <div className="nav-bar">
          <span className="logo">TaskBox</span>
        </div>
        <div className="auth">
          <div className="auth-form">
            <img className="auth-img" src={profile_pic} alt="" />
            <input
              className="auth-input"
              placeholder="Add your picture"
              value={profile_pic}
              name="profile_pic"
              onChange={(e) => setProfilePic(e.target.value)}
            />
            <input
              className="auth-input"
              placeholder="First Name"
              value={first_name}
              name="first_name"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              className="auth-input"
              placeholder="Last Name"
              value={last_name}
              name="last_name"
              onChange={(e) => setLastName(e.target.value)}
            />
            <br />
            <input
              className="auth-input"
              placeholder="Password"
              value={password}
              name="password"
              type="password"
              onChange={(e) => setPass(e.target.value)}
            />
            <button
              className="auth-button"
              onClick={handleRegister}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
    
}

const mapStateToProps = (reduxState) => {
  let { email } = reduxState;
  return { email };
};

export default connect(mapStateToProps, {getEmployee})(Auth);
