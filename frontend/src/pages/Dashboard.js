import { useEffect, useState, useMemo } from 'react';
import Navbar from './Navbar';

function Dashboard() {
    const token = localStorage.getItem('token');

    // Data State
    const [balance, setBalance] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [userEmail, setUserEmail] = useState('');

    // Form State
    const [receiverEmail, setReceiverEmail] = useState('');
    const [amount, setAmount] = useState('');

    // UI State
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    // 🔹 Sorting State
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

    // 🔹 Fetch Data
    const fetchData = async () => {
        try {
            const userRes = await fetch('/api/auth/me', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const userData = await userRes.json();
            if (userRes.ok) {
                setBalance(userData.balance);
                setUserEmail(userData.email);
            }

            const txRes = await fetch('/api/transactions', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const txData = await txRes.json();
            if (txRes.ok) setTransactions(txData);

        } catch (err) {
            console.error("Error fetching data", err);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // 🔹 Sorting Handler
    const handleSort = (key) => {
        let direction = 'asc';
        if (sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    // 🔹 Memoized Sorted Transactions
    const sortedTransactions = useMemo(() => {
        let sortableItems = [...transactions];
        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
                if (sortConfig.key === 'date') {
                    const dateA = new Date(a.createdAt);
                    const dateB = new Date(b.createdAt);
                    return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
                }
                if (sortConfig.key === 'amount') {
                    return sortConfig.direction === 'asc' ? a.amount - b.amount : b.amount - a.amount;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [transactions, sortConfig]);

    const handleTransfer = async (e) => {
        e.preventDefault();
        setError('');
        setMessage('');
        setLoading(true);

        try {
            const res = await fetch('/api/transfer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ receiverEmail, amount: Number(amount) })
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error);

            setMessage('Transfer successful! 💸');
            setReceiverEmail('');
            setAmount('');
            await fetchData();

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => new Date(dateString).toLocaleDateString() + ' ' + new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const renderSortArrow = (key) => {
        if (sortConfig.key !== key) return <span style={{ opacity: 0.3 }}> ↕</span>;
        return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
    };

    return (
        <div style={styles.page}>
            <div style={styles.aurora1}></div>
            <div style={styles.aurora2}></div>

            <Navbar userEmail={userEmail} activeTab={activeTab} setActiveTab={setActiveTab} />

            <div style={styles.mainContainer}>

                {/* 🟢 VIEW 1: OVERVIEW */}
                {activeTab === 'overview' && (
                    <div style={styles.grid}>
                        
                        {/* 💳 ATM CARD */}
                        <div style={styles.atmCard}>
                            <div style={styles.cardShine}></div> 
                            <div style={styles.cardTopRow}>
                                <div style={styles.chip}>
                                    <div style={styles.chipLine}></div>
                                </div>
                                <div style={styles.contactless}>)))</div>
                            </div>
                            <div style={styles.cardMiddle}>
                                <span style={styles.cardLabel}>Current Balance</span>
                                <h1 style={styles.balanceText}>
                                    ₹{balance !== null ? balance.toLocaleString() : '...'}
                                </h1>
                            </div>
                            <div style={styles.cardBottom}>
                                <p style={styles.cardNumber}>
                                    <span>****</span> <span>****</span> <span>****</span> <span>4582</span>
                                </p>
                                <div style={styles.cardFooterInfo}>
                                    <div style={styles.cardHolderInfo}>
                                        <span style={styles.holderLabel}>CARD HOLDER</span>
                                        <span style={styles.cardName}>{userEmail.split('@')[0].toUpperCase()}</span>
                                    </div>
                                    <div style={styles.cardLogo}>
                                        <div style={styles.circle1}></div>
                                        <div style={styles.circle2}></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Send Money Form */}
                        <div style={styles.whiteCard}>
                            <h3 style={styles.sectionTitle}>Send Money</h3>
                            {error && <div style={styles.alertError}>⚠️ {error}</div>}
                            {message && <div style={styles.alertSuccess}>✓ {message}</div>}
                            <form onSubmit={handleTransfer} style={styles.form}>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>To</label>
                                    <input type="email" placeholder="email@address.com" value={receiverEmail} onChange={(e) => setReceiverEmail(e.target.value)} required style={styles.input} />
                                </div>
                                <div style={styles.inputGroup}>
                                    <label style={styles.label}>Amount</label>
                                    <div style={styles.amountWrapper}>
                                        <span style={styles.currencyPrefix}>₹</span>
                                        <input type="number" placeholder="0" value={amount} onChange={(e) => setAmount(e.target.value)} required min="1" style={styles.amountInput} />
                                    </div>
                                </div>
                                <button type="submit" style={styles.sendBtn} disabled={loading}>
                                    {loading ? 'Processing...' : 'Transfer Funds →'}
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* 🔵 VIEW 2: TRANSACTIONS (COMPACT & LINED) */}
                {activeTab === 'transactions' && (
                    <div style={styles.whiteCardFull}>
                        <div style={styles.headerWrapper}>
                            <h3 style={styles.centeredTitle}>Transaction History</h3>
                            <p style={styles.subTitle}>Your recent financial activity</p>
                        </div>

                        {transactions.length === 0 ? (
                            <p style={styles.emptyText}>No transactions found.</p>
                        ) : (
                            <div style={styles.tableContainer}>
                                <table style={styles.table}>
                                    <thead>
                                        <tr>
                                            <th style={{ ...styles.th, ...styles.sortableTh }} onClick={() => handleSort('date')}>
                                                Date {renderSortArrow('date')}
                                            </th>
                                            <th style={styles.th}>Type</th>
                                            <th style={styles.th}>Details</th>
                                            <th style={styles.th}>Status</th>
                                            <th style={{ ...styles.thRight, ...styles.sortableTh }} onClick={() => handleSort('amount')}>
                                                Amount {renderSortArrow('amount')}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sortedTransactions.map((tx) => {
                                            const isSent = tx.senderId?.email === userEmail;
                                            return (
                                                <tr key={tx._id} style={styles.tableRow}>
                                                    <td style={styles.tdDate}>{formatDate(tx.createdAt)}</td>
                                                    <td style={styles.td}>
                                                        <div style={isSent ? styles.iconSent : styles.iconReceived}>
                                                            {isSent ? '↗' : '↙'}
                                                        </div>
                                                    </td>
                                                    <td style={styles.tdSecondary}>
                                                        {isSent ? `To ${tx.receiverId?.email}` : `From ${tx.senderId?.email}`}
                                                    </td>
                                                    <td style={styles.td}>
                                                        <span style={styles.statusPill}>{tx.status}</span>
                                                    </td>
                                                    <td style={{ ...styles.tdRight, color: isSent ? '#1f2937' : '#059669' }}>
                                                        {isSent ? '-' : '+'} ₹{tx.amount}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

// 🎨 Styles
const styles = {
    page: {
        minHeight: '100vh',
        background: '#f8fafc',
        fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
        paddingTop: '90px',
        position: 'relative',
        overflow: 'hidden',
    },
    aurora1: {
        position: 'absolute', top: '-10%', left: '-10%', width: '500px', height: '500px',
        background: '#c4b5fd', filter: 'blur(100px)', opacity: 0.4, zIndex: 0, borderRadius: '50%',
    },
    aurora2: {
        position: 'absolute', top: '20%', right: '-5%', width: '400px', height: '400px',
        background: '#67e8f9', filter: 'blur(90px)', opacity: 0.3, zIndex: 0, borderRadius: '50%',
    },
    mainContainer: {
        width: '92%', 
        maxWidth: '1400px', 
        margin: '0 auto', 
        position: 'relative', 
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: 'calc(100vh - 120px)',
    },
    grid: {
        display: 'grid', 
        gridTemplateColumns: 'minmax(380px, 1fr) 1fr', 
        gap: '50px', 
        alignItems: 'center', 
    },

    // 💳 ATM CARD STYLES
    atmCard: {
        background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
        borderRadius: '24px',
        padding: '35px',
        color: 'white',
        boxShadow: '0 30px 60px -15px rgba(30, 27, 75, 0.4), inset 0 0 0 1px rgba(255,255,255,0.1)',
        minHeight: '260px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        fontFamily: '"Plus Jakarta Sans", sans-serif',
    },
    cardShine: {
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        background: 'radial-gradient(circle at top right, rgba(255,255,255,0.15) 0%, transparent 60%)', pointerEvents: 'none',
    },
    cardTopRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' },
    chip: {
        width: '50px', height: '38px', background: 'linear-gradient(135deg, #fef9c3 0%, #ca8a04 100%)',
        borderRadius: '6px', border: '1px solid rgba(0,0,0,0.1)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center',
    },
    chipLine: { width: '100%', height: '1px', background: 'rgba(0,0,0,0.2)', position: 'absolute' },
    contactless: { fontSize: '24px', color: 'rgba(255,255,255,0.8)', transform: 'rotate(90deg)', letterSpacing: '-2px', fontWeight: 'bold' },
    cardMiddle: { marginTop: '20px' },
    cardLabel: { fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1.5px', opacity: 0.7, fontFamily: 'sans-serif' },
    
    // ✨ Updated Readable Numbers Font
    balanceText: { 
        fontSize: '36px', 
        fontWeight: '600', 
        margin: '5px 0 0 0', 
        fontFamily: '"Source Code Pro", "Consolas", "Courier New", monospace', // Readable Font
        letterSpacing: '-1px',
        textShadow: '0 2px 4px rgba(0,0,0,0.3)' 
    },
    
    cardBottom: { marginTop: '30px' },
    
    // ✨ Updated Readable Numbers Font
    cardNumber: { 
        fontSize: '24px', 
        fontFamily: '"Source Code Pro", "Consolas", "Courier New", monospace', // Readable Font
        letterSpacing: '4px', 
        fontWeight: '500', 
        marginBottom: '20px', 
        textShadow: '0 2px 2px rgba(0,0,0,0.4)', 
        display: 'flex', 
        gap: '15px' 
    },
    
    cardFooterInfo: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' },
    cardHolderInfo: { display: 'flex', flexDirection: 'column' },
    holderLabel: { fontSize: '8px', opacity: 0.6, marginBottom: '2px', fontFamily: 'sans-serif' },
    cardName: { fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase' },
    cardLogo: { display: 'flex', position: 'relative', width: '50px', height: '30px' },
    circle1: { width: '30px', height: '30px', background: 'rgba(255, 0, 0, 0.8)', borderRadius: '50%', position: 'absolute', left: 0 },
    circle2: { width: '30px', height: '30px', background: 'rgba(255, 165, 0, 0.8)', borderRadius: '50%', position: 'absolute', right: 0, mixBlendMode: 'screen' },

    // 📋 TABLE CONTAINER STYLES
    whiteCard: { background: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(20px)', borderRadius: '30px', padding: '40px', border: '1px solid #ffffff', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)' },
    whiteCardFull: { 
        background: 'rgba(255, 255, 255, 0.8)', 
        backdropFilter: 'blur(20px)', 
        borderRadius: '24px', 
        padding: '30px', 
        border: '1px solid #ffffff', 
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)', 
        width: '100%', 
    },
    headerWrapper: { textAlign: 'center', marginBottom: '30px' },
    centeredTitle: { fontSize: '28px', fontWeight: '800', color: '#0f172a', marginBottom: '5px' },
    subTitle: { color: '#64748b', fontSize: '15px' },
    
    // 🖊️ COMPACT TABLE STYLES (WITH LINES)
    tableContainer: { 
        overflowX: 'auto', 
        border: '1px solid #e2e8f0', 
        borderRadius: '12px',
        background: '#fff'
    },
    table: { 
        width: '100%', 
        borderCollapse: 'collapse', 
    },
    th: { 
        padding: '12px 16px', 
        textAlign: 'left', 
        fontSize: '12px', 
        fontWeight: '600', 
        color: '#64748b', 
        background: '#f8fafc',
        borderBottom: '1px solid #e2e8f0', 
        borderRight: '1px solid #f1f5f9', 
        textTransform: 'uppercase'
    },
    thRight: { 
        padding: '12px 16px', 
        textAlign: 'right', 
        fontSize: '12px', 
        fontWeight: '600', 
        color: '#64748b', 
        background: '#f8fafc',
        borderBottom: '1px solid #e2e8f0',
        textTransform: 'uppercase'
    },
    sortableTh: { cursor: 'pointer', userSelect: 'none', transition: 'color 0.2s', ':hover': { color: '#4f46e5' } },
    
    tableRow: { transition: 'background 0.2s' },
    
    td: { 
        padding: '12px 16px', 
        fontSize: '13px',
        color: '#334155',
        borderBottom: '1px solid #e2e8f0', 
        borderRight: '1px solid #f8fafc' 
    },
    tdDate: { 
        padding: '12px 16px', 
        color: '#64748b', 
        fontWeight: '500', 
        fontSize: '13px', 
        borderBottom: '1px solid #e2e8f0',
        borderRight: '1px solid #f8fafc'
    },
    tdSecondary: { 
        padding: '12px 16px', 
        color: '#334155', 
        fontWeight: '600', 
        fontSize: '14px', 
        borderBottom: '1px solid #e2e8f0',
        borderRight: '1px solid #f8fafc'
    },
    tdRight: { 
        padding: '12px 16px', 
        textAlign: 'right', 
        fontSize: '14px', 
        fontWeight: '700', 
        borderBottom: '1px solid #e2e8f0' 
    },

    // Icons & Forms
    iconSent: { width: '28px', height: '28px', background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', fontSize: '14px' },
    iconReceived: { width: '28px', height: '28px', background: '#ecfdf5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669', fontSize: '14px' },
    statusPill: { background: '#f1f5f9', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '600', color: '#475569', textTransform: 'uppercase', letterSpacing: '0.5px' },
    
    sectionTitle: { fontSize: '24px', fontWeight: '700', color: '#1e293b', marginBottom: '30px' },
    form: { display: 'flex', flexDirection: 'column', gap: '25px' },
    inputGroup: { display: 'flex', flexDirection: 'column', gap: '8px' },
    label: { fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' },
    input: { padding: '18px', borderRadius: '16px', border: 'none', background: '#f1f5f9', fontSize: '16px', fontWeight: '500', color: '#334155', outline: 'none', transition: 'box-shadow 0.2s' },
    amountWrapper: { display: 'flex', alignItems: 'center', background: '#f1f5f9', borderRadius: '16px', padding: '0 20px' },
    currencyPrefix: { fontSize: '20px', color: '#94a3b8', fontWeight: 'bold' },
    amountInput: { width: '100%', padding: '18px 10px', border: 'none', background: 'transparent', fontSize: '24px', fontWeight: '700', color: '#1e293b', outline: 'none' },
    sendBtn: { background: '#0f172a', color: '#fff', padding: '20px', borderRadius: '16px', border: 'none', fontSize: '16px', fontWeight: '600', cursor: 'pointer', marginTop: '10px', transition: 'transform 0.1s' },
    alertError: { color: '#ef4444', marginBottom: '20px', fontWeight: '500' },
    alertSuccess: { color: '#22c55e', marginBottom: '20px', fontWeight: '500' },
    emptyText: { textAlign: 'center', color: '#94a3b8', padding: '60px' }
};

export default Dashboard;