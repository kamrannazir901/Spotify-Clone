import React from "react";
import { icons } from "../../assets/Assets";
import { useMyContext } from "../../context/MyContext";

function ContextMenu({ options, data }) {
  const { handleLiHover } = useMyContext();
  const renderMenu = (items) => (
    <ul>
      {items.map((item, i) => (
        <li key={i} onMouseEnter={handleLiHover}>
          <div
            onClick={() => {
              item.action(data);
            }}
          >
            <span>{item.icon}</span>
            <p>{item.label}</p>
          </div>
          {item.submenu && <span>{icons.rightarrow_icon}</span>}
          {item.submenu && (
            <div className="contectmenudiv">{renderMenu(item.submenu)}</div>
          )}
        </li>
      ))}
    </ul>
  );
  return <div className="contectmenudiv">{renderMenu(options)}</div>;
}

export default ContextMenu;
