import React, { useState } from 'react';
import { useDebounce } from '../../utility/Util';

const Tooltip = ({ children, content, className, style, debounceValue }) => {
  const [active, setActive] = useState(false);
  const debounced = useDebounce(active, debounceValue ? debounceValue : 300);
  const showTip = () => {
    setActive(true);
  };

  const hideTip = () => {
    setActive(false);
  };

  return (
    <div
      className="Tooltip-Wrapper"
      // When to show the tooltip
      onMouseEnter={showTip}
      onMouseLeave={hideTip}
      onTouchStart={hideTip}
      onTouchEnd={hideTip}
    >
      {/* Wrapping */}
      {children}
      {debounced && (
        <div
          onTouchEnd={hideTip}
          ref={(el) => {
            if (!el) return null;
            const itemClientRect = el.getBoundingClientRect();
            const windowHeight = window.screen.height;

            if (windowHeight - itemClientRect.bottom < itemClientRect.height) {
              el.style.top = '-11.6rem';
            }
          }}
          className={`Tooltip-Tip ${className ? className : ''}`}
          style={style}
        >
          {/* Content */}
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
