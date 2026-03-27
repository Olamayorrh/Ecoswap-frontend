import React from 'react';
import styles from './Steps.module.css';
import { BsStars } from 'react-icons/bs';

const DetailsStep = ({ formData, setFormData }) => {
    return (
        <div className={styles.stepContainer}>

            {/* Material Category */}
            <div className={styles.inputGroup}>
                <label className={styles.fieldLabel}>
                    Material Category
                    {formData.aiApplied && formData.category && (
                        <span className={styles.aiAppliedBadge}><BsStars size={10} /> AI</span>
                    )}
                </label>
                <select
                    className={styles.selectInput}
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value, aiApplied: false })}
                >
                    <option value="" disabled>Select category</option>
                    <option value="Plastic">Plastic</option>
                    <option value="Metal">Metal</option>
                    <option value="Paper">Paper</option>
                    <option value="Glass">Glass</option>
                    <option value="Electronic">Electronic</option>
                    <option value="Rubber">Rubber</option>
                    <option value="Wood">Wood</option>
                    <option value="Textile">Textile</option>
                    <option value="Chemical">Chemical</option>
                    <option value="Organic">Organic</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            {/* Quality Grade */}
            <div className={styles.inputGroup}>
                <label className={styles.fieldLabel}>
                    Quality Grade
                    {formData.aiApplied && formData.grade && (
                        <span className={styles.aiAppliedBadge}><BsStars size={10} /> AI</span>
                    )}
                </label>
                <select
                    className={styles.selectInput}
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value, aiApplied: false })}
                >
                    <option value="" disabled>Select grade</option>
                    <option value="Sorted/Clean">Sorted / Clean</option>
                    <option value="Unsorted/Mixed">Unsorted / Mixed</option>
                    <option value="Industrial Grade">Industrial Grade</option>
                </select>
                <span className={styles.helperText}>Choose the purity level that most accurately describes the material</span>
            </div>

            {/* Material Description */}
            <div className={styles.inputGroup}>
                <label className={styles.fieldLabel}>
                    Material Description
                    {formData.aiApplied && formData.description && (
                        <span className={styles.aiAppliedBadge}><BsStars size={10} /> AI</span>
                    )}
                </label>
                <textarea
                    className={styles.textareaInput}
                    rows={5}
                    placeholder="Input material description — include visible impurities, storage conditions, or specific origin..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value, aiApplied: false })}
                />
                <span className={styles.helperText}>Add detail to help buyers assess whether the material suits their needs</span>
            </div>

        </div>
    );
};

export default DetailsStep;
