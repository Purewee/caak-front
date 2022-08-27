import React, { useEffect, useState } from 'react';
import { ArrowUpOutlined } from '@ant-design/icons';

//prettier-ignore
export default function PushUp() {
    const [showTopBtn, setShowTopBtn] = useState(false);
    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
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
        <div className="top-to-btm">
            {showTopBtn && (
                <ArrowUpOutlined onClick={goToTop} className="icon-position text-[22px] icon-style flex items-center justify-center" />
            )}
        </div>
    );
}
