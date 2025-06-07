// HoverMenu.jsx
import { useState } from "react";

const HoverMenu = ({
  triggerType = "hover",
  trigger,
  children,
  menuClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const triggerEvents =
    triggerType === "click"
      ? {
          onClick: () => setIsOpen((prev) => !prev),
        }
      : {
          onMouseEnter: () => setIsOpen(true),
          onMouseLeave: () => setIsOpen(false),
        };
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="relative inline-block">
      <div {...triggerEvents}>{trigger}</div>

      {/* Menu */}
      {isOpen && (
        <div className={`absolute right-0 z-50 ${menuClassName}`}>
          {typeof children === "function" ? children({ closeMenu }) : children}
        </div>
      )}
    </div>
  );
};

export default HoverMenu;
