import React, { useContext } from "react";
import { userContext } from "../../../context/Context";
import styles from "./Dashboard.module.css";
// We can borrow some stylistic layout logic from the Buyer Dashboard for consistency
import { AiOutlineSetting, AiOutlineInfoCircle, AiOutlineMessage } from "react-icons/ai";
import { BiBox, BiMoney } from "react-icons/bi";
import { HiOutlineLightningBolt } from "react-icons/hi";

const SellerDashboard = () => {
  const { userInfo } = useContext(userContext);

  // Extract first name (default to Sarah if no context)
  const fullName = userInfo?.user?.fullname || "Sarah Jekins";
  const firstName = fullName.split(" ")[0];
  const isFirstLogin = userInfo?.isFirstLogin || false;

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <div className={styles.headerText}>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>
            {isFirstLogin 
              ? `Welcome ${firstName}. Here's what is happening today`
              : `Welcome back ${firstName}. Here's what is happening today`}
          </p>
        </div>
        <div className={styles.headerActions}>
          <button className={styles.btnPrimary}>Add New Listing</button>
          <button className={styles.settingsBtn}>
            <AiOutlineSetting size={28} />
          </button>
        </div>
      </header>

      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <p>Active Listings</p>
            <div className={styles.iconBoxGreen}>
              <BiBox size={20} color="#059669" />
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
            <p>Total Earnings</p>
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
            <p>Pending Offers</p>
            <div className={styles.iconBoxLightGreen}>
              <BiBox size={20} color="#059669" />
            </div>
          </div>
          <div className={styles.statBody}>
            <h2 className={styles.statValue}>08</h2>
            <div className={styles.statFooterRed}>
              <AiOutlineInfoCircle size={14} />
              <span>Requires attention</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.listingsSection}>
        <div className={styles.listingsHeader}>
          <h2 className={styles.activityTitle}>Recent Listing</h2>
          <div className={styles.searchContainer}>
            <input type="text" placeholder="Search Conversation" className={styles.searchInput} />
          </div>
        </div>
        
        <div className={styles.tableWrapper}>
            <table className={styles.ordersTable}>
            <thead>
                <tr>
                  <th>Material Name</th>
                  <th>Category</th>
                  <th>Weight / QTY</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                  <td>HDPE Scraps</td>
                  <td>Plastics</td>
                  <td>5.5 Tons</td>
                  <td>40,000</td>
                  <td><span className={`${styles.statusPill} ${styles.statusInStock}`}>In Stock</span></td>
                  <td><button className={styles.actionBtn}>...</button></td>
                </tr>
                <tr>
                  <td>HDPE Scraps</td>
                  <td>Plastics</td>
                  <td>5.5 Tons</td>
                  <td>40,000</td>
                  <td><span className={`${styles.statusPill} ${styles.statusOutStock}`}>Out of stock</span></td>
                  <td><button className={styles.actionBtn}>...</button></td>
                </tr>
                <tr>
                  <td>HDPE Scraps</td>
                  <td>Plastics</td>
                  <td>5.5 Tons</td>
                  <td>40,000</td>
                  <td><span className={`${styles.statusPill} ${styles.statusLimited}`}>Limited</span></td>
                  <td><button className={styles.actionBtn}>...</button></td>
                </tr>
                <tr>
                  <td>HDPE Scraps</td>
                  <td>Plastics</td>
                  <td>5.5 Tons</td>
                  <td>40,000</td>
                  <td><span className={`${styles.statusPill} ${styles.statusSold}`}>Sold</span></td>
                  <td><button className={styles.actionBtn}>...</button></td>
                </tr>
            </tbody>
            </table>
            
            <div className={styles.tablePagination}>
              <span>Showing 4 of 24 active listings</span>
              <div className={styles.paginationCoords}>
                <button className={styles.pageBtn}>Previous</button>
                <button className={styles.pageBtn}>Next</button>
              </div>
            </div>
        </div>
      </div>

      <div className={styles.bottomCardsRow}>
        <div className={styles.impactCard}>
          <h3>Sustainable Impact</h3>
          <p>Your recycling efforts have diverted massive waste from land fills this year.</p>
          <div className={styles.impactStats}>
            <div className={styles.impactStatGroup}>
              <span className={styles.impactBig}>124.5</span>
            </div>
            <div className={styles.impactStatGroup}>
              <span className={styles.impactBig}>8.2k</span>
            </div>
          </div>
        </div>

        <div className={styles.offerCard}>
          <div className={styles.offerText}>
            <h3>New Buyer Offer!</h3>
            <p>A buyer just made an offer on your product</p>
            <button className={styles.btnPrimary}>View Offer Details</button>
          </div>
          <div className={styles.offerIconBox}>
            <AiOutlineMessage size={32} color="#059669" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
