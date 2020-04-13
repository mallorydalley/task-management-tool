import React, {useState, useEffect} from "react";
import './Nav.css'
import {withRouter, Link} from 'react-router-dom'
import axios from "axios";
import {connect} from 'react-redux'
import {getEmployee} from '../../redux/reducer'



function Nav(props) {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('')
  console.log(props)

  const getMe = () => {
    axios
      .get(`/api/auth/me`)
      .then((res) => {
        console.log(res.data);
        const {first_name, last_name, profile_pic} = res.data[0]
        props.getEmployee(first_name, last_name, profile_pic);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    console.log("useEffect firing")
    getMe()
  }, []);

  const handleLogin = () => {
    axios.post(`/auth/login`, { email, password }).then((res) => {
      console.log(res.data)
      const { first_name, last_name, profile_pic } = res.data
      props.getEmployee(first_name, last_name, profile_pic )
      props.history.push("/dashboard");
    });
  };

  const handleLogout = () => {
    axios.post(`/auth/logout`)
    .then(() => {
      props.history.push('/')
    })
    .catch(err => console.log(err))
  };


  return (
    <div>
      {props.location.pathname === "/" ? (
        <div className="nav-bar">
          <span>Logo</span>
          <input
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPass(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div className="nav-bar">
          <Link to='/dashboard'>
            <span>Logo</span>
          </Link>
          <div>
            <Link to="/add-task">
              <button>Add Task</button>
            </Link>
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div className="profile-info">
            <span>{props.first_name}</span>
            <span>{props.last_name}</span>
            <img
              className="nav-profile-pic"
              src={props.profile_pic}
              alt={props.first_name}
            />
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = reduxState => {
  const {first_name, last_name, profile_pic} = reduxState
  return { first_name, last_name, profile_pic };
}

export default withRouter(connect(mapStateToProps, {getEmployee})(Nav));
