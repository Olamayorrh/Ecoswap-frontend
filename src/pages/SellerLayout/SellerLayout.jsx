import React from 'react';
import { Outlet } from 'react-router';
import Sidebar from './Sidebar/Sidebar';
import styles from './SellerLayout.module.css';

const SellerLayout = () => {
    return (
        <div className={styles.layout}>
            <Sidebar />
            <div className={styles.mainContent}>
                <Outlet />
            </div>
        </div>
    );
};

export default SellerLayout;
