import { useNavigate } from 'react-router-dom';

function Navbar({ userEmail, activeTab, setActiveTab }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <nav style={styles.nav}>
            <div style={styles.container}>
                {/* Logo Section */}
                <div style={styles.logo}>
                    <span style={styles.logoIcon}>💸</span> PaySecure
                </div>

                {/* Navigation Links */}
                <div style={styles.links}>
                    <button 
                        onClick={() => setActiveTab('overview')} 
                        style={activeTab === 'overview' ? styles.activeLink : styles.link}
                    >
                        Overview
                    </button>
                    <button 
                        onClick={() => setActiveTab('transactions')} 
                        style={activeTab === 'transactions' ? styles.activeLink : styles.link}
                    >
                        Transactions
                    </button>
                </div>

                {/* User Profile & Logout */}
                <div style={styles.userSection}>
                    <span style={styles.email}>{userEmail}</span>
                    <button onClick={handleLogout} style={styles.logoutBtn}>
                        Logout
                    </button>
                </div>
            </div>
        </nav>
    );
}

const styles = {
    nav: {
        background: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        padding: '0 20px',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
        boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
    },
    container: {
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    logo: {
        fontWeight: 'bold',
        fontSize: '20px',
        color: '#1e293b',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
    },
    links: {
        display: 'flex',
        gap: '20px',
    },
    link: {
        background: 'none',
        border: 'none',
        fontSize: '15px',
        color: '#64748b',
        cursor: 'pointer',
        padding: '8px 12px',
        borderRadius: '6px',
        transition: 'all 0.2s',
    },
    activeLink: {
        background: '#eff6ff', // Light blue bg
        border: 'none',
        fontSize: '15px',
        color: '#2563eb', // Blue text
        fontWeight: '600',
        cursor: 'pointer',
        padding: '8px 12px',
        borderRadius: '6px',
    },
    userSection: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
    },
    email: {
        fontSize: '14px',
        color: '#334155',
        fontWeight: '500',
    },
    logoutBtn: {
        padding: '8px 16px',
        background: '#fee2e2',
        color: '#dc2626',
        border: 'none',
        borderRadius: '6px',
        fontSize: '13px',
        fontWeight: '600',
        cursor: 'pointer',
    }
};

export default Navbar;