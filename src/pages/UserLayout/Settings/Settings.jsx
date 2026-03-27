import React, { useState } from "react";
import styles from "./Settings.module.css";
import PersonalInfo from "./PersonalInfo";
import Security from "./Security";
import Payment from "./Payment";
import { AiOutlineCamera } from "react-icons/ai";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("PersonalInfo");

  return (
    <div className={styles.settingsContainer}>
      <header className={styles.settingsHeader}>
        <h2><span className={styles.fadedText}>Settings /</span> Profile</h2>
        <div className={styles.headerButtons}>
          <button className={styles.cancelBtn}>Cancel</button>
          <button className={styles.coverBtn}>Change Cover Picture</button>
        </div>
      </header>
      
      <div className={styles.profileBanner}>
        {/* Placeholder for Cover Image generated via CSS bg */}
        <div className={styles.avatarWrapper}>
          <div className={styles.avatarPlaceholder}>
             {/* Using simple user icon placeholder */}
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={styles.avatarIcon}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
             </svg>
          </div>
        </div>
      </div>

      <div className={styles.profileDetailsRow}>
         <div className={styles.profileText}>
           <h3>Amaka Martins</h3>
           <p className={styles.jobTitle}>C.E.O. WasteHub . Buyer</p>
           <p className={styles.contactInfo}>a.martins@gmail.com | 09012345678</p>
         </div>
         <div className={styles.editProfileIcon}>
            <AiOutlineCamera size={24} color="#6B7280" />
         </div>
      </div>

      <div className={styles.tabContainer}>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'PersonalInfo' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('PersonalInfo')}
        >
          Personal Info
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'Security' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('Security')}
        >
          Security
        </button>
        <button 
          className={`${styles.tabBtn} ${activeTab === 'Payment' ? styles.activeTab : ''}`}
          onClick={() => setActiveTab('Payment')}
        >
          Payment
        </button>
      </div>

      <div className={styles.tabContent}>
        {activeTab === "PersonalInfo" && <PersonalInfo />}
        {activeTab === "Security" && <Security />}
        {activeTab === "Payment" && <Payment />}
      </div>
    </div>
  );
};

export default Settings;
