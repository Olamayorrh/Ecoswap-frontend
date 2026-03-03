import React from 'react';
import styles from './Steps.module.css';

const LogisticsStep = ({ formData, setFormData }) => {
    return (
        <div className={styles.stepContainer}>
            <div className={styles.inputGroup}>
                <label>Details and Quantity</label>
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
            </div>

            <div className={styles.inputGroup}>
                <label>Price</label>
                <input
                    type="text"
                    placeholder="Enter Price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
            </div>

            <div className={styles.inputGroup}>
                <label>Quantity / Unit</label>
                <div className={styles.unitInputGroup}>
                    <input
                        type="text"
                        placeholder="0.00"
                        className={styles.quantityInput}
                        value={formData.quantity}
                        onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    />
                    <input
                        type="text"
                        placeholder="Unit"
                        className={styles.unitInput}
                        value={formData.unit}
                        onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    />
                </div>
            </div>

            <div className={styles.inputGroup}>
                <label>Pickup Location</label>
                <input
                    type="text"
                    placeholder="City, Country"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
            </div>
        </div>
    );
};

export default LogisticsStep;
