import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      const response = await axios.post("http://localhost/todo_app/api/register.php", user);
      if (response.data.status === "success") {
        navigate("/login");
      } else {
        setError(response.data.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setError(error.response?.data?.message || "Registration failed. Server error or network issue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="floating-shapes">
        <div className="shape shape1"></div>
        <div className="shape shape2"></div>
        <div className="shape shape3"></div>
        <div className="shape shape4"></div>
      </div>
      
      <div className="register-container">
        <div className="logo-container">
          <div className="logo">
            <svg viewBox="0 0 24 24" width="40" height="40" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="8.5" cy="7" r="4"></circle>
              <line x1="20" y1="8" x2="20" y2="14"></line>
              <line x1="23" y1="11" x2="17" y2="11"></line>
            </svg>
          </div>
        </div>
        
        <h2>Create Account</h2>
        <p className="subtitle">Join us today and get organized</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input 
              id="username"
              type="text" 
              name="username" 
              placeholder="Choose a username" 
              value={user.username}
              onChange={handleChange} 
              required 
              disabled={loading}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input 
              id="email"
              type="email" 
              name="email" 
              placeholder="Enter your email" 
              value={user.email}
              onChange={handleChange} 
              required 
              disabled={loading}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              id="password"
              type="password" 
              name="password" 
              placeholder="Create a password" 
              value={user.password}
              onChange={handleChange} 
              required 
              disabled={loading}
            />
            <small className="password-hint">Use at least 8 characters with letters and numbers</small>
          </div>
          
          <div className="terms">
            <label className="checkbox-label">
              <input type="checkbox" required />
              <span className="checkmark"></span>
              <span>I agree to the <a href="#" className="terms-link">Terms of Service</a> and <a href="#" className="terms-link">Privacy Policy</a></span>
            </label>
          </div>
          
          <button type="submit" disabled={loading} className="register-button">
            {loading ? <span className="loader"></span> : "Create Account"}
          </button>
        </form>
        
        <div className="divider">
          <span>or sign up with</span>
        </div>
        
        <div className="social-register">
          <button className="social-button google">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M21.8,10.4h-8.5v3.4h4.8c-0.5,2.3-2.2,3.4-4.8,3.4c-2.9,0-5.3-2.4-5.3-5.3s2.4-5.3,5.3-5.3 c1.2,0,2.3,0.4,3.2,1.2l2.5-2.5C17.3,3.6,15.2,3,13,3C8.1,3,4,7.1,4,12s4.1,9,9,9c7.3,0,9-6.2,8.2-10.6C21.2,10.4,21.8,10.4,21.8,10.4z" fill="currentColor"></path>
            </svg>
            Google
          </button>
          <button className="social-button facebook">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M20.9,2H3.1C2.5,2,2,2.5,2,3.1v17.8C2,21.5,2.5,22,3.1,22h9.6v-7.7h-2.6v-3h2.6V9.4c0-2.6,1.6-4,3.9-4 c1.1,0,2.1,0.1,2.3,0.1v2.7h-1.6c-1.3,0-1.5,0.6-1.5,1.5v1.9h3l-0.4,3h-2.6V22h5.1c0.6,0,1.1-0.5,1.1-1.1V3.1C22,2.5,21.5,2,20.9,2z" fill="currentColor"></path>
            </svg>
            Facebook
          </button>
        </div>
        
        <p className="login-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
      
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Poppins', sans-serif;
        }
        
        .register-page {
          background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          width: 100%;
          position: relative;
          overflow: hidden;
        }
        
        .floating-shapes {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 1;
        }
        
        .shape {
          position: absolute;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 50%;
          animation: float 15s infinite linear;
        }
        
        .shape1 {
          width: 180px;
          height: 180px;
          top: 20%;
          left: 10%;
          animation-duration: 35s;
        }
        
        .shape2 {
          width: 120px;
          height: 120px;
          bottom: 20%;
          right: 10%;
          animation-duration: 25s;
          animation-delay: 2s;
        }
        
        .shape3 {
          width: 80px;
          height: 80px;
          bottom: 60%;
          right: 20%;
          animation-duration: 30s;
          animation-delay: 4s;
        }
        
        .shape4 {
          width: 250px;
          height: 250px;
          bottom: -50px;
          left: 30%;
          animation-duration: 40s;
          animation-delay: 1s;
        }
        
        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(180deg);
          }
          100% {
            transform: translateY(0) rotate(360deg);
          }
        }
        
        .register-container {
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(16px);
          border-radius: 20px;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);
          padding: 40px;
          width: 420px;
          text-align: center;
          border: 1px solid rgba(255, 255, 255, 0.2);
          z-index: 2;
          position: relative;
        }
        
        .logo-container {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }
        
        .logo {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00c6ff 0%, #0072ff 100%);
          color: white;
          box-shadow: 0 10px 20px rgba(0, 114, 255, 0.3);
        }
        
        h2 {
          font-size: 28px;
          font-weight: 600;
          color: #fff;
          margin-bottom: 10px;
        }
        
        .subtitle {
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 30px;
          font-size: 15px;
        }
        
        .error-message {
          background: rgba(255, 0, 0, 0.1);
          color: #ff5252;
          padding: 10px;
          border-radius: 8px;
          margin-bottom: 20px;
          border-left: 4px solid #ff5252;
          text-align: left;
        }
        
        form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        
        .input-group {
          position: relative;
          text-align: left;
        }
        
        label {
          display: block;
          color: rgba(255, 255, 255, 0.9);
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 500;
        }
        
        input {
          width: 100%;
          padding: 14px;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          font-size: 15px;
          background: rgba(255, 255, 255, 0.07);
          color: #fff;
          outline: none;
          transition: all 0.3s ease;
        }
        
        input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }
        
        input:focus {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.5);
          box-shadow: 0 0 15px rgba(0, 198, 255, 0.2);
        }
        
        .password-hint {
          display: block;
          color: rgba(255, 255, 255, 0.5);
          font-size: 12px;
          margin-top: 8px;
        }
        
        .terms {
          text-align: left;
        }
        
        .checkbox-label {
          display: flex;
          align-items: flex-start;
          color: rgba(255, 255, 255, 0.7);
          font-size: 13px;
          position: relative;
          cursor: pointer;
          padding-left: 28px;
          user-select: none;
        }
        
        .checkbox-label input {
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }
        
        .checkmark {
          position: absolute;
          top: 0;
          left: 0;
          height: 18px;
          width: 18px;
          background: rgba(255, 255, 255, 0.07);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 4px;
          transition: all 0.2s ease;
        }
        
        .checkbox-label:hover input ~ .checkmark {
          background: rgba(255, 255, 255, 0.15);
        }
        
        .checkbox-label input:checked ~ .checkmark {
          background: #00c6ff;
          border-color: #00c6ff;
        }
        
        .checkmark:after {
          content: "";
          position: absolute;
          display: none;
        }
        
        .checkbox-label input:checked ~ .checkmark:after {
          display: block;
        }
        
        .checkbox-label .checkmark:after {
          left: 6px;
          top: 2px;
          width: 5px;
          height: 10px;
          border: solid white;
          border-width: 0 2px 2px 0;
          transform: rotate(45deg);
        }
        
        .terms-link {
          color: #00c6ff;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        
        .terms-link:hover {
          text-decoration: underline;
        }
        
        .register-button {
          background: linear-gradient(to right, #00c6ff, #0072ff);
          color: white;
          padding: 15px;
          font-size: 16px;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
          box-shadow: 0 10px 20px rgba(0, 114, 255, 0.3);
          position: relative;
          overflow: hidden;
        }
        
        .register-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 25px rgba(0, 114, 255, 0.4);
        }
        
        .register-button:active {
          transform: translateY(0);
        }
        
        .register-button::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0));
          transform: translateX(-100%);
        }
        
        .register-button:hover::after {
          animation: shine 1.5s infinite;
        }
        
        @keyframes shine {
          100% {
            transform: translateX(100%);
          }
        }
        
        .loader {
          display: inline-block;
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: white;
          animation: spin 1s ease-in-out infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .divider {
          display: flex;
          align-items: center;
          margin: 30px 0;
          color: rgba(255, 255, 255, 0.5);
          font-size: 14px;
        }
        
        .divider::before, .divider::after {
          content: '';
          flex: 1;
          height: 1px;
          background: rgba(255, 255, 255, 0.2);
        }
        
        .divider span {
          padding: 0 15px;
        }
        
        .social-register {
          display: flex;
          justify-content: space-between;
          gap: 15px;
        }
        
        .social-button {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 12px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.05);
          color: white;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        
        .social-button:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-3px);
        }
        
        .google {
          color: #EA4335;
        }
        
        .facebook {
          color: #4267B2;
        }
        
        .login-link {
          margin-top: 30px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
        }
        
        .login-link a {
          color: #00c6ff;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        
        .login-link a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default Register;