import React, { useContext } from "react";
import styles from "./Settings.module.css";
import { userContext } from "../../../context/Context";
import { AiOutlineEdit } from "react-icons/ai";
import { BiCartAlt, BiMoney, BiCheckCircle } from "react-icons/bi";
import { HiOutlineLightningBolt } from "react-icons/hi";

const Settings = () => {
  const { userInfo } = useContext(userContext);
  const fullName = userInfo?.user?.fullname || "Sarah Jekins";
  
  return (
    <div className={styles.settingsContainer}>
      <header className={styles.settingsHeader}>
        <h2><span className={styles.fadedText}>Settings /</span> Profile</h2>
        <button className={styles.btnPrimary}>Edit Profile</button>
      </header>
      
      <div className={styles.profileBanner}>
        {/* Placeholder for Cover Image generated via CSS bg */}
        <div className={styles.avatarWrapper}>
          <div className={styles.avatarPlaceholder}>
             {/* Using simple user icon placeholder */}
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.avatarIcon}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
             </svg>
             <div className={styles.verifiedBadge}>
                <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
             </div>
          </div>
        </div>
      </div>

      <div className={styles.profileDetailsRow}>
         <div className={styles.profileText}>
           <h3>{fullName}</h3>
           <p className={styles.jobTitle}>Operations Manager . Verified Member</p>
           <p className={styles.contactInfo}>s.jekins@gmail.com | 09012345678</p>
         </div>
         <div className={styles.editProfileIcon}>
            <AiOutlineEdit size={24} color="#6B7280" />
         </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.activitySummarySection}>
        <h3 className={styles.sectionTitle}>Activity Summary</h3>
        
        <div className={styles.statsRow}>
          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <p>Total Orders</p>
              <div className={styles.iconBoxLightGreen}>
                <BiCartAlt size={20} color="#059669" />
              </div>
            </div>
            <div className={styles.statBody}>
              <h2 className={styles.statValue}>24</h2>
              <div className={styles.statFooterGreen}>
                <HiOutlineLightningBolt size={14} />
                <span>+12% vs last month</span>
              </div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <p>Total Balance</p>
              <div className={styles.iconBoxGreen}>
                <BiMoney size={20} color="#059669" />
              </div>
            </div>
            <div className={styles.statBody}>
              <h2 className={styles.statValue}>120,000</h2>
              <div className={styles.statFooterGreen}>
                <HiOutlineLightningBolt size={14} />
                <span>50,000 (this month)</span>
              </div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statHeader}>
              <p>Completed</p>
              <div className={styles.iconBoxGreen}>
                <BiCheckCircle size={20} color="#059669" />
              </div>
            </div>
            <div className={styles.statBody}>
              <h2 className={styles.statValue}>08</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
