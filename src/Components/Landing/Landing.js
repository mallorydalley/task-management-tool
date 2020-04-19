import React, {useState} from 'react';
import {connect} from 'react-redux';
import {updateEmail} from '../../redux/reducer'



function Landing(props) {
  
  const [email, setEmail] = useState('');
  console.log(email)
  console.log(props)
  return (
    <div className='page'>
      <input
        placeholder="Enter your work email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={() => {
        props.updateEmail(email)
        props.history.push("/auth")}}
      >
        Get Started
      </button>
    </div>
  );
  
}
const mapStateToProps = reduxState => {
  let {email} = reduxState;
  return {email}
}

export default connect(mapStateToProps, {updateEmail})(Landing);