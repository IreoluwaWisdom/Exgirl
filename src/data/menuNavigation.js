import { useState } from "react";

export const menuItems = [
  { name: "Jollof Rice", link: "/menu/jollof-rice" },
  { name: "Fried Rice", link: "/menu/fried-rice" },
  { name: "Ewa Agoyin and Bread", link: "/menu/ewa" },
  { name: "Spaghetti", link: "/menu/noodles" },
  { name: "Spaghetti", link: "/menu/porridge" },
  { name: "Spaghetti", link: "/menu/chicken" },
  { name: "Spaghetti", link: "/menu/sharwarma" },
  { name: "Spaghetti", link: "/menu/spaghetti" },
  { name: "Spaghetti", link: "/menu/rice" },
  { name: "Spaghetti", link: "/menu/semo" },
  { name: "Spaghetti", link: "/menu/pando" },
  { name: "Spaghetti", link: "/menu/amala" },
  { name: "Spaghetti", link: "/menu/grilled-chicken" },
  { name: "Spaghetti", link: "/menu/fried-chicken" },
  { name: "Spaghetti", link: "/menu/fish" },

  // Add more menu items as needed
];

export const useMenuNavigation = () => {
  const [currentMenuItemIndex, setCurrentMenuItemIndex] = useState(3);

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
