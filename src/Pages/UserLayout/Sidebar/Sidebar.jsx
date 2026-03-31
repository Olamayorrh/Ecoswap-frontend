import React, { useContext } from "react";
import { Link, useLocation } from "react-router";
import { userContext } from "../../../context/Context";
import useSessionTimeout from "../../../hooks/useSessionTimeout";
import {
    AiOutlineAppstore, AiOutlineContainer, AiOutlineShoppingCart,
    AiOutlineMessage, AiOutlineBell, AiOutlineSetting, AiOutlineLogout
} from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import styles from "./Sidebar.module.css";
import icon from "../../../assets/images/Icon.svg";
import Appname from "../../../assets/images/Name.svg";

const Sidebar = () => {
    const location = useLocation();
    const { userInfo, logout } = useContext(userContext);

    // ── Session timeout: auto-logout after 15 min of inactivity ──────
    useSessionTimeout(15 * 60 * 1000);

    const fullName = userInfo?.user?.fullname || "User";
    const userRole = "Verified Member";

    const navItems = [
        { name: "Dashboard",    path: "/buyer/dashboard",     icon: <AiOutlineAppstore size={24} /> },
        { name: "Listing",      path: "/buyer/listing",       icon: <AiOutlineContainer size={24} /> },
        { name: "Orders",       path: "/buyer/orders",        icon: <AiOutlineShoppingCart size={24} /> },
        { name: "Messages",     path: "/buyer/messages",      icon: <AiOutlineMessage size={24} /> },
        { name: "Notification", path: "/buyer/notifications", icon: <AiOutlineBell size={24} /> },
        { name: "Settings",     path: "/buyer/settings",      icon: <AiOutlineSetting size={24} /> },
    ];

    return (
        <div className={styles.sidebar}>
            <div className={styles.logoContainer}>
                <img src={icon} alt="EcoSwap Logo" className={styles.icon} />
                <img src={Appname} alt="EcoSwap" className={styles.appName} />
            </div>

            <nav className={styles.navLinks}>
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        to={item.path}
                        className={`${styles.navItem} ${
                            location.pathname === item.path ||
                            (item.path !== "/buyer/dashboard" && location.pathname.startsWith(item.path))
                                ? styles.active
                                : ""
                        }`}
                    >
                        <span className={styles.navIcon}>{item.icon}</span>
                        <span className={styles.navName}>{item.name}</span>
                    </Link>
                ))}
            </nav>

            {/* ── User profile + Logout ──────────────────────────── */}
            <div className={styles.userProfile}>
                <div className={styles.userAvatar}>
                    <CiUser size={24} />
                </div>
                <div className={styles.userInfo}>
                    <p className={styles.userName}>{fullName}</p>
                    <p className={styles.userStatus}>{userRole}</p>
                </div>
                <button
                    className={styles.logoutBtn}
                    onClick={logout}
                    title="Logout"
                    aria-label="Logout"
                >
                    <AiOutlineLogout size={20} />
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
