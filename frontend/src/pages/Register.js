import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
            const response = await fetch('http://localhost:4000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.error || 'Registration failed');
                setLoading(false);
                return;
            }

            // Redirect to login after successful registration
            navigate('/login');

        } catch (err) {
            setError('Backend not reachable');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>

                {/* Header Section */}
                <div style={styles.header}>
                    <h2 style={styles.title}>Create an Account</h2>
                    <p style={styles.subtitle}>Join us to get started with your journey.</p>
                </div>

                <form onSubmit={handleSubmit} style={styles.form}>
                    
                    {/* Name Input */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Full Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            style={{
                                ...styles.input,
                                border: focusedInput === 'name' ? '1px solid #2563eb' : '1px solid #e2e8f0',
                                boxShadow: focusedInput === 'name' ? '0 0 0 3px rgba(37, 99, 235, 0.1)' : 'none'
                            }}
                            onFocus={() => setFocusedInput('name')}
                            onBlur={() => setFocusedInput(null)}
                        />
                    </div>

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

                    {/* Password Input */}
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            placeholder="Create a strong password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                ...styles.input,
                                border: focusedInput === 'password' ? '1px solid #2563eb' : '1px solid #e2e8f0',
                                boxShadow: focusedInput === 'password' ? '0 0 0 3px rgba(37, 99, 235, 0.1)' : 'none'
                            }}
                            onFocus={() => setFocusedInput('password')}
                            onBlur={() => setFocusedInput(null)}
                        />
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
                        {loading ? 'Creating Account...' : 'Sign Up'}
                    </button>

                    {/* Footer / Login Link */}
                    <div style={styles.footer}>
                        <p style={styles.footerText}>
                            Already have an account?{' '}
                            <Link to="/login" style={styles.link}>
                                Log in
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}

// 🎨 Styles (Matches Login.js exactly for consistency)
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
    header: {
        textAlign: 'center',
        marginBottom: '32px',
    },
    title: {
        fontSize: '24px',
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: '8px',
    },
    subtitle: {
        fontSize: '14px',
        color: '#64748b',
        margin: 0,
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
    },
    label: {
        fontSize: '14px',
        fontWeight: '500',
        color: '#334155',
    },
    input: {
        padding: '12px 16px',
        borderRadius: '8px',
        fontSize: '14px',
        outline: 'none',
        transition: 'all 0.2s ease',
        color: '#1e293b',
        backgroundColor: '#f8fafc',
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
    errorIcon: {
        fontSize: '14px',
    },
    errorText: {
        color: '#dc2626',
        fontSize: '13px',
        margin: 0,
    },
    footer: {
        textAlign: 'center',
        marginTop: '16px',
    },
    footerText: {
        fontSize: '14px',
        color: '#64748b',
    },
    link: {
        color: '#2563eb',
        fontWeight: '600',
        textDecoration: 'none',
        transition: 'color 0.2s',
    }
};

export default Register;