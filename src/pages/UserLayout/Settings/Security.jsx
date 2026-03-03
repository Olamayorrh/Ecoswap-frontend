import React from "react";
import styles from "./SettingsForms.module.css";

const Security = () => {
  return (
    <div className={styles.formSection}>
      <h3 className={styles.sectionTitle}>Password & Security</h3>
      
      <div className={styles.securityBox}>
        <div className={styles.securityInfo}>
          <h4>Current Password</h4>
          <p>****************</p>
        </div>
        <button className={styles.actionBtn}>Change Password</button>
      </div>

      <h3 className={styles.sectionTitle}>Two-Factor Authentication</h3>
      
      <div className={styles.securityBox}>
        <div className={styles.securityInfo}>
          <h4>Two-Factor Authentication</h4>
          <p>Add an extra layer of security to your account</p>
        </div>
        <div className={styles.toggleSwitch}>
          {/* Visual toggle switch placeholder */}
          <div className={styles.toggleTrack}>
            <div className={styles.toggleThumb}></div>
          </div>
        </div>
      </div>

      <h3 className={styles.sectionTitle}>Active Sessions</h3>
      
      <div className={styles.securityBox}>
        <div className={styles.securityInfo}>
          <h4>Chrome on MacOS</h4>
          <p>San Francisco, CA • Active now</p>
        </div>
        <button className={styles.actionBtn}>Revoke</button>
      </div>
      
      <div className={styles.saveBtnWrapper}>
         <button className={styles.saveBtn}>Save Changes</button>
      </div>
    </div>
  );
};

export default Security;
