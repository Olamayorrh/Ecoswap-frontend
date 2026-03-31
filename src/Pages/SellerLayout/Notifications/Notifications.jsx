import React, { useState } from 'react';
import { AiOutlineSetting, AiOutlineHeart, AiOutlineCheckCircle, AiOutlineMessage } from 'react-icons/ai';
import styles from './Notifications.module.css';

const Notifications = () => {
    const [activeTab, setActiveTab] = useState('All Notifications');

    return (
        <div className={styles.notificationsContainer}>
            <div className={styles.header}>
                <div className={styles.titleArea}>
                    <h2>Notifications</h2>
                    <p className={styles.subtitle}>Manage your activity and marketplace updates</p>
                </div>
                <div className={styles.headerActions}>
                    <button className={styles.markReadBtn}>Mark all as read</button>
                    <button className={styles.settingsBtn}>
                        <AiOutlineSetting size={20} />
                    </button>
                </div>
            </div>

            <div className={styles.tabsOuter}>
                {['All Notifications', 'Purchase', 'Interests', 'Settings'].map((tab) => (
                    <button
                        key={tab}
                        className={`${styles.tabBtn} ${activeTab === tab ? styles.activeTab : ''}`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            <div className={styles.notificationList}>
                {/* Fixed Card 1: Interest Expressed */}
                <div className={`${styles.notificationCard} ${styles.cardInterest}`}>
                    <div className={styles.cardHeader}>
                        <div className={styles.titleGroup}>
                            <AiOutlineHeart size={20} className={styles.iconDarkGray} />
                            <h4>Interest Expressed</h4>
                        </div>
                        <span className={styles.timeStr}>35 min ago</span>
                    </div>

                    <div className={styles.cardBody}>
                        <p>A buyer has expressed inteerst in one of your listings <strong>"Bulk Aluminum Scrap (10 Tons)"</strong>.</p>
                    </div>

                    <div className={styles.cardFooter}>
                        <button className={`${styles.actionBtn} ${styles.textGreen}`}>
                            Message Buyer
                        </button>
                        <div className={styles.unreadDotGreen} />
                    </div>
                </div>

                {/* Fixed Card 2: Trust Score Updated */}
                <div className={`${styles.notificationCard} ${styles.cardTrust}`}>
                    <div className={styles.cardHeader}>
                        <div className={styles.titleGroup}>
                            <AiOutlineCheckCircle size={20} className={styles.iconGreen} />
                            <h4>Trust Score Updated</h4>
                        </div>
                        <span className={styles.timeStr}>35 min ago</span>
                    </div>

                    <div className={styles.cardBody}>
                        <p>Your AI Trust Score has been updated! Complete your profile to reach <span className={styles.textGreen}>Elite Trader</span> status.</p>
                    </div>

                    <div className={styles.cardFooter}>
                        <button className={styles.actionBtn}></button>
                        <div className={styles.unreadDotGreen} />
                    </div>
                </div>

                {/* Fixed Card 3: New Message */}
                <div className={`${styles.notificationCard} ${styles.cardMessage}`}>
                    <div className={styles.cardHeader}>
                        <div className={styles.titleGroup}>
                            <AiOutlineMessage size={20} className={styles.iconBlue} />
                            <h4>New Message</h4>
                        </div>
                        <span className={styles.timeStr}>Yesterday</span>
                    </div>

                    <div className={styles.cardBody}>
                        <p>Amaka just sent you a message</p>
                    </div>

                    <div className={styles.cardFooter}>
                        <button className={`${styles.actionBtn} ${styles.textBlue}`}>
                            Open Conversation
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notifications;
