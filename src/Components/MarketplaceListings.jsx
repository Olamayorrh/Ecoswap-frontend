import React from 'react';
import { MapPin, Weight, ArrowRight, Search, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';
import './MarketplaceListings.css';

const mockListings = [
  {
    id: 1,
    title: 'PET Plastic Bottles',
    category: 'Plastics',
    price: '₦4,500',
    priceUnit: '/kg',
    weight: '800kg available',
    location: 'Lagos, NG',
    status: 'In Stock',
    statusColor: 'success',
    image: 'https://images.unsplash.com/photo-1605600611284-195205ef91b1?auto=format&fit=crop&w=600&q=80',
    seller: 'GreenCycle Ltd',
  },
  {
    id: 2,
    title: 'Scrap Metal (Mixed)',
    category: 'Metals',
    price: '₦7,200',
    priceUnit: '/kg',
    weight: '2,400kg available',
    location: 'Kano, NG',
    status: 'In Stock',
    statusColor: 'success',
    image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&w=600&q=80',
    seller: 'MetalWorks NG',
  },
  {
    id: 3,
    title: 'Cardboard & Paper',
    category: 'Paper',
    price: '₦1,800',
    priceUnit: '/kg',
    weight: '500kg available',
    location: 'Abuja, NG',
    status: 'Limited',
    statusColor: 'warning',
    image: 'https://images.unsplash.com/photo-1611735341450-74d61e660ad2?auto=format&fit=crop&w=600&q=80',
    seller: 'PaperLoop Co.',
  },
  {
    id: 4,
    title: 'HDPE Plastic Scrap',
    category: 'Plastics',
    price: '₦5,000',
    priceUnit: '/kg',
    weight: '1,200kg available',
    location: 'Port Harcourt, NG',
    status: 'Out of Stock',
    statusColor: 'danger',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=600&q=80',
    seller: 'EcoResin NG',
  },
];

const MarketplaceListings = () => {
  return (
    <section className="marketplace-section">
      <div className="container marketplace-inner">
        {/* Header */}
        <div className="marketplace-header">
          <div className="marketplace-header-text">
            <span className="section-eyebrow">Marketplace</span>
            <h2 className="section-title">Latest Marketplace Listings</h2>
            <p className="section-subtitle">
              Available high-quality recycled materials from verified sources
            </p>
          </div>

          <div className="marketplace-header-actions">
            <div className="search-bar">
              <Search size={16} className="search-icon" />
              <input type="text" placeholder="Search materials..." />
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="listings-grid">
          {mockListings.map(listing => (
            <div key={listing.id} className="listing-card">
              <div className="listing-image-wrapper">
                <img
                  src={listing.image}
                  alt={listing.title}
                  className="listing-img"
                  referrerPolicy="no-referrer"
                />
                <span className={`status-badge status-${listing.statusColor}`}>
                  {listing.status}
                </span>
                <span className="category-pill">{listing.category}</span>
              </div>

              <div className="listing-body">
                <div className="listing-top-row">
                  <h3 className="listing-title">{listing.title}</h3>
                  <span className="listing-price">
                    {listing.price}<span className="price-unit">{listing.priceUnit}</span>
                  </span>
                </div>

                <p className="listing-seller">By {listing.seller}</p>

                <div className="listing-meta">
                  <div className="meta-item">
                    <Weight size={13} />
                    <span>{listing.weight}</span>
                  </div>
                  <div className="meta-item">
                    <MapPin size={13} />
                    <span>{listing.location}</span>
                  </div>
                </div>

                <Link
                  to="/signin"
                  className={`btn-view-details${listing.statusColor === 'danger' ? ' btn-view-disabled' : ''}`}
                >
                  View Details <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View all */}
        <div className="view-all-wrapper">
          <Link to="/signup" className="btn-view-all">
            View All Marketplace <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default MarketplaceListings;
