import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });
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
      const response = await axios.post("http://localhost/todo_app/api/login.php", user);
      
      if (response.data.status === "success") {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/dashboard");
      } else {
        setError(response.data.message || "Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login failed:", error);
      setError(error.response?.data?.message || "Login failed. Server error or network issue.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="floating-shapes">
        <div className="shape shape1"></div>
        <div className="shape shape2"></div>
        <div className="shape shape3"></div>
        <div className="shape shape4"></div>
      </div>
      
      <div className="login-container">
        <div className="logo-container">
          <div className="logo">
            <svg viewBox="0 0 24 24" width="40" height="40" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
            </svg>
          </div>
        </div>
        
        <h2>Welcome Back</h2>
        <p className="subtitle">Log in to your account to continue</p>
        
        {error && <div className="error-message">{error}</div>}
        
        <form onSubmit={handleSubmit}>
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
              placeholder="Enter your password" 
              value={user.password}
              onChange={handleChange} 
              required 
              disabled={loading}
            />
          </div>
          
          <div className="remember-forgot">
            <label className="remember">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className="forgot-password">Forgot password?</a>
          </div>
          
          <button type="submit" disabled={loading} className="login-button">
            {loading ? <span className="loader"></span> : "Log In"}
          </button>
        </form>
        
        <div className="divider">
          <span>or continue with</span>
        </div>
        
        <div className="social-login">
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
        
        <p className="signup-link">
          Don't have an account? <Link to="/register">Sign up</Link>
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
        
        .login-page {
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
        
        .login-container {
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
        
        .remember-forgot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 14px;
        }
        
        .remember {
          display: flex;
          align-items: center;
          color: rgba(255, 255, 255, 0.7);
        }
        
        .remember input {
          width: auto;
          margin-right: 8px;
        }
        
        .forgot-password {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: 0.3s;
        }
        
        .forgot-password:hover {
          color: #00c6ff;
        }
        
        .login-button {
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
        
        .login-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 25px rgba(0, 114, 255, 0.4);
        }
        
        .login-button:active {
          transform: translateY(0);
        }
        
        .login-button::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0));
          transform: translateX(-100%);
        }
        
        .login-button:hover::after {
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
        
        .social-login {
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
        
        .signup-link {
          margin-top: 30px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 14px;
        }
        
        .signup-link a {
          color: #00c6ff;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        
        .signup-link a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};
export default Login;