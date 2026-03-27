import React from 'react';
import styles from './Steps.module.css';
import { BsStars } from 'react-icons/bs';

const ReviewUploadStep = ({ formData }) => {
    const imageFiles = Array.isArray(formData.images) ? formData.images : [];

    return (
        <div className={styles.stepContainer}>
            <div className={styles.inputGroup}>
                <label className={styles.fieldLabel}>
                    Review Your Listing Details
                    {formData.aiApplied && (
                        <span className={styles.aiBadge}>
                            <BsStars size={11} /> Gemini AI assisted
                        </span>
                    )}
                </label>

                <div className={styles.reviewBox}>
                    <p><strong>Title</strong> {formData.title || 'Not provided'}</p>
                    <p><strong>Category</strong> {formData.category || 'Not provided'}</p>
                    <p><strong>Grade</strong> {formData.grade || 'Not provided'}</p>
                    <p><strong>Listing Type</strong> {formData.priceType}</p>
                    {formData.priceType === 'Fixed Price' && (
                        <p><strong>Price</strong> ₦{formData.price || '—'} per {formData.unit || '—'}</p>
                    )}
                    <p><strong>Quantity</strong> {formData.quantity || '—'} {formData.unit || ''}</p>
                    <p><strong>Location</strong> {formData.location || 'Not provided'}</p>
                    {formData.description && (
                        <div>
                            <p><strong>Description</strong></p>
                            <div className={styles.reviewDescriptionBox}>{formData.description}</div>
                        </div>
                    )}
                </div>

                {/* Image Thumbnails */}
                {imageFiles.length > 0 && (
                    <div className={styles.imagePreviews}>
                        {imageFiles.map((file, i) => (
                            file instanceof File ? (
                                <img
                                    key={i}
                                    src={URL.createObjectURL(file)}
                                    className={styles.previewBox}
                                    alt={`Material image ${i + 1}`}
                                />
                            ) : null
                        ))}
                    </div>
                )}
                {imageFiles.length === 0 && (
                    <p style={{ color: '#aaa', fontSize: '1.3rem' }}>No images attached.</p>
                )}
            </div>
        </div>
    );
};

export default ReviewUploadStep;
