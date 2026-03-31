import React from 'react';
import styles from './Orders.module.css';

const STATUS_STAGES = ['Confirmed', 'Verified', 'In Transit', 'Received'];

const OrderCard = ({ order }) => {
    // Determine how many steps are active based on the order status
    const currentStageIndex = STATUS_STAGES.indexOf(order.status);

    return (
        <div className={styles.orderCard}>
            <div className={styles.deliveryStatusRow}>
                <span>{order.deliveryStatusText} {order.expectedDelivery}</span>
            </div>

            <div className={styles.progressTracker}>
                {STATUS_STAGES.map((stage, index) => {
                    const isActive = index <= currentStageIndex;
                    return (
                        <React.Fragment key={stage}>
                            <div className={styles.trackerStep}>
                                <div className={`${styles.trackerDot} ${isActive ? styles.dotActive : ''}`} />
                                <span className={`${styles.trackerLabel} ${isActive ? styles.labelActive : ''}`}>
                                    {stage}
                                </span>
                            </div>
                            {index < STATUS_STAGES.length - 1 && (
                                <div className={`${styles.trackerLine} ${index < currentStageIndex ? styles.lineActive : ''}`} />
                            )}
                        </React.Fragment>
                    );
                })}
            </div>

            <div className={styles.orderDetailsRow}>
                <div className={styles.itemInfo}>
                    <div className={styles.itemImagePlaceholder}></div>
                    <div className={styles.itemText}>
                        <h4>{order.title}</h4>
                        <p>ID:{order.id}. <i>{order.date}</i></p>
                        <p><strong>{order.company}</strong></p>
                    </div>
                </div>

                <div className={styles.priceInfo}>
                    <p className={styles.priceLabel}>Total Price</p>
                    <p className={styles.priceValue}>{order.totalPrice}</p>
                </div>

                <div className={styles.actionButtons}>
                    {order.actions.includes("Invoice") && (
                        <button className={styles.btnOutline}>Invoice</button>
                    )}
                    {order.actions.includes("Track") && (
                        <button className={styles.btnOutlineBlack}>Track</button>
                    )}
                    {order.actions.includes("Track (Disabled)") && (
                        <button className={styles.btnDisabled}>Track</button>
                    )}
                    {order.actions.includes("Re-Order") && (
                        <button className={styles.btnPrimary}>Re-Order</button>
                    )}
                </div>
            </div>

            <div className={styles.footerRow}>
                <div className={styles.footerLeft}>
                    {order.location && <p>{order.location}</p>}
                    {order.carrier && <p>Carrier: {order.carrier}</p>}
                    {order.proofText && <p>{order.proofText}</p>}
                </div>
                <div className={styles.footerRight}>
                    {order.linkText && <a href="#" className={styles.actionLink}>{order.linkText}</a>}
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
