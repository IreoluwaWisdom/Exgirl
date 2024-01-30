import React from 'react';
import {Link} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import SignUpButton from '../Buttons/SignUpButton';
import SignInButton from '../Buttons/SignInButton';

import UserDetails from '../comp/UserDetails';
import QuantitySelector from '../comp/QuantitySelector';

const Showed = () => {
  const { currentUser, signOut } = useAuth();

 
  return (
    <div style ={{textAlign: 'center', marginBottom:'3vh'}}>
      
    
          <h5 style={{color:'#6A0DAD'}}>YOU ARE USING GUEST MODE</h5>
                            <div style={{marginLeft:'10vw', display: 'flex', textAlign:'center' }}>
  <SignUpButton />
  <span style={{ color: '#6A0DAD', margin: '0 10px' }}>&nbsp;OR&nbsp;</span>
  <SignInButton />
</div>

      
        
    </div>
  );
};

export default Showed;