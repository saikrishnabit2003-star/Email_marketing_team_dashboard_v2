import React from 'react';
import Style from './Loginpage.module.css';

const Loginpage = () => {
  return (
    <div className={Style.loginPage}>
      <div className={Style.loginCard}>
        <h2>Login</h2>
        
        <form className={Style.form}>
          <div className={Style.inputGroup}>
            <label>Username</label>
            <input type="text" placeholder="Type your username" />
          </div>

          <div className={Style.inputGroup}>
            <label>Password</label>
            <input type="password" placeholder="Type your password" />
          </div>

          <button type="submit" className={Style.loginBtn}>LOGIN</button>
        </form>
      </div>
    </div>
  );
};

export default Loginpage;