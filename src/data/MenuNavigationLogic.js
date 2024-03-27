import { useState } from "react";

export const menuItems = [
  { name: "Spaghetti", link: "/spaghetti" },
  { name: "Pizza", link: "/pizza" },
  // Add more menu items as needed
];

export const useMenuNavigation = () => {
  const [currentMenuItemIndex, setCurrentMenuItemIndex] = useState(0);

  const handleNext = () => {
    setCurrentMenuItemIndex((prevIndex) => (prevIndex + 1) % menuItems.length);
  };

  const handlePrevious = () => {
    setCurrentMenuItemIndex(
      (prevIndex) => (prevIndex - 1 + menuItems.length) % menuItems.length,
    );
  };

  const getCurrentMenuItem = () => menuItems[currentMenuItemIndex];

  return {
    handleNext,
    handlePrevious,
    getCurrentMenuItem,
  };
};
