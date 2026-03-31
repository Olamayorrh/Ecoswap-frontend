import React, { useState } from 'react';
import styles from './Orders.module.css';
import OrderCard from './OrderCard';
import placeholderImg from '../../../assets/images/image.png';

const Orders = () => {
    const [activeTab, setActiveTab] = useState('All Orders');

    // Dummy data based on the mockups
    const dummpyOrders = [
        {
            id: "489254",
            title: "Aluminum Scrap",
            date: "February 21, 2026",
            company: "Global Chem",
            totalPrice: "10,000",
            status: "Confirmed", // Just confirmed, waiting for verified
            expectedDelivery: "Mar 21st",
            deliveryStatusText: "Delievered:", // Typo from mockup
            image: placeholderImg, // Placeholder
            actions: ["Track"]
        },
        {
            id: "489254",
            title: "Aluminum Scrap",
            date: "February 21, 2026",
            company: "Global Chem",
            totalPrice: "10,000",
            status: "Verified",
            expectedDelivery: "Awaiting Freight",
            deliveryStatusText: "",
            location: "Dispatching from Lagos, Nigeria",
            linkText: "Message Seller",
            image: placeholderImg,
            actions: ["Invoice", "Track (Disabled)"]
        },
        {
            id: "489254",
            title: "Aluminum Scrap",
            date: "February 21, 2026",
            company: "Global Chem",
            totalPrice: "10,000",
            status: "In Transit",
            expectedDelivery: "12 March",
            deliveryStatusText: "Est Delievery:",
            carrier: "EcoLogistics",
            linkText: "Message Seller",
            image: placeholderImg,
            actions: ["Invoice", "Track"]
        },
        {
            id: "489254",
            title: "HDPE Plastic Containers",
            date: "February 21, 2026",
            company: "Global Chem",
            totalPrice: "10,000",
            status: "Received",
            expectedDelivery: "12 March",
            deliveryStatusText: "Delievered:",
            proofText: "Proof of delievery signed by: Amaka Martins",
            linkText: "Rate Transaction",
            image: placeholderImg,
            actions: ["Invoice", "Re-Order"]
        }
    ];

    return (
        <div className={styles.ordersContainer}>
            <div className={styles.header}>
                <span className={styles.breadcrumb}>Orders / <strong>Track Order</strong></span>
            </div>

            <div className={styles.tabsAndFilter}>
                <div className={styles.tabs}>
                    {['All Orders', 'Verified', 'In Transit', 'Received'].map((tab) => (
                        <button
                            key={tab}
                            className={`${styles.tabBtn} ${activeTab === tab ? styles.activeTab : ''}`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className={styles.sortFilter}>
                    <span>Sort by:</span>
                    <select className={styles.sortSelect}>
                        <option>Recent Order</option>
                        <option>Oldest Order</option>
                    </select>
                </div>
            </div>

            <div className={styles.ordersList}>
                {dummpyOrders.map((order, index) => (
                    <OrderCard key={index} order={order} />
                ))}
            </div>

            <div className={styles.loadMoreContainer}>
                <button className={styles.btnLoadMore}>Load Older Orders</button>
            </div>
        </div>
    );
};

export default Orders;
