import { useEffect, useRef, useContext, useCallback } from 'react';
import { userContext } from '../context/Context';

/**
 * useSessionTimeout
 * Logs the user out after `timeoutMs` of inactivity.
 * Inactivity is measured by user events: mousemove, keydown, click, scroll, touchstart.
 *
 * @param {number} timeoutMs - milliseconds of inactivity before logout (default: 15 min)
 */
const useSessionTimeout = (timeoutMs = 15 * 60 * 1000) => {
    const { userInfo, logout } = useContext(userContext);
    const timerRef = useRef(null);

    const resetTimer = useCallback(() => {
        if (timerRef.current) clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            logout();
        }, timeoutMs);
    }, [logout, timeoutMs]);

    useEffect(() => {
        // Only run the session timer if a user is logged in
        if (!userInfo) return;

        const events = ['mousemove', 'keydown', 'mousedown', 'touchstart', 'scroll'];

        events.forEach(e => window.addEventListener(e, resetTimer, { passive: true }));
        resetTimer(); // start the timer immediately

        return () => {
            events.forEach(e => window.removeEventListener(e, resetTimer));
            if (timerRef.current) clearTimeout(timerRef.current);
        };
    }, [userInfo, resetTimer]);
};

export default useSessionTimeout;
