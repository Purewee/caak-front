import React, { useEffect, useState, useCallback } from 'react';
import { ArrowUpOutlined } from '@ant-design/icons';

//prettier-ignore
export default function PushUp() {
    const [showTopBtn, setShowTopBtn] = useState(false);
    const [y, setY] = useState(window.scrollY);
    const [scrollingToTop, setScrollingToTop] = useState(false);

    const handleNavigation = useCallback(
        (e) => {
        const window = e.currentTarget;
        if (y > window.scrollY) {
            setScrollingToTop(true);
        } else if (y < window.scrollY) {
            setScrollingToTop(false);
        }
        setY(window.scrollY);
        },
        [y]
    );
    
    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        setY(window.scrollY);
        window.addEventListener("scroll", handleNavigation);

        return () => {
        window.removeEventListener("scroll", handleNavigation);
        };
    }, [handleNavigation]);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                setShowTopBtn(true);
            } else {
                setShowTopBtn(false);
            }
        });
    }, []);
    return (
        <div className={`top-to-btm ${scrollingToTop ? 'flex' : 'hidden sm:block'}`}>
            {showTopBtn && (
                <ArrowUpOutlined onClick={goToTop} className="icon-position text-[22px] icon-style flex items-center justify-center" />
            )}
        </div>
    );
}
