import React, {
  Children,
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { icons } from "../assets/Assets";

const MyContextObj = createContext();

function MyContext({ children }) {
  const contextMenuRef = useRef();
  useEffect(() => {
    const handleClick = () => {
      setContextMenuData((obj) => ({ ...obj, visible: false }));
    };

    const handleContextMenu = (e) => {
      e.preventDefault();
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

  const allMenuOptions = {
    song: [
      {
        label: "Play Song",
        icon: icons.play_icon,
        action: (data) => console.log("Play song", data),
      },
      {
        label: "Add to Playlist",
        icon: icons.add_icon,
        action: (data) => console.log("Add to playlist", data),
      },
      {
        label: "More Options",
        icon: icons.more_icon,
        submenu: [
          {
            label: "Share",
            icon: icons.share_icon,
            action: (data) => console.log("Share song", data),
            submenu: [
              {
                label: "Follow Artist",
                icon: icons.heart_icon,
                action: (data) => console.log("Follow artist", data),
              },
              {
                label: "View Artist Profile",
                icon: icons.profile_icon,
                action: (data) => console.log("View profile", data),
              },
            ],
          },
          {
            label: "Download",
            icon: icons.download_icon,
            action: (data) => console.log("Download song", data),
          },
        ],
      },
    ],
    artist: [
      {
        label: "Follow Artist",
        icon: icons.heart_icon,
        action: (data) => console.log("Follow artist", data),
      },
      {
        label: "View Artist Profile",
        icon: icons.profile_icon,
        action: (data) => console.log("View profile", data),
      },
    ],
    playlist: [
      {
        label: "Edit Playlist",
        icon: icons.edit_icon,
        action: (data) => console.log("Edit playlist", data),
      },
      {
        label: "Delete Playlist",
        icon: icons.trash_icon,
        action: (data) => console.log("Delete playlist", data),
      },
    ],
    frontsidebar: [
      {
        label: "Create New Playlist",
        icon: icons.newplaylist_icon,
        action: (data) => console.log("Create new playlist", data),
      },
      {
        label: "Create Folder",
        icon: icons.folder_icon,
        action: (data) => console.log("Create folder", data),
      },
    ],
  };

  const [contextMenuData, setContextMenuData] = useState({
    visible: false,
    x: 0,
    y: 0,
    type: "",
    data: {},
    options: [],
    event: {},
  });

  useLayoutEffect(() => {
    if (
      !contextMenuData.visible ||
      !contextMenuRef.current ||
      !contextMenuData.event
    )
      return;

    const { width, height } = contextMenuRef.current.getBoundingClientRect();

    const adjustPosition = () => {
      let x = contextMenuData.event.clientX;
      let y = contextMenuData.event.clientY;

      if (x + width > window.innerWidth) {
        x = window.innerWidth - width - 10;
      }

      if (y + height > window.innerHeight) {
        y = window.innerHeight - height - 10;
      }

      setContextMenuData((prev) => {
        if (prev.x === x && prev.y === y) return prev;
        return { ...prev, x, y };
      });
    };

    adjustPosition();

    const handleResize = () => {
      if (contextMenuData.visible) {
        adjustPosition();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [contextMenuData.visible, contextMenuData.event]);

  const showMenu = (e, type, { title }) => {
    setContextMenuData({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      type,
      data: { title },
      options: allMenuOptions[type],
      event: e,
    });
  };

  const handleLiHover = (e) => {
    const parentRect = e.currentTarget.getBoundingClientRect();
    const submenu = e.currentTarget.querySelector(".contectmenudiv");
    if (!submenu) return;

    const submenuRect = submenu.getBoundingClientRect();

    if (window.innerWidth - parentRect.right > submenuRect.width) {
      submenu.style.left = "100%";
      submenu.style.right = "auto";
    } else {
      submenu.style.right = "100%";
      submenu.style.left = "auto";
    }
  };

  return (
    <MyContextObj.Provider
      value={{ showMenu, contextMenuData, contextMenuRef, handleLiHover }}
    >
      {children}
    </MyContextObj.Provider>
  );
}

export default MyContext;

export const useMyContext = () => useContext(MyContextObj);
