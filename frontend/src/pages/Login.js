import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // 🔹 Toggle State
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    
    // UI States for hover/focus effects
    const [focusedInput, setFocusedInput] = useState(null);
    const [isButtonHovered, setIsButtonHovered] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:4000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Login failed');
                setLoading(false);
                return;
            }

            localStorage.setItem('token', data.token);
            navigate('/dashboard');

        } catch (err) {
            setError('Backend not reachable');
        } finally {
            setLoading(false);
        }
    };

    // 🔹 Toggle Function
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                
                {/* Header Section */}
                <div style={styles.header}>
                    <h2 style={styles.title}>Welcome Back</h2>
                    <p style={styles.subtitle}>Please enter your details to sign in.</p>
                </div>

                <form onSubmit={handleSubmit} style={styles.form}>
                    {/* Email Input */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email Address</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                ...styles.input,
                                border: focusedInput === 'email' ? '1px solid #2563eb' : '1px solid #e2e8f0',
                                boxShadow: focusedInput === 'email' ? '0 0 0 3px rgba(37, 99, 235, 0.1)' : 'none'
                            }}
                            onFocus={() => setFocusedInput('email')}
                            onBlur={() => setFocusedInput(null)}
                        />
                    </div>

                    {/* Password Input with Eye Icon */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <div style={styles.passwordWrapper}>
                            <input
                                type={showPassword ? "text" : "password"} // 🔹 Dynamic Type
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{
                                    ...styles.input,
                                    width: '100%', // Ensure input takes full width of wrapper
                                    border: focusedInput === 'password' ? '1px solid #2563eb' : '1px solid #e2e8f0',
                                    boxShadow: focusedInput === 'password' ? '0 0 0 3px rgba(37, 99, 235, 0.1)' : 'none'
                                }}
                                onFocus={() => setFocusedInput('password')}
                                onBlur={() => setFocusedInput(null)}
                            />
                            
                            {/* 🔹 Eye Icon Button */}
                            <button 
                                type="button" 
                                onClick={togglePasswordVisibility} 
                                style={styles.eyeButton}
                            >
                                {showPassword ? (
                                    // Eye Off Icon (SVG)
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                                        <line x1="1" y1="1" x2="23" y2="23"></line>
                                    </svg>
                                ) : (
                                    // Eye On Icon (SVG)
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                        <circle cx="12" cy="12" r="3"></circle>
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div style={styles.errorContainer}>
                            <span style={styles.errorIcon}>⚠️</span>
                            <p style={styles.errorText}>{error}</p>
                        </div>
                    )}

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        style={{
                            ...styles.button,
                            background: loading ? '#93c5fd' : (isButtonHovered ? '#1d4ed8' : '#2563eb'),
                            transform: isButtonHovered && !loading ? 'translateY(-1px)' : 'none',
                        }}
                        onMouseEnter={() => setIsButtonHovered(true)}
                        onMouseLeave={() => setIsButtonHovered(false)}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>

                    {/* Footer / Register Link */}
                    <div style={styles.footer}>
                        <p style={styles.footerText}>
                            Don’t have an account?{' '}
                            <Link to="/register" style={styles.link}>
                                Create account
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

// 🎨 Styles
const styles = {
    container: {
        height: '100vh',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #f0f4ff 0%, #e0e7ff 100%)',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    },
    card: {
        width: '100%',
        maxWidth: '400px',
        padding: '40px',
        background: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01)',
        margin: '20px',
    },
    header: { textAlign: 'center', marginBottom: '32px' },
    title: { fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '8px' },
    subtitle: { fontSize: '14px', color: '#64748b', margin: 0 },
    form: { display: 'flex', flexDirection: 'column', gap: '20px' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '6px' },
    label: { fontSize: '14px', fontWeight: '500', color: '#334155' },
    
    // 🔹 Wrapper for Password Input + Eye Button
    passwordWrapper: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    },
    input: {
        padding: '12px 16px',
        borderRadius: '8px',
        fontSize: '14px',
        outline: 'none',
        transition: 'all 0.2s ease',
        color: '#1e293b',
        backgroundColor: '#f8fafc',
        width: '100%', // Important for wrapper
        boxSizing: 'border-box' // Ensures padding doesn't break width
    },
    // 🔹 Style for the Eye Button
    eyeButton: {
        position: 'absolute',
        right: '12px',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0',
        display: 'flex',
        alignItems: 'center',
    },

    button: {
        padding: '12px',
        marginTop: '10px',
        color: '#ffffff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '16px',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)',
    },
    errorContainer: {
        background: '#fef2f2',
        border: '1px solid #fecaca',
        borderRadius: '6px',
        padding: '10px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    errorIcon: { fontSize: '14px' },
    errorText: { color: '#dc2626', fontSize: '13px', margin: 0 },
    footer: { textAlign: 'center', marginTop: '16px' },
    footerText: { fontSize: '14px', color: '#64748b' },
    link: { color: '#2563eb', fontWeight: '600', textDecoration: 'none', transition: 'color 0.2s' }
};

export default Login;