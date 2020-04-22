import React, {useState} from 'react';
import {connect} from 'react-redux';
import {updateEmail} from '../../redux/reducer'
import './Landing.scss'



function Landing(props) { 
  const [email, setEmail] = useState('');
  console.log(email)
  console.log(props)
  return (
    <div className='page'>
      <div className='container'>
      <span className='heading'>
        Collaborate with your team
        <br />
         from anywhere in the world
      </span>
      
      <div>
        <input
          className='email-input'
          placeholder="Enter your work email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button 
          className='get-started-button'
          onClick={() => {
          props.updateEmail(email)
          props.history.push("/auth")}}
        >
          Get Started
        </button>
      </div>
      </div>
    </div>
  );
  
}
const mapStateToProps = reduxState => {
  let {email} = reduxState;
  return {email}
}

export default connect(mapStateToProps, {updateEmail})(Landing);