import React from 'react';
import styles from './Steps.module.css';

const DetailsStep = ({ formData, setFormData }) => {
    return (
        <div className={styles.stepContainer}>
            <div className={styles.inputGroup}>
                <label>Material Category</label>
                <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                    <option value="">Select category</option>
                    <option value="Plastic">Plastic</option>
                    <option value="Glass">Glass</option>
                    <option value="Metal">Metal</option>
                </select>
            </div>

            <div className={styles.inputGroup}>
                <label>Quality Grade</label>
                <select
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                >
                    <option value="">Select grade</option>
                    <option value="Grade A">Grade A</option>
                    <option value="Grade B">Grade B</option>
                    <option value="Grade C">Grade C</option>
                </select>
            </div>

            <div className={styles.inputGroup}>
                <label>Material Description</label>
                <textarea
                    placeholder="Describe the product, condition, or specific industrial origin of the waste..."
                    rows="5"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
            </div>
        </div>
    );
};

export default DetailsStep;
