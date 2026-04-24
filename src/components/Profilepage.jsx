import React, { useState, useEffect } from 'react';
import styles from './Profilepage.module.css';
import closeeye from '../assets/closeeye.png';
import openeye from '../assets/openeye.png';

const Profilepage = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [passwordData, setPasswordData] = useState({ new: '', confirm: '' });
    const [notification, setNotification] = useState({ message: '', type: '', visible: false });

    const showNotification = (message, type) => {
        setNotification({ message, type, visible: true });
        setTimeout(() => {
            setNotification(prev => ({ ...prev, visible: false }));
        }, 5000);
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch("https://email-marketing-dashboard-v1.vercel.app/users/me/details", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    if (data?.data) {
                        setUserData(data.data);
                    }
                })
                .catch(error => console.error("Error fetching user details:", error))
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);
    

    const handleChangePassword = async (e) => {
        e.preventDefault();
        if (passwordData.new !== passwordData.confirm) {
            showNotification("New passwords do not match", "error");
            return;
        }

        const token = localStorage.getItem('token');
        try {
            const response = await fetch("https://email-marketing-dashboard-v1.vercel.app/users/me/password", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    new_password: passwordData.new
                })
            });

            if (response.ok) {
                showNotification("Password updated successfully", "success");
                setIsModalOpen(false);
                setPasswordData({ new: '', confirm: '' });
            } else {
                const errorData = await response.json();
                showNotification(errorData.message || "Failed to update password", "error");
            }
        } catch (error) {
            console.error("Error updating password:", error);
            showNotification("Error connecting to server", "error");
        }
    };

    // if (loading) {
    //     return (
    //         <div className={styles.profilePage}>
    //             <div className={styles.loading}>
    //                 <div className={styles.spinner}></div>
    //                 <p>Loading profile details...</p>
    //             </div>
    //         </div>
    //     );
    // }

    // if (!userData) {
    //     return (
    //         <div className={styles.profilePage}>
    //             <div className={styles.profileCard}>
    //                 <p>Failed to load profile data. Please try logging in again.</p>
    //             </div>
    //         </div>
    //     );
    // }

    const { full_name, email, role, phone_number, branch } = userData || {};

    return (
        <div className={styles.profilePage}>
            {notification.visible && (
                <div className={`${styles.notification} ${styles[notification.type]}`}>
                    <div className={styles.notificationIcon}>
                        {notification.type === 'success' ? '✓' : '✕'}
                    </div>
                    <p>{notification.message}</p>
                </div>
            )}
            <div className={styles.profileCard}>
                <div className={styles.avatarSection}>
                    <div className={styles.avatar}>
                        {full_name ? full_name.charAt(0).toUpperCase() : 'U'}
                    </div>
                    <div className={styles.roleBadge}>{role || 'Employee'}</div>
                </div>

                <h2 className={styles.userName}>{full_name || 'User Name'}</h2>
                <p className={styles.userSubtitle}>{email || 'email@example.com'}</p>

                <div className={styles.detailsGrid}>
                    <div className={styles.detailItem}>
                        <p className={styles.detailLabel}>Email Address</p>
                        <p className={styles.detailValue}>{email || 'N/A'}</p>
                    </div>
                    <div className={styles.detailItem}>
                        <p className={styles.detailLabel}>Phone Number</p>
                        <p className={styles.detailValue}>{phone_number || 'N/A'}</p>
                    </div>
                    <div className={styles.detailItem}>
                        <p className={styles.detailLabel}>Branch</p>
                        <p className={styles.detailValue}>{branch || 'N/A'}</p>
                    </div>
                    {/* <div className={styles.detailItem}>
                        <p className={styles.detailLabel}>Account Role</p>
                        <p className={styles.detailValue}>{role || 'N/A'}</p>
                    </div> */}
                    <div className={styles.detailItem}>
                        <div className={styles.passwordHeader}>
                            <p className={styles.detailLabel}>Password</p>
                            <button 
                                className={styles.toggleBtn} 
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                <img src={showPassword ? closeeye : openeye} alt="Toggle" />
                            </button>
                        </div>
                        <p className={styles.detailValue}>
                            {showPassword ? (userData.password || "••••••••") : "••••••••"}
                        </p>
                    </div>
                </div>

                <div className={styles.actions}>
                    <button className={styles.editBtn} onClick={() => setIsModalOpen(true)}>Update Password</button>
                </div>
            </div>

            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalCard}>
                        <div className={styles.modalHeader}>
                            <h3>Update Password</h3>
                            <button className={styles.closeBtn} onClick={() => setIsModalOpen(false)}>×</button>
                        </div>
                        <form className={styles.modalForm} onSubmit={handleChangePassword}>
                            <div className={styles.modalInputGroup}>
                                <label>New Password</label>
                                <input 
                                    type="password" 
                                    placeholder="Enter new password"
                                    value={passwordData.new}
                                    onChange={(e) => setPasswordData({...passwordData, new: e.target.value})}
                                    required 
                                />
                            </div>
                            <div className={styles.modalInputGroup}>
                                <label>Confirm New Password</label>
                                <input 
                                    type="password" 
                                    placeholder="Confirm new password"
                                    value={passwordData.confirm}
                                    onChange={(e) => setPasswordData({...passwordData, confirm: e.target.value})}
                                    required 
                                />
                            </div>
                            <div className={styles.modalFooter}>
                                <button type="button" className={styles.cancelBtn} onClick={() => setIsModalOpen(false)}>Cancel</button>
                                <button type="submit" className={styles.submitBtn}>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profilepage;
