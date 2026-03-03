import React from "react";
import styles from "./SettingsForms.module.css";

const PersonalInfo = () => {
  return (
    <div className={styles.formSection}>
      <h3 className={styles.sectionTitle}>Personal Information</h3>
      
      <div className={styles.inputRow}>
        <div className={styles.inputGroup}>
          <label>First Name</label>
          <input type="text" defaultValue="Amaka" />
        </div>
        <div className={styles.inputGroup}>
          <label>Last Name</label>
          <input type="text" defaultValue="Martins" />
        </div>
      </div>

      <h3 className={styles.sectionTitle}>Contact Information</h3>
      
      <div className={styles.inputGroupFull}>
        <label>Email</label>
        <input type="email" defaultValue="a.martins@gmail.com" />
      </div>

      <div className={styles.inputGroupFull}>
        <label>Phone Number</label>
        <input type="text" defaultValue="09012345678" />
      </div>

      <div className={styles.inputGroupFull}>
        <label>Company (Optional)</label>
        <input type="text" defaultValue="WasteHub" />
      </div>

      <h3 className={styles.sectionTitle}>Address Information</h3>

      <div className={styles.inputGroupFull}>
        <label>Street Number</label>
        <input type="text" defaultValue="123 Eco Street" />
      </div>

      <div className={styles.inputRow}>
        <div className={styles.inputGroup}>
          <label>City</label>
          <input type="text" defaultValue="Abuja" />
        </div>
        <div className={styles.inputGroup}>
          <label>State</label>
          <input type="text" defaultValue="F.C.T" />
        </div>
      </div>

      <div className={styles.inputGroupFull}>
        <label>Country</label>
        <select defaultValue="Nigeria">
          <option value="Nigeria">Nigeria</option>
        </select>
      </div>

      <div className={styles.inputGroupFull}>
        <label>Bio (Optional)</label>
        <textarea rows={4} placeholder="Tell us more about yourself and your goals..."></textarea>
      </div>

      <div className={styles.saveBtnWrapper}>
        <button className={styles.saveBtn}>Save Changes</button>
      </div>
    </div>
  );
};

export default PersonalInfo;
