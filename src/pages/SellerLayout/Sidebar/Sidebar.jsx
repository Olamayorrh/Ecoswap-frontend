import React, { useContext } from "react";
import { Link, useLocation } from "react-router";
import { userContext } from "../../../context/Context";
import { AiOutlineAppstore, AiOutlineContainer, AiOutlineShoppingCart, AiOutlineMessage, AiOutlineBell, AiOutlineSetting } from "react-icons/ai";
import { CiUser } from "react-icons/ci";
import styles from "./Sidebar.module.css";
import icon from "../../../assets/images/Icon.svg";
import Appname from "../../../assets/images/Name.svg";

const Sidebar = () => {
    const location = useLocation();
    const { userInfo } = useContext(userContext);
    const fullName = userInfo?.user?.fullname || "Sarah Jekins";
    const userRole = "Verified Member";

    const navItems = [
        { name: "Dashboard", path: "/seller/dashboard", icon: <AiOutlineAppstore size={24} /> },
        { name: "Listing", path: "/seller/listing", icon: <AiOutlineContainer size={24} /> },
        { name: "Orders", path: "/seller/orders", icon: <AiOutlineShoppingCart size={24} /> },
        { name: "Messages", path: "/seller/messages", icon: <AiOutlineMessage size={24} /> },
        { name: "Notification", path: "/seller/notifications", icon: <AiOutlineBell size={24} /> },
        { name: "Settings", path: "/seller/settings", icon: <AiOutlineSetting size={24} /> },
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
                        className={`${styles.navItem} ${location.pathname === item.path || (item.path !== "/seller/dashboard" && location.pathname.startsWith(item.path))
                                ? styles.active
                                : ""
                            }`}
                    >
                        <span className={styles.navIcon}>{item.icon}</span>
                        <span className={styles.navName}>{item.name}</span>
                    </Link>
                ))}
            </nav>

            <div className={styles.userProfile}>
                <div className={styles.userAvatar}>
                    <CiUser size={24} />
                </div>
                <div className={styles.userInfo}>
                    <p className={styles.userName}>{fullName}</p>
                    <p className={styles.userStatus}>{userRole}</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
