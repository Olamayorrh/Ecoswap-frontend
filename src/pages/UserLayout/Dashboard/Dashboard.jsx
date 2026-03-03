import React, { useState, useContext } from "react";
import { userContext } from "../../../context/Context";
import styles from "./Dashboard.module.css";
import { AiOutlineSetting, AiOutlineArrowUp, AiOutlineInfoCircle } from "react-icons/ai";
import { BiBox, BiMoney } from "react-icons/bi";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { FaHeart, FaHammer } from "react-icons/fa";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("OrderHistory");
  const { userInfo } = useContext(userContext);

  // Extract first name (default to Amaka if no context)
  const fullName = userInfo?.user?.fullname || "Amaka Martins";
  const firstName = fullName.split(" ")[0];
  const isFirstLogin = userInfo?.isFirstLogin || false;

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>
            {isFirstLogin 
              ? `Welcome ${firstName}. Here's what is happening today`
              : `Welcome back ${firstName}. Here's what is happening today`}
          </p>
        </div>
        <button className={styles.settingsBtn}>
          <AiOutlineSetting size={28} />
        </button>
      </header>

      <div className={styles.statsRow}>
        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <h3>Total Purchases</h3>
            <div className={styles.iconBoxGrid}>
              <BiBox size={24} color="#059669" />
            </div>
          </div>
          <div className={styles.statValue}>24</div>
          <div className={styles.statFooterGreen}>
            <HiOutlineLightningBolt size={14} />
            <span>+12% vs last month</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <h3>Total Spent</h3>
            <div className={styles.iconBoxMoney}>
              <BiMoney size={24} color="#059669" />
            </div>
          </div>
          <div className={styles.statValue}>100,000</div>
          <div className={styles.statFooterGreen}>
            <HiOutlineLightningBolt size={14} />
            <span>Recycling Investments</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statHeader}>
            <h3>Active Orders</h3>
            <div className={styles.iconBoxGavel}>
              <FaHammer size={24} color="#059669" />
            </div>
          </div>
          <div className={styles.statValue}>01</div>
          <div className={styles.statFooterRed}>
            <AiOutlineInfoCircle size={14} />
            <span>In Progress</span>
          </div>
        </div>
      </div>

      <div className={styles.activitySection}>
        <h2 className={styles.activityTitle}>My Activity</h2>
        <p className={styles.activitySubtitle}>Track your purchases and saved items</p>

        <div className={styles.tabContainer}>
          <button
            className={`${styles.tabBtn} ${activeTab === "OrderHistory" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("OrderHistory")}
          >
            Order History
          </button>
          <button
            className={`${styles.tabBtn} ${activeTab === "SavedItems" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("SavedItems")}
          >
            Saved Items
          </button>
        </div>

        <div className={styles.tabContent}>
          {activeTab === "OrderHistory" && (
            <div className={styles.tableWrapper}>
              <table className={styles.ordersTable}>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Item</th>
                    <th>Seller</th>
                    <th>Quantity (kg)</th>
                    <th>Price/kg</th>
                    <th>Total</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>PUR001</td>
                    <td>Industrial Plastic Waste</td>
                    <td>EcoRecycle Co.</td>
                    <td>500</td>
                    <td>$2.5</td>
                    <td>$1250</td>
                    <td>2/20/2026</td>
                    <td><span className={`${styles.statusPill} ${styles.statusCompleted}`}>✔ Completed</span></td>
                    <td className={styles.actionView}>View</td>
                  </tr>
                  <tr>
                    <td>PUR002</td>
                    <td>Cardboard Boxes Bundle</td>
                    <td>Paper Recyclers Inc.</td>
                    <td>200</td>
                    <td>$1.5</td>
                    <td>$300</td>
                    <td>2/18/2026</td>
                    <td><span className={`${styles.statusPill} ${styles.statusCompleted}`}>✔ Completed</span></td>
                    <td className={styles.actionView}>View</td>
                  </tr>
                  <tr>
                    <td>PUR003</td>
                    <td>Aluminum Cans Collection</td>
                    <td>Metal Masters LLC</td>
                    <td>150</td>
                    <td>$3</td>
                    <td>$450</td>
                    <td>2/15/2026</td>
                    <td><span className={`${styles.statusPill} ${styles.statusPending}`}>🕒 Pending</span></td>
                    <td className={styles.actionView}>View</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === "SavedItems" && (
            <div className={styles.savedItemsGrid}>
              {/* Item 1 */}
              <div className={styles.savedCard}>
                <div 
                  className={styles.cardImage} 
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&q=80&w=600')` }}
                ></div>
                <div className={styles.cardBody}>
                  <div className={styles.cardTop}>
                    <h4>Industrial Grade HDPE Plastic Containers</h4>
                    <span className={styles.tagGreen}>Paper</span>
                  </div>
                  <div className={styles.cardDetails}>
                    <p><strong>Quality:</strong> Industrial Grade</p>
                    <p><strong>Location:</strong> Abuja, Nigeria</p>
                  </div>
                  <div className={styles.cardBottom}>
                    <div className={styles.price}>
                      <span className={styles.priceHighlight}>4,500</span>/kg
                    </div>
                    <div className={styles.cardActions}>
                      <FaHeart color="#EF4444" size={20} className={styles.heartIcon} />
                      <button className={styles.viewDetailsBtn}>View Details</button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Item 2 */}
              <div className={styles.savedCard}>
                <div 
                  className={styles.cardImage} 
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1621360841013-c76831f45b54?auto=format&fit=crop&q=80&w=600')` }}
                ></div>
                <div className={styles.cardBody}>
                  <div className={styles.cardTop}>
                    <h4>Copper Wire Scrap</h4>
                    <span className={styles.tagGreen}>Glass</span>
                  </div>
                  <div className={styles.cardDetails}>
                    <p><strong>Quality:</strong> Industrial Grade</p>
                    <p><strong>Location:</strong> Abuja, Nigeria</p>
                  </div>
                  <div className={styles.cardBottom}>
                    <div className={styles.price}>
                      <span className={styles.priceHighlight}>4,500</span>/kg
                    </div>
                    <div className={styles.cardActions}>
                      <FaHeart color="#EF4444" size={20} className={styles.heartIcon} />
                      <button className={styles.viewDetailsBtn}>View Details</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
