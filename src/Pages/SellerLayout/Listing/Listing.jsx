import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import styles from './Listing.module.css';
import { userContext } from '../../../context/Context';

import InformationStep from './Steps/InformationStep';
import DetailsStep from './Steps/DetailsStep';
import LogisticsStep from './Steps/LogisticsStep';
import ReviewUploadStep from './Steps/ReviewUploadStep';

import { AiOutlineInfoCircle, AiOutlineProfile, AiOutlineCar, AiOutlineCheckCircle } from 'react-icons/ai';

const STEPS = [
    { id: 1, name: 'Information', icon: <AiOutlineInfoCircle size={20} /> },
    { id: 2, name: 'Details',     icon: <AiOutlineProfile size={20} /> },
    { id: 3, name: 'Logistics',   icon: <AiOutlineCar size={20} /> },
    { id: 4, name: 'Review',      icon: <AiOutlineCheckCircle size={20} /> },
];

const PRO_TIPS = {
    1: [
        { title: 'Quality images sell faster',    text: 'Upload clear, well-lit photos that show the true condition of your material.' },
        { title: 'Use AI Assist',                 text: 'After uploading, click "Use AI Assist" — Gemini AI will suggest title, category, grade & description.' },
        { title: 'Be specific in your title',     text: 'Include material type, approximate weight, and grade in the listing title.' },
    ],
    2: [
        { title: 'Pick the right category',   text: 'Accurate categorisation helps buyers find your listing through search.' },
        { title: 'Grade matters',             text: '"Sorted/Clean" commands higher prices than "Unsorted/Mixed".' },
        { title: 'Describe impurities',       text: 'Noting visible contaminants builds trust and avoids disputes.' },
    ],
    3: [
        { title: 'Price competitively',        text: 'Check similar listings to benchmark your price per unit.' },
        { title: 'Be accurate with quantity',  text: 'Overstating quantity leads to disputes.' },
        { title: 'Bidding maximises value',    text: 'If unsure of market price, use Bidding to let buyers compete.' },
    ],
    4: [
        { title: 'Double-check before publishing', text: 'Published listings are visible to all buyers immediately.' },
        { title: 'Images are your best asset',     text: 'Ensure at least one clear image is attached.' },
        { title: 'You can edit later',             text: 'After publishing you can update details from your Listing dashboard.' },
    ],
};

const VALIDATIONS = {
    1: (f) => {
        if (!f.images || f.images.length === 0) return 'Please upload at least one image of your material.';
        if (!f.title.trim())                     return 'Please enter a listing title.';
        return null;
    },
    2: (f) => {
        if (!f.category)           return 'Please select a material category.';
        if (!f.grade)              return 'Please select a quality grade.';
        if (!f.description.trim()) return 'Please add a material description.';
        return null;
    },
    3: (f) => {
        if (!f.quantity)          return 'Please enter the quantity available.';
        if (!f.unit)              return 'Please select a unit.';
        if (!f.location.trim())   return 'Please enter a pickup location.';
        if (f.priceType === 'Fixed Price' && !f.price) return 'Please enter a price for this fixed-price listing.';
        return null;
    },
    4: () => null,
};

const Listing = () => {
    const { publishListing } = useContext(userContext);
    const navigate = useNavigate();

    const [currentStep, setCurrentStep]     = useState(1);
    const [validationMsg, setValidationMsg] = useState(null);
    const [isPublishing, setIsPublishing]   = useState(false);
    const [toast, setToast]                 = useState(null); // { type: 'success'|'error', msg }

    const [formData, setFormData] = useState({
        title: '', category: '', grade: '', description: '',
        priceType: 'Fixed Price', price: '', quantity: '', unit: '',
        location: '', images: [], aiApplied: false,
    });

    // ── Clear validation message whenever formData changes ─────────────
    useEffect(() => {
        if (validationMsg) setValidationMsg(null);
    }, [formData]);

    // ── Auto-dismiss toast after 4 s ───────────────────────────────────
    useEffect(() => {
        if (!toast) return;
        const t = setTimeout(() => setToast(null), 4000);
        return () => clearTimeout(t);
    }, [toast]);

    // ── Navigation ─────────────────────────────────────────────────────
    const handleNext = () => {
        const error = VALIDATIONS[currentStep]?.(formData);
        if (error) { setValidationMsg(error); return; }
        setValidationMsg(null);
        if (currentStep < 4) setCurrentStep(s => s + 1);
    };

    // ── Save as Draft ──────────────────────────────────────────────────
    const handleSaveDraft = async () => {
        try {
            await publishListing(buildFormData());
            setToast({ type: 'success', msg: 'Draft saved successfully!' });
        } catch {
            setToast({ type: 'error', msg: 'Failed to save draft. Please try again.' });
        }
    };

    // ── Publish ────────────────────────────────────────────────────────
    const handlePublish = async () => {
        for (let step = 1; step <= 3; step++) {
            const error = VALIDATIONS[step]?.(formData);
            if (error) { setCurrentStep(step); setValidationMsg(error); return; }
        }
        setIsPublishing(true);
        try {
            await publishListing(buildFormData());
            setToast({ type: 'success', msg: 'Listing published successfully!' });
            setTimeout(() => navigate('/seller/dashboard'), 1500);
        } catch (err) {
            setToast({ type: 'error', msg: err?.response?.data?.message || 'Failed to publish listing. Please try again.' });
        } finally {
            setIsPublishing(false);
        }
    };

    // ── Build FormData ─────────────────────────────────────────────────
    const buildFormData = () => {
        const fd = new FormData();
        fd.append('title',       formData.title);
        fd.append('category',    formData.category);
        fd.append('grade',       formData.grade);
        fd.append('description', formData.description);
        fd.append('listingType', formData.priceType === 'Fixed Price' ? 'fixed' : 'bidding');
        if (formData.price)    fd.append('price',    formData.price);
        if (formData.quantity) fd.append('quantity', formData.quantity);
        if (formData.unit)     fd.append('unit',     formData.unit);
        fd.append('location[type]',           'Point');
        fd.append('location[coordinates][0]', '0');
        fd.append('location[coordinates][1]', '0');
        if (formData.location) fd.append('location[address]', formData.location);
        formData.images?.forEach(img => { if (img instanceof File) fd.append('images', img); });
        return fd;
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1: return <InformationStep formData={formData} setFormData={setFormData} />;
            case 2: return <DetailsStep     formData={formData} setFormData={setFormData} />;
            case 3: return <LogisticsStep   formData={formData} setFormData={setFormData} />;
            case 4: return <ReviewUploadStep formData={formData} />;
            default: return null;
        }
    };

    const tips = PRO_TIPS[currentStep] || PRO_TIPS[1];

    return (
        <div className={styles.listingContainer}>

            {/* ── Toast Notification ──────────────────────────────── */}
            {toast && (
                <div className={`${styles.toast} ${toast.type === 'success' ? styles.toastSuccess : styles.toastError}`}>
                    <span>{toast.type === 'success' ? '✓' : '✕'}</span>
                    {toast.msg}
                    <button className={styles.toastClose} onClick={() => setToast(null)}>×</button>
                </div>
            )}

            <div className={styles.header}>
                <span className={styles.breadcrumb}>Listing / <strong>Create New List</strong></span>
            </div>

            {/* ── Step Indicator ──────────────────────────────────── */}
            <div className={styles.wizardProgress}>
                {STEPS.map((step, index) => (
                    <React.Fragment key={step.id}>
                        <div className={styles.stepIndicator}>
                            <div className={`${styles.iconContainer} ${currentStep >= step.id ? styles.activeIcon : ''} ${currentStep > step.id ? styles.completedIcon : ''}`}>
                                {currentStep > step.id ? '✓' : step.icon}
                            </div>
                            <span className={`${styles.stepName} ${currentStep >= step.id ? styles.activeText : ''}`}>
                                {step.name}
                            </span>
                        </div>
                        {index < STEPS.length - 1 && (
                            <div className={`${styles.stepLine} ${currentStep > step.id ? styles.activeLine : ''}`} />
                        )}
                    </React.Fragment>
                ))}
            </div>

            <div className={styles.contentGrid}>
                {/* ── Main Form ──────────────────────────────────── */}
                <div className={styles.mainFormArea}>
                    <div className={styles.formHeader}>
                        <h1>{STEPS[currentStep - 1].name}</h1>
                        <p>
                            {currentStep === 1 && 'Provide the fundamental details about your industrial byproduct or material.'}
                            {currentStep === 2 && 'Classify and describe your material so buyers can find and evaluate it easily.'}
                            {currentStep === 3 && 'Set your pricing, quantity, and pickup location.'}
                            {currentStep === 4 && 'Review all your listing details before publishing.'}
                        </p>
                    </div>

                    <div className={styles.formContent}>
                        {renderStep()}
                    </div>

                    {/* ── Validation Error ───────────────────────── */}
                    {validationMsg && (
                        <div className={styles.validationError}>⚠ {validationMsg}</div>
                    )}

                    {/* ── Form Actions ────────────────────────────── */}
                    <div className={styles.formActions}>
                        {currentStep < 4 ? (
                            /* Steps 1-3: full-width Next only */
                            <button className={styles.btnNext} onClick={handleNext}>
                                Next →
                            </button>
                        ) : (
                            /* Step 4: Save as Draft + Publish side by side */
                            <div className={styles.finalActions}>
                                <button className={styles.btnDraft} onClick={handleSaveDraft}>
                                    Save as Draft
                                </button>
                                <button
                                    className={styles.btnPublish}
                                    onClick={handlePublish}
                                    disabled={isPublishing}
                                >
                                    {isPublishing ? 'Publishing...' : 'Publish'}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* ── Side Panel ──────────────────────────────────── */}
                <div className={styles.sidePanel}>
                    <div className={styles.proTipsCard}>
                        <div className={styles.cardHeader}>
                            <span className={styles.dot}></span>
                            <h3>PRO TIPS</h3>
                        </div>
                        <ol>
                            {tips.map((tip, i) => (
                                <li key={i}><strong>{tip.title}</strong> — {tip.text}</li>
                            ))}
                        </ol>
                    </div>

                    <div className={styles.sustainabilityCard}>
                        <div className={styles.cardHeaderWithIcon}>
                            <span className={styles.sparkleIcon}>✧</span>
                            <h3>Sustainability Impact</h3>
                        </div>
                        <p className={styles.cardText}>
                            Every material listed on EcoSwap diverts waste from landfills and reduces the need for virgin raw material extraction.
                        </p>
                        <div className={styles.ecoScore}>
                            <div className={styles.ecoIcon}>♺</div>
                            <div className={styles.ecoText}>
                                <h4>EcoScore Estimator</h4>
                                <p>+15 points for this listing</p>
                            </div>
                        </div>
                    </div>

                    {currentStep === 4 && (
                        <div className={styles.previewCardPlaceholder}>
                            <div className={styles.previewBadge}>Preview</div>
                            <div className={styles.previewImageArea}>
                                {formData.images.length > 0 && formData.images[0] instanceof File && (
                                    <img src={URL.createObjectURL(formData.images[0])} alt="preview"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }} />
                                )}
                            </div>
                            <div className={styles.previewFooter}>
                                <strong>{formData.title || 'Untitled Listing'}</strong>
                                {formData.category && <p>{formData.category} · {formData.grade}</p>}
                                {formData.priceType === 'Fixed Price' && formData.price && (
                                    <p>₦{formData.price} / {formData.unit}</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Listing;
