import React, { useContext, useState, useEffect, useCallback } from "react";
import { userContext } from "../../../context/Context";
import styles from "./Dashboard.module.css";
import { AiOutlineSetting, AiOutlineInfoCircle, AiOutlineMessage } from "react-icons/ai";
import { BiBox, BiMoney } from "react-icons/bi";
import { HiOutlineLightningBolt } from "react-icons/hi";

const SellerDashboard = () => {
  const { userInfo, fetchListings } = useContext(userContext);

  // Extract first name from logged-in user
  const fullName = userInfo?.user?.fullname || "";
  const firstName = fullName.split(" ")[0] || "User";
  const isFirstLogin = userInfo?.isFirstLogin || false;

  // ── Listings state ─────────────────────────────────────────────
  const [listings, setListings]         = useState([]);
  const [isLoadingList, setIsLoadingList] = useState(false);
  const [listError, setListError]       = useState(null);
  const [searchInput, setSearchInput]   = useState("");
  const [activeSearch, setActiveSearch] = useState("");

  // ── Fetch listings whenever activeSearch changes ───────────────
  const loadListings = useCallback(async (term) => {
    setIsLoadingList(true);
    setListError(null);
    try {
      const result = await fetchListings(term ? { search: term } : {});
      if (result?.success) {
        setListings(result.data || []);
      } else {
        setListError("Failed to load listings.");
      }
    } catch {
      setListError("Could not connect to server.");
    } finally {
      setIsLoadingList(false);
    }
  }, [fetchListings]);

  useEffect(() => {
    loadListings(activeSearch);
  }, [activeSearch, loadListings]);

  // ── Search handler ─────────────────────────────────────────────
  const handleSearch = () => {
    setActiveSearch(searchInput.trim());
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  // ── Derive stat counts from live data ───────────────────────────
  const activeCount  = listings.length;

  // ── Status pill helper (we derive a simple status from data) ───
  const getStatusStyle = (listing) => {
    if (!listing.quantity) return styles.statusOutStock;
    if (listing.quantity <= 10) return styles.statusLimited;
    return styles.statusInStock;
  };
  const getStatusLabel = (listing) => {
    if (!listing.quantity) return "Out of Stock";
    if (listing.quantity <= 10) return "Limited";
    return "In Stock";
  };

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
            <h2 className={styles.statValue}>{activeCount}</h2>
            <div className={styles.statFooterGreen}>
              <HiOutlineLightningBolt size={14} />
              <span>Total published</span>
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
            <h2 className={styles.statValue}>—</h2>
            <div className={styles.statFooterGreen}>
              <HiOutlineLightningBolt size={14} />
              <span>Coming soon</span>
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
            <h2 className={styles.statValue}>—</h2>
            <div className={styles.statFooterRed}>
              <AiOutlineInfoCircle size={14} />
              <span>Coming soon</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.listingsSection}>
        <div className={styles.listingsHeader}>
          <h2 className={styles.activityTitle}>Recent Listing</h2>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search by name or category"
              className={styles.searchInput}
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={handleSearchKeyDown}
            />
            <button
              className={styles.btnPrimary}
              style={{ marginLeft: "8px", padding: "8px 16px", fontSize: "14px" }}
              onClick={handleSearch}
            >
              Search
            </button>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          {isLoadingList ? (
            <div style={{ padding: "32px", textAlign: "center", color: "#6b7280" }}>
              Loading listings…
            </div>
          ) : listError ? (
            <div style={{ padding: "32px", textAlign: "center", color: "#ef4444" }}>
              {listError}
            </div>
          ) : listings.length === 0 ? (
            <div style={{ padding: "32px", textAlign: "center", color: "#6b7280" }}>
              {activeSearch
                ? `No listings found for "${activeSearch}".`
                : "No listings published yet. Click 'Add New Listing' to get started!"}
            </div>
          ) : (
            <>
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
                  {listings.map((listing) => (
                    <tr key={listing._id}>
                      <td>{listing.title}</td>
                      <td>{listing.category || "—"}</td>
                      <td>
                        {listing.quantity
                          ? `${listing.quantity} ${listing.unit || ""}`
                          : "—"}
                      </td>
                      <td>
                        {listing.price ? `₦${listing.price.toLocaleString()}` : "Bidding"}
                      </td>
                      <td>
                        <span
                          className={`${styles.statusPill} ${getStatusStyle(listing)}`}
                        >
                          {getStatusLabel(listing)}
                        </span>
                      </td>
                      <td>
                        <button className={styles.actionBtn}>...</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className={styles.tablePagination}>
                <span>Showing {listings.length} listing{listings.length !== 1 ? "s" : ""}</span>
              </div>
            </>
          )}
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
