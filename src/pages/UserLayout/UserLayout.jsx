import { Outlet } from "react-router";
import Sidebar from "./Sidebar/Sidebar"; // We'll create this sidebar
import styles from "./UserLayout.module.css";

const UserLayout = () => {
  return (
    <div className={styles.layoutContainer}>
      {/* Sidebar specific for Buyers */}
      <Sidebar />
      <div className={styles.mainContent}>
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;

