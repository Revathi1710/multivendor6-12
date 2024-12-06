import React, { Component } from 'react';
import backgroundImagelogin from '../icons/login600ban.png';
import Navbar from '../components/navbar';
import { Link } from 'react-router-dom';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: null,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    const { email, password } = this.state;

    // Basic validation
    if (!email || !password) {
      this.setState({ error: 'Please enter both email and password.' });
      return;
    }

    fetch(`${process.env.REACT_APP_API_URL}/Vendorlogin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        if (data.status === "ok") {
          const { vendortoken, vendorId } = data.data;
          alert("Login successful");
          window.localStorage.setItem("vendortoken", vendortoken);
          window.localStorage.setItem("vendorId", vendorId);
          window.localStorage.setItem("loggedIn", true);
          window.location.href = "./VendorSelectPlan";
        } else {
          this.setState({ error: 'Login failed. Please check your credentials.' });
        }
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation:', error);
        this.setState({ error: 'An error occurred. Please try again later.' });
      });
  }

  render() {
    return (
      <div className='toppage2'>
          <Navbar />
        <div className='backgroundLogin'>
        <div className="container">
        <div className='formbox'>
        <div className="imagesignup col-sm-6">
                <img src={backgroundImagelogin} className="leftImagesignup" />
              </div>
             <div className="form-container loginform col-sm-4">
             

 
        
              <h3 className="login-title text-center mt-2 mb-5">Login</h3>
              {this.state.error && <div className="alert alert-danger">{this.state.error}</div>}
              <form onSubmit={this.handleSubmit}>
               
                  <div className="mb-3 input-group">
                     <span className="input-group-text">
                     <i className="fa fa-user"></i> {/* Replace with your preferred icon */}
                     </span>
                    <input
                    type="email"
                    className="form-control signupinput"
                    placeholder="Enter email"
                    value={this.state.email}
                    onChange={(e) => this.setState({ email: e.target.value })}
                    required
                   />
                 </div>
                 <div className="mb-3 input-group">
                  <span className="input-group-text">
                   <i className="fa fa-lock"></i> {/* Replace with your preferred icon */}
                  </span>
                      <input
                    type="password"
                    className="form-control signupinput"
                    placeholder="Enter password"
                    value={this.state.password}
                    onChange={(e) => this.setState({ password: e.target.value })}
                    required
                  />
                 </div>
                 <div class="text-end mt-2 mb-3">
                 <Link to="/forgotpassword">Forgot Password?</Link>
                 </div>
                 

           <div className="d-grid mt-3">
                <button type="submit" className="btn btn-3d" name="login">Login</button>
                </div>

              </form>
              <p className="forgot-password text-right mt-2 mb-2">
    Don't have account?<Link to="/vendor/Signup">Create Account</Link>
  </p> 
            </div>
           
          </div>
        </div>
      </div></div>
    );
  }
}
