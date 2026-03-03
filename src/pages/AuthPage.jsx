import React, { useState, useEffect, useContext } from 'react';
import { useLocation, Link, useNavigate } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';
import { userContext } from '../Components/Context';
import './AuthPage.css';

const AuthPage = () => {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [role, setRole] = useState('user'); // 'user' or 'admin'
  const [accountType, setAccountType] = useState('buyer'); // 'buyer' or 'seller' for signup
  const [sellerAuthMethod, setSellerAuthMethod] = useState('business');
  const [showPassword, setShowPassword] = useState(false);
  const { submitCall, loginCall } = useContext(userContext);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const urlMode = params.get('mode');
    const urlRole = params.get('role');
    const urlType = params.get('type');
    
    if (urlMode) setMode(urlMode);
    if (urlRole) setRole(urlRole);
    if (urlType) setAccountType(urlType);
  }, [location]);

  // Handle forcing Admin to only have Login
  useEffect(() => {
    if (role === 'admin' && mode === 'signup') {
      setMode('login'); // Admins cannot sign up
    }
  }, [role, mode]);

  const toggleMode = (newMode) => {
    if (role === 'admin' && newMode === 'signup') return;
    setMode(newMode);
  };

  const GreenPanel = () => (
    <div className="auth-panel-green">
      <div className="panel-header">
        <span className="verify-badge">✓</span> CARBON NEUTRAL PLATFORM
      </div>
      
      <div className="panel-content">
        <h2 className="panel-title">Turn Waste Into Value</h2>
        <p className="panel-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
      </div>

      <div className="testimonial-card">
        <div className="testimonial-header">
          <div className="user-avatar">
            <span>sj</span>
          </div>
          <div>
            <h4>Sarah Jekins</h4>
            <span className="verified-member">Verified Member</span>
          </div>
        </div>
        <p className="testimonial-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
      
      {/* Decorative Tree / Global Advocates */}
      <div className="panel-footer-decor">
        <div className="advocates">
          <div className="advocate-avatars">
            <div className="adv-av"></div>
            <div className="adv-av"></div>
            <div className="adv-av"></div>
          </div>
          <span>Trusted by sustainable advocates globally</span>
        </div>
      </div>
      <div className="tree-bg"></div>
    </div>
  );

  return (
    <div className={`auth-page container ${mode === 'login' ? 'layout-reverse' : ''}`}>
      <div className="auth-panel-form">
        <div className="form-header">
          <Link to="/" className="auth-logo">
            <span className="logo-icon">♻️</span> <span className="logo-text">EcoSwap</span>
          </Link>
          <h1 className="form-title">
            {mode === 'login' ? 'Welcome Back' : 'Create your account'}
          </h1>
          <p className="form-subtitle">Join the latest community of Green Revolution</p>
        </div>

        <div className="mode-toggle">
          <button 
            className={`toggle-btn ${mode === 'login' ? 'active' : ''}`}
            onClick={() => toggleMode('login')}
          >
            Login
          </button>
          <button 
            className={`toggle-btn ${mode === 'signup' ? 'active' : ''} ${role === 'admin' ? 'disabled' : ''}`}
            onClick={() => toggleMode('signup')}
            disabled={role === 'admin'}
          >
            Sign Up
          </button>
        </div>

        <form className="auth-form" onSubmit={(e) => {
          e.preventDefault();
          if (mode === 'login') {
            loginCall({ email: e.target.email?.value, password: e.target.password?.value, role });
          } else {
            submitCall({
              fullName: e.target.fullName?.value,
              accountType,
              sellerAuthMethod: accountType === 'seller' ? sellerAuthMethod : undefined,
              email: e.target.email?.value,
              password: e.target.password?.value,
              role
            });
          }
        }}>
          {mode === 'signup' && (
            <>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" name="fullName" placeholder="Sarah Jenkins" />
              </div>
              
              <div className="form-group">
                <label>Account Type</label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input 
                      type="radio" 
                      name="accountType" 
                      value="buyer" 
                      checked={accountType === 'buyer'}
                      onChange={() => setAccountType('buyer')}
                    /> Buyer
                  </label>
                  <label className="radio-label">
                    <input 
                      type="radio" 
                      name="accountType" 
                      value="seller" 
                      checked={accountType === 'seller'}
                      onChange={() => setAccountType('seller')}
                    /> Seller
                  </label>
                </div>
              </div>

              {accountType === 'seller' && (
                <div className="form-group seller-auth-group">
                  <label>Seller Authentication Method</label>
                  <select 
                    className="form-select" 
                    value={sellerAuthMethod}
                    onChange={(e) => setSellerAuthMethod(e.target.value)}
                  >
                    <option value="business">Provide Business Document</option>
                    <option value="nin">Provide NIN</option>
                  </select>
                  {sellerAuthMethod === 'business' ? (
                    <input type="file" name="businessDoc" className="file-input" style={{ marginTop: '10px' }} />
                  ) : (
                    <input type="text" name="nin" placeholder="Enter your NIN" style={{ marginTop: '10px', padding: '12px', width: '100%', borderRadius: '8px', border: '1px solid #ddd' }} />
                  )}
                </div>
              )}
            </>
          )}

          <div className="form-group">
            <label>{role === 'admin' ? 'Admin Email' : 'Email'}</label>
            <input type="email" name="email" placeholder="@ name@email.com" />
          </div>

          <div className="form-group">
            <label>Password</label>
            <div className="password-input">
              <input 
                type={showPassword ? "text" : "password"} 
                name="password"
                placeholder="***************" 
              />
              <button 
                type="button" 
                className="eye-btn" 
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="form-actions-row">
            <label className="checkbox-label">
              <input type="checkbox" /> Remember me
            </label>
            {mode === 'login' && <a href="#" className="forgot-password">Forgot Password?</a>}
          </div>

          <button className="btn-submit">
            {mode === 'login' ? 'Proceed' : 'Sign Up'}
          </button>

          {mode === 'signup' && (
            <label className="checkbox-label agree-terms">
              <input type="checkbox" required /> I agree to the Terms Services and Privacy Policy
            </label>
          )}

          {role === 'admin' && (
            <div className="security-notice">
              <strong>Security Notice:</strong> Admin accounts can only be created by system administrators. Contact your system administrator if you need access.
            </div>
          )}

          {role === 'admin' ? (
            <button 
              type="button" 
              className="btn-outline w-full mt-4"
              onClick={() => setRole('user')}
            >
              Back to User Login
            </button>
          ) : (
            <div className="social-auth">
              <div className="social-divider">
                <span>{mode === 'login' ? 'Or continue with' : 'Or signup with'}</span>
              </div>
              <div className="social-buttons">
                <button type="button" className="btn-social">Google</button>
                <button type="button" className="btn-social">Microsoft</button>
              </div>
            </div>
          )}
        </form>
        
        {role === 'user' && mode === 'login' && (
           <div className="admin-link-wrapper mt-4 text-center">
             <button onClick={() => setRole('admin')} className="admin-link text-secondary text-sm">
               Admin Login
             </button>
           </div>
        )}
      </div>

      <GreenPanel />
    </div>
  );
};

export default AuthPage;

