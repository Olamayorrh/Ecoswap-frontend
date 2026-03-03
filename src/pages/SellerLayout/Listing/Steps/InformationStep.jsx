import React, { useContext, useState, useRef } from 'react';
import styles from './Steps.module.css';
import { userContext } from '../../../../context/Context';
import { AiOutlineRobot } from 'react-icons/ai';

const InformationStep = ({ formData, setFormData }) => {
    const { analyzeWasteImage } = useContext(userContext);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [aiSuggestions, setAiSuggestions] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileSelect = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Save file & preview natively
        setFormData({ ...formData, images: [file] });
        setPreviewUrl(URL.createObjectURL(file));

        // Fire AI Analysis
        setIsAnalyzing(true);
        setAiSuggestions(null); // Reset standard state

        try {
            const result = await analyzeWasteImage(file);
            if (result.success && result.data) {
                setAiSuggestions(result.data);
            }
        } catch (error) {
            console.error("AI failed to analyze", error);
        } finally {
            setIsAnalyzing(false);
        }
    };

    const applyAiSuggestions = () => {
        if (!aiSuggestions) return;
        setFormData(prev => ({
            ...prev,
            title: aiSuggestions.title || prev.title,
            category: aiSuggestions.category || prev.category,
            grade: aiSuggestions.grade || prev.grade,
            description: aiSuggestions.description || prev.description
        }));
        setAiSuggestions(null); // Dismiss modal/overlay after apply
    };

    return (
        <div className={styles.stepContainer}>
            {/* AI Image Uploader Area */}
            <div className={styles.inputGroup}>
                <label>Upload Primary Image (AI Assisted)</label>
                <div 
                    className={styles.uploadArea} 
                    onClick={() => fileInputRef.current?.click()}
                    style={{ position: 'relative' }}
                >
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        style={{ display: 'none' }} 
                        accept="image/jpeg, image/png"
                        onChange={handleFileSelect}
                    />
                    
                    {previewUrl ? (
                         <div style={{ textAlign: 'center' }}>
                            <img src={previewUrl} alt="Preview" style={{ maxHeight: '150px', borderRadius: '8px' }} />
                            <p className={styles.uploadSubtext} style={{marginTop: '10px'}}>Click to change image</p>
                        </div>
                    ) : (
                        <>
                            <div className={styles.uploadIcon}>⬆️</div>
                            <p><strong>Upload an image to auto-fill details</strong></p>
                            <p className={styles.uploadSubtext}>Our AI will detect category, grade, and generate a title!</p>
                            <div className={styles.allowedFormats}>
                                <span>JPG</span>
                                <span>PNG</span>
                                <span>Max 10MB</span>
                            </div>
                        </>
                    )}

                    {isAnalyzing && (
                        <div className={styles.aiOverlay}>
                            <AiOutlineRobot size={24} className={styles.spinAnimation} />
                            <span>Analyzing material with AI...</span>
                        </div>
                    )}
                </div>
            </div>

            {/* AI Suggestion Alert */}
            {aiSuggestions && (
                <div className={styles.aiSuggestionBox}>
                    <div className={styles.aiHeader}>
                        <AiOutlineRobot size={20} color="#1cc691" />
                        <h4>AI detected: {aiSuggestions.category}</h4>
                    </div>
                    <p>We found details matching <strong>{aiSuggestions.title}</strong>.</p>
                    <div className={styles.aiActions}>
                        <button className={styles.btnOutlineSecondary} onClick={() => setAiSuggestions(null)}>Decline</button>
                        <button className={styles.btnPrimary} onClick={applyAiSuggestions}>Auto-Fill Form</button>
                    </div>
                </div>
            )}

            <div className={styles.inputGroup}>
                <label>Listing Title</label>
                <input
                    type="text"
                    placeholder="e.g. 500kg Recycled Glass - Grade A"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
                <span className={styles.helperText}>Be descriptive. Include material type and weight</span>
            </div>

            <div className={styles.inputGroup}>
                <label>Category</label>
                <select 
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                    <option value="" disabled>Select material origin</option>
                    <option value="Plastic">Plastic</option>
                    <option value="Metal">Metal</option>
                    <option value="Paper">Paper</option>
                    <option value="Electronic">Electronic</option>
                    <option value="Other">Other</option>
                </select>
            </div>

            <div className={styles.inputGroup}>
                <label>Material Grade/Quality</label>
                <select 
                    value={formData.grade}
                    onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                >
                    <option value="" disabled>Select purity level</option>
                    <option value="Sorted/Clean">Sorted/Clean</option>
                    <option value="Unsorted/Mixed">Unsorted/Mixed</option>
                    <option value="Industrial Grade">Industrial Grade</option>
                </select>
            </div>

            <div className={styles.inputGroup}>
                <label>Description</label>
                <textarea
                    rows={4}
                    placeholder="Provide additional notes on impurities, storage conditions, or visual defects..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
            </div>
        </div>
    );
};

export default InformationStep;
