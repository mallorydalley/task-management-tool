import React, {useState, useEffect} from "react";
import './Nav.scss'
import {withRouter, Link} from 'react-router-dom'
import axios from "axios";
import {connect} from 'react-redux'
import {getEmployee} from '../../redux/reducer'

function Nav(props) {
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('')
  const [showLogin, setShowLogin] = useState(false)
  const [showLogout, setShowLogout] = useState(false)

  const handleLogin = () => {
    axios.post(`/auth/login`, { email, password }).then((res) => {
      console.log(res.data)
      const { employee_id, first_name, last_name, profile_pic } = res.data
      props.getEmployee(employee_id, first_name, last_name, profile_pic )
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

  const checkSession = () => {
    if(props.first_name===''){
      axios.get(`/api/session`)
      .then(res => {
        const {employee_id, first_name, last_name, profile_pic} = res.data
        props.getEmployee(employee_id, first_name, last_name, profile_pic)
      })
      .catch(err => console.log(err))
      //.catch(err => alert('Please log in.))
    }
  }

  useEffect(() => {
    checkSession()
  }, []);
  
  const toggleLogin = () => {
    setShowLogin(!showLogin)
  }

  const toggleLogout = () => {
    setShowLogout(!showLogout)
  }
const pathname = props.location.pathname
  return (
    <div>
      {props.location.pathname === "/" ? (
        <div className="land-bar">
          <div className="land-contents">
            <span className="logo">TaskBox</span>

            {showLogin ? (
              <div>
                <input
                  className="land-input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <input
                  className="land-input"
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPass(e.target.value)}
                />
                <button className="nav-buttons" onClick={handleLogin}>
                  Send
                </button>
              </div>
            ) : (
              <button className="nav-buttons" onClick={toggleLogin}>
                Login
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="nav-bar">
          <Link to="/dashboard" style={{ textDecoration: "none" }}>
            <span className="logo">TaskBox</span>
          </Link>

          <div className="nav-right">
            <Link to="/add-task">
              <button className="nav-buttons">+Add Task</button>
            </Link>
            <button className="nav-buttons" onClick={handleLogout}>
              Logout
            </button>
            {/* <span>{props.first_name}</span>
            <span>{props.last_name}</span> */}
            {showLogout ? (
              <div onClick={toggleLogout} className="show-logout">
                <img
                  className="nav-profile-pic"
                  src={props.profile_pic}
                  alt=""
                />
                <div className="logout-dropdown">Logout
                  <ul>
                    <li onClick={handleLogout}>Logout</li>
                  </ul>
                </div>
              </div>
            ) : (
              <div onClick={toggleLogout} className="show-logout">
                <img
                  className="nav-profile-pic"
                  src={props.profile_pic}
                  alt=""
                />
              </div>
            )}
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
