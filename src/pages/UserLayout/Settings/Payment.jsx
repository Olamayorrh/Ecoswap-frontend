import React from "react";
import styles from "./SettingsForms.module.css";

const Payment = () => {
  return (
    <div className={styles.formSection}>
      <h3 className={styles.sectionTitle}>Payment Methods</h3>
      
      <div className={styles.paymentBox}>
        <div className={styles.paymentInfo}>
          <h4>•••• •••• •••• 4242</h4>
          <p>Expires 12/2028</p>
        </div>
        <div className={styles.paymentActions}>
          <button className={styles.primaryActionBtn}>Edit</button>
          <button className={styles.actionBtn}>Remove</button>
        </div>
      </div>

      <button className={styles.addMethodBtn}>Add Payment Method</button>

      <h3 className={styles.sectionTitle} style={{marginTop: '40px'}}>Billing Address</h3>
      
      <div className={styles.billingBox}>
        <div className={styles.billingInfo}>
          <h4>Amaka Martins</h4>
          <p>123 Eco Street</p>
          <p>Abuja, F.C.T</p>
          <p>Nigeria</p>
        </div>
      </div>

      <button className={styles.addMethodBtn}>Update Billing Address</button>
      
      <div className={styles.saveBtnWrapper}>
         <button className={styles.saveBtn}>Save Changes</button>
      </div>
    </div>
  );
};

export default Payment;
