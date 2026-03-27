import React, { useContext, useState, useRef } from 'react';
import styles from './Steps.module.css';
import { userContext } from '../../../../context/Context';
import { AiOutlineRobot, AiOutlineCloudUpload, AiOutlineClose } from 'react-icons/ai';
import { BsStars } from 'react-icons/bs';

/**
 * AI Assist Flow:
 *  idle       → user uploads image          → 'prompted'
 *  prompted   → user clicks "Use AI Assist" → 'analyzing'
 *  analyzing  → AI returns suggestions      → 'suggested'
 *  suggested  → user clicks "Apply to All"  → fields populated, back to 'idle'
 *  prompted   → user clicks "Fill manually" → 'declined'  (no API call)
 *  declined   → user edits fields manually
 */
const AI_STATE = { IDLE: 'idle', PROMPTED: 'prompted', ANALYZING: 'analyzing', SUGGESTED: 'suggested', DECLINED: 'declined' };

// Shared category list — must match DetailsStep and backend enum
const CATEGORIES = [
    'Plastic', 'Metal', 'Paper', 'Glass', 'Electronic',
    'Rubber', 'Wood', 'Textile', 'Chemical', 'Organic', 'Other'
];

const InformationStep = ({ formData, setFormData }) => {
    const { analyzeWasteImage } = useContext(userContext);
    const [aiState, setAiState] = useState(AI_STATE.IDLE);
    const [aiSuggestions, setAiSuggestions] = useState(null);
    const [aiError, setAiError] = useState(null);
    const [previewUrls, setPreviewUrls] = useState([]);
    const fileInputRef = useRef(null);

    // ── File selection / drop ──────────────────────────────────────────
    const processFiles = (files) => {
        if (!files || !files.length) return;
        const selected = Array.from(files).slice(0, 5);
        const urls = selected.map(f => URL.createObjectURL(f));
        setPreviewUrls(urls);
        setFormData(prev => ({ ...prev, images: selected }));
        setAiSuggestions(null);
        setAiError(null);
        setAiState(AI_STATE.PROMPTED);
    };

    const handleFileChange = (e) => processFiles(e.target.files);
    const handleDrop = (e) => { e.preventDefault(); processFiles(e.dataTransfer.files); };
    const handleDragOver = (e) => e.preventDefault();

    // ── AI Assist button ───────────────────────────────────────────────
    const handleUseAiAssist = async () => {
        if (!formData.images || !formData.images.length) return;
        setAiState(AI_STATE.ANALYZING);
        setAiError(null);
        try {
            const result = await analyzeWasteImage(formData.images[0]);
            if (result.success && result.data) {
                setAiSuggestions(result.data);
                setAiState(AI_STATE.SUGGESTED);
            } else {
                setAiError('AI could not identify the material. Please fill in the details manually.');
                setAiState(AI_STATE.DECLINED);
            }
        } catch {
            setAiError('AI analysis failed. Please fill in the details manually.');
            setAiState(AI_STATE.DECLINED);
        }
    };

    // ── Apply suggestions → populate fields ───────────────────────────
    const handleApplySuggestions = () => {
        if (!aiSuggestions) return;
        setFormData(prev => ({
            ...prev,
            title:       aiSuggestions.title       || prev.title,
            category:    aiSuggestions.category    || prev.category,
            grade:       aiSuggestions.grade       || prev.grade,
            description: aiSuggestions.description || prev.description,
            aiApplied:   true,
        }));
        setAiState(AI_STATE.IDLE);
        setAiSuggestions(null);
    };

    // ── Decline / dismiss ──────────────────────────────────────────────
    const handleDecline = () => {
        setAiSuggestions(null);
        setAiState(AI_STATE.DECLINED);
    };

    const removeImage = (index) => {
        const updatedFiles = formData.images.filter((_, i) => i !== index);
        const updatedUrls  = previewUrls.filter((_, i) => i !== index);
        setPreviewUrls(updatedUrls);
        setFormData(prev => ({ ...prev, images: updatedFiles }));
        if (!updatedFiles.length) setAiState(AI_STATE.IDLE);
    };

    const isAnalyzing = aiState === AI_STATE.ANALYZING;

    return (
        <div className={styles.stepContainer}>

            {/* ── Upload Primary Image ───────────────────────────────── */}
            <div className={styles.inputGroup}>
                <label className={styles.fieldLabel}>
                    Upload Primary Image (AI Assisted)
                    <span className={styles.aiBadge}><BsStars size={11} /> AI Assisted</span>
                </label>

                <div
                    className={`${styles.uploadArea} ${isAnalyzing ? styles.uploadAreaAnalyzing : ''}`}
                    onClick={() => !isAnalyzing && fileInputRef.current?.click()}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        accept="image/jpeg,image/png,image/webp"
                        multiple
                        onChange={handleFileChange}
                    />

                    {isAnalyzing ? (
                        <div className={styles.analyzingState}>
                            <div className={styles.analyzingSpinner}><AiOutlineRobot size={32} /></div>
                            <p className={styles.analyzingText}>Analyzing material with AI...</p>
                            <div className={styles.progressBar}><div className={styles.progressFill} /></div>
                        </div>
                    ) : previewUrls.length > 0 ? (
                        <div className={styles.previewGrid} onClick={e => e.stopPropagation()}>
                            {previewUrls.map((url, i) => (
                                <div key={i} className={styles.previewThumb}>
                                    <img src={url} alt={`img ${i + 1}`} />
                                    <button className={styles.removeThumb} onClick={() => removeImage(i)} type="button">
                                        <AiOutlineClose size={12} />
                                    </button>
                                </div>
                            ))}
                            {previewUrls.length < 5 && (
                                <div className={styles.addMoreThumb} onClick={() => fileInputRef.current?.click()}>
                                    <AiOutlineCloudUpload size={24} /><span>Add more</span>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className={styles.uploadPlaceholder}>
                            <div className={styles.uploadIconWrapper}><AiOutlineCloudUpload size={36} /></div>
                            <p className={styles.uploadTitle}>Upload an image to auto-fill details</p>
                            <p className={styles.uploadSubtext}>Our AI will detect category, grade, and generate a title!</p>
                            <div className={styles.allowedFormats}>
                                <span>JPG</span><span>PNG</span><span>Max 10MB</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* AI Assist button — appears after image upload */}
            {aiState === AI_STATE.PROMPTED && (
                <div className={styles.aiAssistRow}>
                    <button className={styles.btnAiAssist} onClick={handleUseAiAssist}>
                        <BsStars size={13} /> Use AI Assist
                    </button>
                    <button className={styles.btnDecline} onClick={handleDecline}>
                        Fill manually
                    </button>
                </div>
            )}

            {/* ── AI Error ────────────────────────────────────────────── */}
            {aiError && (
                <div className={styles.aiErrorBox}>
                    <AiOutlineRobot size={16} />
                    <span>{aiError}</span>
                    <button onClick={() => setAiError(null)} className={styles.dismissBtn}><AiOutlineClose size={14} /></button>
                </div>
            )}

            {/* ── AI Suggestion Card ───────────────────────────────────── */}
            {aiState === AI_STATE.SUGGESTED && aiSuggestions && (
                <div className={styles.aiSuggestionCard}>
                    <div className={styles.aiCardHeader}>
                        <div className={styles.aiCardTitle}>
                            <BsStars size={18} color="#1cc691" />
                            <h4>AI Detected: <span>{aiSuggestions.category}</span></h4>
                        </div>
                        <button className={styles.dismissSuggestion} onClick={handleDecline}><AiOutlineClose size={16} /></button>
                    </div>

                    <p className={styles.aiCardSubtitle}>
                        Review the AI suggestions below, then click <strong>Apply to All Fields</strong> to auto-fill.
                    </p>

                    <div className={styles.aiFieldPreview}>
                        <div className={styles.aiFieldRow}>
                            <span className={styles.aiFieldLabel}>Title</span>
                            <span className={styles.aiFieldValue}>{aiSuggestions.title}</span>
                        </div>
                        <div className={styles.aiFieldRow}>
                            <span className={styles.aiFieldLabel}>Category</span>
                            <span className={styles.aiFieldValue}>{aiSuggestions.category}</span>
                        </div>
                        <div className={styles.aiFieldRow}>
                            <span className={styles.aiFieldLabel}>Grade</span>
                            <span className={styles.aiFieldValue}>{aiSuggestions.grade}</span>
                        </div>
                        <div className={styles.aiFieldRow}>
                            <span className={styles.aiFieldLabel}>Description</span>
                            <span className={styles.aiFieldValue}>{aiSuggestions.description}</span>
                        </div>
                    </div>

                    <div className={styles.aiActions}>
                        <button className={styles.btnPrimary} onClick={handleApplySuggestions}>
                            <BsStars size={13} /> Apply to All Fields
                        </button>
                        <button className={styles.btnDecline} onClick={handleDecline}>
                            Fill manually
                        </button>
                    </div>
                </div>
            )}

            {/* ── Category ─────────────────────────────────────────────── */}
            <div className={styles.inputGroup}>
                <label className={styles.fieldLabel}>
                    Category
                    {formData.aiApplied && formData.category && (
                        <span className={styles.aiAppliedBadge}><BsStars size={10} /> AI</span>
                    )}
                </label>
                <select
                    className={styles.selectInput}
                    value={formData.category}
                    onChange={e => setFormData({ ...formData, category: e.target.value, aiApplied: false })}
                >
                    <option value="" disabled>Select material origin</option>
                    {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            {/* ── Material Grade / Quality ──────────────────────────────── */}
            <div className={styles.inputGroup}>
                <label className={styles.fieldLabel}>
                    Material Grade/Quality
                    {formData.aiApplied && formData.grade && (
                        <span className={styles.aiAppliedBadge}><BsStars size={10} /> AI</span>
                    )}
                </label>
                <select
                    className={styles.selectInput}
                    value={formData.grade}
                    onChange={e => setFormData({ ...formData, grade: e.target.value, aiApplied: false })}
                >
                    <option value="" disabled>Select purity level</option>
                    <option value="Sorted/Clean">Sorted / Clean</option>
                    <option value="Unsorted/Mixed">Unsorted / Mixed</option>
                    <option value="Industrial Grade">Industrial Grade</option>
                </select>
            </div>

            {/* ── Listing Title ─────────────────────────────────────────── */}
            <div className={styles.inputGroup}>
                <label className={styles.fieldLabel}>
                    Listing Title <span className={styles.requiredMark}>*</span>
                    {formData.aiApplied && formData.title && (
                        <span className={styles.aiAppliedBadge}><BsStars size={10} /> AI</span>
                    )}
                </label>
                <input
                    type="text"
                    className={styles.textInput}
                    placeholder="e.g. 500kg Recycled Glass - Grade A"
                    value={formData.title}
                    onChange={e => setFormData({ ...formData, title: e.target.value, aiApplied: false })}
                />
                <span className={styles.helperText}>Be descriptive — include material type and estimated weight</span>
            </div>

        </div>
    );
};

export default InformationStep;
