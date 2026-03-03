import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import styles from './Listing.module.css';
import { userContext } from '../../../context/Context';

// We will build the individual step components in subsequent steps
import InformationStep from './Steps/InformationStep';
import DetailsStep from './Steps/DetailsStep';
import LogisticsStep from './Steps/LogisticsStep';
import ReviewUploadStep from './Steps/ReviewUploadStep';

// Dummy icons for step indicators
import { AiOutlineInfoCircle, AiOutlineProfile, AiOutlineCar, AiOutlineCheckCircle } from 'react-icons/ai';

const STEPS = [
    { id: 1, name: 'Information', icon: <AiOutlineInfoCircle size={20} /> },
    { id: 2, name: 'Details', icon: <AiOutlineProfile size={20} /> },
    { id: 3, name: 'Logistics', icon: <AiOutlineCar size={20} /> },
    { id: 4, name: 'Review', icon: <AiOutlineCheckCircle size={20} /> },
];

const Listing = () => {
    const { publishListing } = useContext(userContext);
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        grade: '',
        description: '',
        priceType: 'Fixed Price',
        price: '',
        quantity: '',
        unit: '',
        location: '',
        images: []
    });

    const handleNext = () => {
        if (currentStep < 4) setCurrentStep(currentStep + 1);
    };

    const handlePublish = async () => {
        try {
            const formDataObj = new FormData();
            formDataObj.append('title', formData.title);
            formDataObj.append('category', formData.category);
            formDataObj.append('grade', formData.grade);
            formDataObj.append('description', formData.description);
            
            // Map the frontend drop-down names into the backend schema enum
            const backendListingType = formData.priceType === 'Fixed Price' ? 'fixed' : 'bidding';
            formDataObj.append('listingType', backendListingType);
            
            if (backendListingType === 'fixed') {
                formDataObj.append('price', formData.price);
                formDataObj.append('unit', formData.unit);
            }
            
            formDataObj.append('quantity', formData.quantity);

            // Default location structure since it's just a text input right now
            formDataObj.append('location[type]', 'Point');
            formDataObj.append('location[coordinates][0]', '0');
            formDataObj.append('location[coordinates][1]', '0');
            if (formData.location) {
                formDataObj.append('location[address]', formData.location);
            }
            
            if (formData.images && formData.images.length > 0) {
                formData.images.forEach(img => {
                    formDataObj.append('images', img);
                });
            }

            await publishListing(formDataObj);
            navigate('/seller/dashboard'); // Go back to dashboard on success

        } catch (error) {
            console.error("Publishing fail", error);
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return <InformationStep formData={formData} setFormData={setFormData} />;
            case 2:
                return <DetailsStep formData={formData} setFormData={setFormData} />;
            case 3:
                return <LogisticsStep formData={formData} setFormData={setFormData} />;
            case 4:
                return <ReviewUploadStep formData={formData} setFormData={setFormData} />;
            default:
                return <InformationStep formData={formData} setFormData={setFormData} />;
        }
    };

    return (
        <div className={styles.listingContainer}>
            <div className={styles.header}>
                <span className={styles.breadcrumb}>Listing / <strong>Create New List</strong></span>
            </div>

            <div className={styles.wizardProgress}>
                {STEPS.map((step, index) => (
                    <React.Fragment key={step.id}>
                        <div className={styles.stepIndicator}>
                            <div className={`${styles.iconContainer} ${currentStep >= step.id ? styles.activeIcon : ''}`}>
                                {step.icon}
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
                <div className={styles.mainFormArea}>
                    <div className={styles.formHeader}>
                        <h1>Create New Listing</h1>
                        <p>Provide the fundamental details about your industrial byproduct or material.</p>
                    </div>

                    <div className={styles.formContent}>
                        {renderStepContent()}
                    </div>

                    <div className={styles.formActions}>
                        {currentStep < 4 ? (
                            <button className={styles.btnNext} onClick={handleNext}>Next</button>
                        ) : (
                            <div className={styles.finalActions}>
                                <button className={styles.btnPublish} onClick={handlePublish}>Publish</button>
                                <button className={styles.btnDraft}>Save as Draft</button>
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.sidePanel}>
                    <div className={styles.proTipsCard}>
                        <div className={styles.cardHeader}>
                            <span className={styles.dot}></span>
                            <h3>PRO TIPS</h3>
                        </div>
                        <ol>
                            <li><strong>Be transparent about impurities</strong> to build trust and avoid disputes</li>
                            <li><strong>Be transparent about impurities</strong> to build trust and avoid disputes</li>
                            <li><strong>Be transparent about impurities</strong> to build trust and avoid disputes</li>
                        </ol>
                    </div>

                    <div className={styles.sustainabilityCard}>
                        <div className={styles.cardHeaderWithIcon}>
                            <span className={styles.sparkleIcon}>✧</span>
                            <h3>Sustainability Impact</h3>
                        </div>
                        <p className={styles.cardText}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
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
                            <div className={styles.previewImageArea}></div>
                            <div className={styles.previewFooter}>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Listing;
