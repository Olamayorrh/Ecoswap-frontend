import React from 'react';
import styles from './Steps.module.css';

const LogisticsStep = ({ formData, setFormData }) => {
    const showPrice = formData.priceType === 'Fixed Price';

    return (
        <div className={styles.stepContainer}>

            {/* Listing Type */}
            <div className={styles.inputGroup}>
                <label className={styles.fieldLabel}>Listing Type</label>
                <div className={styles.radioGroup}>
                    <label className={styles.radioLabel}>
                        <input
                            type="radio"
                            name="priceType"
                            value="Fixed Price"
                            checked={formData.priceType === 'Fixed Price'}
                            onChange={(e) => setFormData({ ...formData, priceType: e.target.value })}
                        />
                        Fixed Price
                    </label>
                    <label className={styles.radioLabel}>
                        <input
                            type="radio"
                            name="priceType"
                            value="Bidding Item"
                            checked={formData.priceType === 'Bidding Item'}
                            onChange={(e) => setFormData({ ...formData, priceType: e.target.value })}
                        />
                        Bidding Item
                    </label>
                </div>
                {!showPrice && (
                    <span className={styles.helperText}>
                        Buyers will submit bids — you can accept the best offer when bidding closes.
                    </span>
                )}
            </div>

            {/* Price (only for Fixed Price) */}
            {showPrice && (
                <div className={styles.inputGroup}>
                    <label className={styles.fieldLabel}>Price (₦)</label>
                    <input
                        type="number"
                        min="0"
                        className={styles.textInput}
                        placeholder="e.g. 15000"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    />
                    <span className={styles.helperText}>Enter price in Nigerian Naira (₦) per unit</span>
                </div>
            )}

            {/* Quantity & Unit */}
            <div className={styles.inputGroup}>
                <label className={styles.fieldLabel}>Quantity / Unit</label>
                <div className={styles.unitInputGroup}>
                    <input
                        type="number"
                        min="0"
                        placeholder="0.00"
                        className={styles.quantityInput}
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    />
                    <select
                        className={styles.unitInput}
                        value={formData.unit}
                        onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    >
                        <option value="">Unit</option>
                        <option value="kg">kg</option>
                        <option value="tons">tons</option>
                        <option value="litres">litres</option>
                        <option value="metres">metres</option>
                        <option value="pieces">pieces</option>
                        <option value="bags">bags</option>
                    </select>
                </div>
            </div>

            {/* Pickup Location */}
            <div className={styles.inputGroup}>
                <label className={styles.fieldLabel}>Pickup Location</label>
                <input
                    type="text"
                    className={styles.textInput}
                    placeholder="e.g. Lagos, Nigeria"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
                <span className={styles.helperText}>Enter the city or address where buyers can pick up the material</span>
            </div>
        </div>
    );
};

export default LogisticsStep;
