import React from 'react';
import styles from './Steps.module.css';

const ReviewUploadStep = ({ formData }) => {
    return (
        <div className={styles.stepContainer}>
            <div className={styles.inputGroup}>
                <label>Review Your Listing Details</label>

                <div className={styles.reviewBox}>
                    <p><strong>Title:</strong> {formData.title || 'Not provided'}</p>
                    <p><strong>Category:</strong> {formData.category || 'Not provided'}</p>
                    <p><strong>Grade:</strong> {formData.grade || 'Not provided'}</p>
                    <p><strong>Price Type:</strong> {formData.priceType}</p>
                    {formData.priceType === 'Fixed Price' && (
                        <p><strong>Price:</strong> ₦{formData.price} per {formData.unit}</p>
                    )}
                    <p><strong>Quantity:</strong> {formData.quantity} {formData.unit}</p>
                    <p><strong>Location:</strong> {formData.location || 'Not provided'}</p>
                </div>

                <div className={styles.imagePreviews}>
                    {formData.images && formData.images.length > 0 ? (
                        formData.images.map((file, i) => (
                             <img key={i} src={URL.createObjectURL(file)} className={styles.previewBox} alt="Preview" style={{objectFit: 'cover'}} />
                        ))
                    ) : (
                        <p style={{color: '#999', fontSize: '1.2rem'}}>No images attached.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReviewUploadStep;
