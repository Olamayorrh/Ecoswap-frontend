import React, { useState, useContext, useEffect, useCallback } from "react";
import { userContext } from "../../../context/Context";
import styles from "./BuyerListing.module.css";
import {
  AiOutlineSearch,
  AiOutlineClose,
  AiOutlineEnvironment,
  AiOutlineDown,
  AiOutlineUp,
} from "react-icons/ai";
import { BiBox } from "react-icons/bi";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { HiOutlineAdjustments } from "react-icons/hi";

const CATEGORIES = [
  "All",
  "Plastic",
  "Metal",
  "Paper",
  "Glass",
  "Electronic",
  "Rubber",
  "Wood",
  "Textile",
  "Chemical",
  "Organic",
  "Other",
];

const GRADES = ["All", "Sorted/Clean", "Unsorted/Mixed", "Industrial Grade"];
const LISTING_TYPES = [
  { value: "All",     label: "All Types" },
  { value: "fixed",   label: "Fixed Price" },
  { value: "bidding", label: "Open Bidding" },
];
const SORT_OPTIONS = [
  { value: "newest",    label: "Newest First" },
  { value: "price_asc", label: "Price: Low to High" },
  { value: "price_desc", label: "Price: High to Low" },
];

const API_BASE = import.meta.env.VITE_API_URL || "https://node-server-l5mm.onrender.com";

const BuyerListing = () => {
  const { fetchListings } = useContext(userContext);

  /* ── Filters ─────────────────────────────────────────────────── */
  const [search,      setSearch]      = useState("");
  const [category,    setCategory]    = useState("All");
  const [location,    setLocation]    = useState("");
  const [minPrice,    setMinPrice]    = useState("");
  const [maxPrice,    setMaxPrice]    = useState("");
  const [listingType, setListingType] = useState("All");
  const [grade,       setGrade]       = useState("All");
  const [sortBy,      setSortBy]      = useState("newest");

  /* ── UI state ────────────────────────────────────────────────── */
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    location: true,
    grade: true,
    type: true,
  });
  const toggleSection = (key) =>
    setExpandedSections((p) => ({ ...p, [key]: !p[key] }));

  /* ── Listings state ──────────────────────────────────────────── */
  const [listings,    setListings]    = useState([]);
  const [isLoading,   setIsLoading]   = useState(false);
  const [error,       setError]       = useState(null);

  /* ── Wishlist ────────────────────────────────────────────────── */
  const [wishlist, setWishlist] = useState([]);
  const toggleWishlist = (id) =>
    setWishlist((p) => p.includes(id) ? p.filter((x) => x !== id) : [...p, id]);

  /* ── Detail modal ────────────────────────────────────────────── */
  const [selectedItem, setSelectedItem] = useState(null);

  /* ── Load listings ───────────────────────────────────────────── */
  const loadListings = useCallback(async (filters = {}) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await fetchListings(filters);
      if (result?.success) setListings(result.data || []);
      else setError("Failed to load listings.");
    } catch {
      setError("Could not connect to server. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  }, [fetchListings]);

  useEffect(() => { loadListings({}); }, [loadListings]);

  /* ── Build filters object ────────────────────────────────────── */
  const buildFilters = (overrides = {}) => {
    const base = {};
    if (search.trim())       base.search      = search.trim();
    if (category !== "All")  base.category    = category;
    if (location.trim())     base.location    = location.trim();
    if (minPrice)            base.minPrice    = minPrice;
    if (maxPrice)            base.maxPrice    = maxPrice;
    if (listingType !== "All") base.listingType = listingType;
    if (grade !== "All")     base.grade       = grade;
    return { ...base, ...overrides };
  };

  const applyFilters = () => loadListings(buildFilters());

  const clearFilters = () => {
    setSearch(""); setCategory("All"); setLocation("");
    setMinPrice(""); setMaxPrice(""); setListingType("All"); setGrade("All");
    loadListings({});
  };

  const handleSearchKeyDown = (e) => { if (e.key === "Enter") applyFilters(); };

  /* ── Sorting (client-side) ───────────────────────────────────── */
  const sortedListings = [...listings].sort((a, b) => {
    if (sortBy === "price_asc")  return (a.price ?? Infinity) - (b.price ?? Infinity);
    if (sortBy === "price_desc") return (b.price ?? 0) - (a.price ?? 0);
    return new Date(b.createdAt) - new Date(a.createdAt); // newest
  });

  /* ── Image helper ────────────────────────────────────────────── */
  const getImageUrl = (listing) => {
    if (listing.images?.length > 0) return `${API_BASE}/${listing.images[0]}`;
    return null;
  };

  /* ── Status helpers ──────────────────────────────────────────── */
  const getStatusStyle = (l) => {
    if (!l.quantity) return styles.statusOutStock;
    if (l.quantity <= 10) return styles.statusLimited;
    return styles.statusInStock;
  };
  const getStatusLabel = (l) => {
    if (!l.quantity) return "Out of Stock";
    if (l.quantity <= 10) return "Limited";
    return "In Stock";
  };

  const activeFilterCount = [
    category !== "All",
    location.trim() !== "",
    minPrice !== "",
    maxPrice !== "",
    listingType !== "All",
    grade !== "All",
  ].filter(Boolean).length;

  /* ── Section header helper ───────────────────────────────────── */
  const SectionHeader = ({ label, sectionKey }) => (
    <button
      className={styles.sectionHeader}
      onClick={() => toggleSection(sectionKey)}
    >
      <span>{label}</span>
      {expandedSections[sectionKey] ? <AiOutlineUp size={14} /> : <AiOutlineDown size={14} />}
    </button>
  );

  return (
    <div className={styles.pageContainer}>
      {/* ── Page header ──────────────────────────────────────────── */}
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Browse Listings</h1>
          <p className={styles.pageSubtitle}>
            Discover recyclable materials and waste products from verified sellers
          </p>
        </div>
      </div>

      {/* ── Search bar (full width) ───────────────────────────────── */}
      <div className={styles.searchBar}>
        <AiOutlineSearch size={18} className={styles.searchIcon} />
        <input
          type="text"
          placeholder="Search by material name, description..."
          className={styles.searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleSearchKeyDown}
        />
        {search && (
          <button className={styles.clearSearch} onClick={() => { setSearch(""); loadListings(buildFilters({ search: undefined })); }}>
            <AiOutlineClose size={14} />
          </button>
        )}
        <button className={styles.searchBtn} onClick={applyFilters}>Search</button>
      </div>

      {/* ── Body: sidebar filters + results grid ──────────────────── */}
      <div className={styles.body}>

        {/* ── LEFT: Filter sidebar ─────────────────────────────────── */}
        <aside className={styles.filterSidebar}>
          <div className={styles.filterHeader}>
            <HiOutlineAdjustments size={18} />
            <span>Filters</span>
            {activeFilterCount > 0 && (
              <span className={styles.filterBadge}>{activeFilterCount}</span>
            )}
          </div>

          {/* Category */}
          <div className={styles.filterSection}>
            <SectionHeader label="Category" sectionKey="category" />
            {expandedSections.category && (
              <div className={styles.categoryList}>
                {CATEGORIES.map((cat) => (
                  <label key={cat} className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="category"
                      value={cat}
                      checked={category === cat}
                      onChange={() => {
                        setCategory(cat);
                        loadListings(buildFilters({ category: cat === "All" ? undefined : cat }));
                      }}
                      className={styles.radioInput}
                    />
                    <span className={styles.radioCustom} />
                    <span className={styles.radioText}>{cat}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Price Range */}
          <div className={styles.filterSection}>
            <SectionHeader label="Price Range (₦)" sectionKey="price" />
            {expandedSections.price && (
              <div className={styles.priceRange}>
                <input
                  type="number"
                  placeholder="Min"
                  className={styles.priceInput}
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  min="0"
                />
                <span className={styles.priceDash}>—</span>
                <input
                  type="number"
                  placeholder="Max"
                  className={styles.priceInput}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  min="0"
                />
              </div>
            )}
          </div>

          {/* Location */}
          <div className={styles.filterSection}>
            <SectionHeader label="Location" sectionKey="location" />
            {expandedSections.location && (
              <div className={styles.locationWrapper}>
                <AiOutlineEnvironment size={15} className={styles.locationIcon} />
                <input
                  type="text"
                  placeholder="City, State..."
                  className={styles.locationInput}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            )}
          </div>

          {/* Grade */}
          <div className={styles.filterSection}>
            <SectionHeader label="Material Grade" sectionKey="grade" />
            {expandedSections.grade && (
              <div className={styles.categoryList}>
                {GRADES.map((g) => (
                  <label key={g} className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="grade"
                      value={g}
                      checked={grade === g}
                      onChange={() => setGrade(g)}
                      className={styles.radioInput}
                    />
                    <span className={styles.radioCustom} />
                    <span className={styles.radioText}>{g}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Listing Type */}
          <div className={styles.filterSection}>
            <SectionHeader label="Listing Type" sectionKey="type" />
            {expandedSections.type && (
              <div className={styles.categoryList}>
                {LISTING_TYPES.map((t) => (
                  <label key={t.value} className={styles.radioLabel}>
                    <input
                      type="radio"
                      name="listingType"
                      value={t.value}
                      checked={listingType === t.value}
                      onChange={() => setListingType(t.value)}
                      className={styles.radioInput}
                    />
                    <span className={styles.radioCustom} />
                    <span className={styles.radioText}>{t.label}</span>
                  </label>
                ))}
              </div>
            )}
          </div>

          {/* Apply / Clear */}
          <button className={styles.applyBtn} onClick={applyFilters}>
            Apply Filters
          </button>
          {activeFilterCount > 0 && (
            <button className={styles.clearBtn} onClick={clearFilters}>
              Clear All Filters
            </button>
          )}
        </aside>

        {/* ── RIGHT: Results ────────────────────────────────────────── */}
        <div className={styles.resultsPane}>

          {/* Results bar */}
          <div className={styles.resultsBar}>
            <span className={styles.resultsCount}>
              {isLoading
                ? "Loading…"
                : `${sortedListings.length} listing${sortedListings.length !== 1 ? "s" : ""} found`}
            </span>
            <div className={styles.sortRow}>
              <label className={styles.sortLabel}>Sort:</label>
              <select
                className={styles.sortSelect}
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* States */}
          {isLoading ? (
            <div className={styles.centeredState}>
              <div className={styles.spinner} />
              <p>Loading listings…</p>
            </div>
          ) : error ? (
            <div className={styles.centeredState}>
              <BiBox size={56} color="#D1D5DB" />
              <p className={styles.errorText}>{error}</p>
              <button className={styles.retryBtn} onClick={() => loadListings({})}>
                Retry
              </button>
            </div>
          ) : sortedListings.length === 0 ? (
            <div className={styles.centeredState}>
              <BiBox size={72} color="#D1D5DB" />
              <h3 className={styles.emptyTitle}>No listings found</h3>
              <p className={styles.emptyText}>
                Try adjusting your filters or search term.
              </p>
              <button className={styles.clearBtn} onClick={clearFilters}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div className={styles.listingsGrid}>
              {sortedListings.map((listing) => {
                const imgUrl    = getImageUrl(listing);
                const inWishlist = wishlist.includes(listing._id);
                return (
                  <div key={listing._id} className={styles.card}>
                    {/* Image */}
                    <div
                      className={styles.cardImg}
                      style={imgUrl ? { backgroundImage: `url('${imgUrl}')` } : {}}
                    >
                      {!imgUrl && (
                        <div className={styles.noImg}>
                          <BiBox size={36} color="#9CA3AF" />
                        </div>
                      )}
                      <span className={`${styles.statusPill} ${getStatusStyle(listing)}`}>
                        {getStatusLabel(listing)}
                      </span>
                      <button
                        className={styles.heartBtn}
                        onClick={() => toggleWishlist(listing._id)}
                        title={inWishlist ? "Remove from saved" : "Save item"}
                      >
                        {inWishlist
                          ? <FaHeart color="#EF4444" size={16} />
                          : <FaRegHeart color="#fff" size={16} />}
                      </button>
                    </div>

                    {/* Body */}
                    <div className={styles.cardBody}>
                      <div className={styles.cardTopRow}>
                        <h4 className={styles.cardTitle}>{listing.title}</h4>
                        {listing.category && (
                          <span className={styles.catTag}>{listing.category}</span>
                        )}
                      </div>

                      <div className={styles.cardMeta}>
                        {listing.grade && (
                          <p className={styles.metaLine}>
                            <span className={styles.metaKey}>Quality:</span> {listing.grade}
                          </p>
                        )}
                        {listing.quantity != null && (
                          <p className={styles.metaLine}>
                            <span className={styles.metaKey}>Amount:</span>{" "}
                            {listing.quantity.toLocaleString()} {listing.unit || ""}
                          </p>
                        )}
                        {listing.location?.address && (
                          <p className={styles.metaLine}>
                            <AiOutlineEnvironment size={13} style={{ marginRight: 3, flexShrink: 0 }} />
                            {listing.location.address}
                          </p>
                        )}
                      </div>

                      {listing.listingType === "bidding" && (
                        <span className={styles.biddingTag}>Open Bidding</span>
                      )}

                      <div className={styles.cardFooter}>
                        <div>
                          {listing.listingType === "bidding" ? (
                            <span className={styles.priceBig}>Bidding</span>
                          ) : (
                            <>
                              <span className={styles.priceBig}>
                                ₦{listing.price?.toLocaleString() ?? "—"}
                              </span>
                              {listing.unit && (
                                <span className={styles.priceUnit}>/{listing.unit}</span>
                              )}
                            </>
                          )}
                        </div>
                        <button
                          className={styles.viewBtn}
                          onClick={() => setSelectedItem(listing)}
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── Detail Modal ─────────────────────────────────────────── */}
      {selectedItem && (
        <div className={styles.overlay} onClick={() => setSelectedItem(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalCloseBtn} onClick={() => setSelectedItem(null)}>
              <AiOutlineClose size={18} />
            </button>

            {getImageUrl(selectedItem) && (
              <div
                className={styles.modalImg}
                style={{ backgroundImage: `url('${getImageUrl(selectedItem)}')` }}
              />
            )}

            <div className={styles.modalBody}>
              <div className={styles.modalTopRow}>
                <h2 className={styles.modalTitle}>{selectedItem.title}</h2>
                {selectedItem.category && (
                  <span className={styles.catTag}>{selectedItem.category}</span>
                )}
              </div>

              {selectedItem.description && (
                <p className={styles.modalDesc}>{selectedItem.description}</p>
              )}

              <div className={styles.detailTable}>
                {selectedItem.grade && (
                  <div className={styles.detailRow}>
                    <span className={styles.detailKey}>Grade / Quality</span>
                    <span className={styles.detailVal}>{selectedItem.grade}</span>
                  </div>
                )}
                {selectedItem.quantity != null && (
                  <div className={styles.detailRow}>
                    <span className={styles.detailKey}>Available Amount</span>
                    <span className={styles.detailVal}>
                      {selectedItem.quantity.toLocaleString()} {selectedItem.unit || ""}
                    </span>
                  </div>
                )}
                {selectedItem.location?.address && (
                  <div className={styles.detailRow}>
                    <span className={styles.detailKey}>Location</span>
                    <span className={styles.detailVal}>{selectedItem.location.address}</span>
                  </div>
                )}
                <div className={styles.detailRow}>
                  <span className={styles.detailKey}>Listing Type</span>
                  <span className={styles.detailVal}>
                    {selectedItem.listingType === "bidding" ? "Open Bidding" : "Fixed Price"}
                  </span>
                </div>
                <div className={styles.detailRow}>
                  <span className={styles.detailKey}>Price</span>
                  <span className={`${styles.detailVal} ${styles.detailPriceVal}`}>
                    {selectedItem.listingType === "bidding"
                      ? "Open Bidding"
                      : `₦${selectedItem.price?.toLocaleString() ?? "—"}${selectedItem.unit ? `/${selectedItem.unit}` : ""}`}
                  </span>
                </div>
              </div>

              <div className={styles.modalActions}>
                <button className={styles.contactBtn}>Contact Seller</button>
                <button
                  className={styles.saveBtn}
                  onClick={() => toggleWishlist(selectedItem._id)}
                >
                  {wishlist.includes(selectedItem._id)
                    ? <><FaHeart color="#EF4444" size={14} /> Saved</>
                    : <><FaRegHeart size={14} /> Save Item</>}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyerListing;
