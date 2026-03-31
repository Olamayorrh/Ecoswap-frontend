import React, { useState } from "react";
import styles from "./Notifications.module.css";
import { AiOutlineSetting } from "react-icons/ai";
import { FaHammer, FaHeart, FaCommentAlt } from "react-icons/fa";

const BuyerNotifications = () => {
  const [activeTab, setActiveTab] = useState("All Notifications");

  return (
    <div className={styles.notificationsContainer}>
      <header className={styles.header}>
        <div className={styles.titleArea}>
          <h2>
            <span className={styles.activeTitle}>Notifications</span>
            {activeTab === "Settings" && <span className={styles.fadedTitle}> / Settings</span>}
          </h2>
          <p className={styles.subtitle}>Manage your activity and marketplace updates</p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.markReadBtn}>Mark all as read</button>
          <button 
            className={styles.settingsIconBtn} 
            onClick={() => setActiveTab("Settings")}
          >
            <AiOutlineSetting size={24} />
          </button>
        </div>
      </header>

      <div className={styles.tabContainer}>
        {["All Notifications", "Purchase", "Interests", "Settings"].map((tab) => (
          <button
            key={tab}
            className={`${styles.tabBtn} ${activeTab === tab ? styles.activeTab : ""}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={styles.contentArea}>
        {activeTab !== "Settings" && (
          <div className={styles.notificationsList}>
            {/* Notification 1 */}
            <div className={styles.notifCardSecondary}>
              <div className={styles.cardHeader}>
                <div className={styles.titleGroup}>
                  <FaHammer size={16} color="#4B5563" />
                  <h4>Bid Initiated</h4>
                </div>
                <span className={styles.timeLabel}>Just Now</span>
              </div>
              <div className={styles.cardBody}>
                <p>You have successfully initiated a new bid</p>
              </div>
              <div className={styles.cardFooter}>
                <button className={styles.actionBtnSecondary}>View Details</button>
                <div className={styles.unreadDotBlue}></div>
              </div>
            </div>

            {/* Notification 2 */}
            <div className={styles.notifCardDanger}>
              <div className={styles.cardHeader}>
                <div className={styles.titleGroup}>
                  <FaHeart size={16} color="#EF4444" />
                  <h4>Interest Expressed</h4>
                </div>
                <span className={styles.timeLabel}>35 min ago</span>
              </div>
              <div className={styles.cardBody}>
                <p>You have successfully initiated an interest in "Bulk Aluminum Scrap (10 Tons)".</p>
              </div>
              <div className={styles.cardFooter}>
                <button className={styles.actionBtnDanger}>Message Seller</button>
                <div className={styles.unreadDotBlue}></div>
              </div>
            </div>

            {/* Notification 3 */}
            <div className={styles.notifCardPrimary}>
              <div className={styles.cardHeader}>
                <div className={styles.titleGroup}>
                  <FaCommentAlt size={16} color="#3B82F6" />
                  <h4>New Message</h4>
                </div>
                <span className={styles.timeLabel}>50 min ago</span>
              </div>
              <div className={styles.cardBody}>
                <p>Sarah just sent you a message</p>
              </div>
              <div className={styles.cardFooter}>
                <button className={styles.actionBtnPrimary}>Open Conversation</button>
                <div className={styles.unreadDotBlue}></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "Settings" && (
          <div className={styles.settingsPanel}>
            <h3 className={styles.sectionTitle}>Notification Preferences</h3>
            
            <div className={styles.settingBox}>
              <div className={styles.settingInfo}>
                <h4>Email Notifications</h4>
                <p>Receive email updates about your orders and account</p>
              </div>
              <div className={styles.toggleTrackActive}>
                <div className={styles.toggleThumbActive}></div>
              </div>
            </div>

            <div className={styles.settingBox}>
              <div className={styles.settingInfo}>
                <h4>Push Notifications</h4>
                <p>Get notified about new listings and price drops</p>
              </div>
              <div className={styles.toggleTrackActive}>
                <div className={styles.toggleThumbActive}></div>
              </div>
            </div>

            <div className={styles.settingBox}>
              <div className={styles.settingInfo}>
                <h4>Marketing Emails</h4>
                <p>Receive promotional offers and marketplace updates</p>
              </div>
              <div className={styles.toggleTrackInactive}>
                <div className={styles.toggleThumbInactive}></div>
              </div>
            </div>

            <h3 className={styles.sectionTitle} style={{marginTop: '32px'}}>Email Digest</h3>

            <div className={styles.settingBox}>
              <div className={styles.settingInfo}>
                <h4>Weekly Summary</h4>
                <p>Get a weekly summary of marketplace activity</p>
              </div>
              <div className={styles.toggleTrackInactive}>
                <div className={styles.toggleThumbInactive}></div>
              </div>
            </div>

            <div className={styles.saveBtnWrapper}>
              <button className={styles.saveBtn}>Save Changes</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerNotifications;
