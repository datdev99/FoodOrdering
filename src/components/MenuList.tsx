import React from 'react';
import MenuItem from './MenuItem';
import { MenuItem as MenuItemType } from '../types';

interface MenuListProps {
  menuItems: MenuItemType[];
}

const MenuList: React.FC<MenuListProps> = ({ menuItems }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-2">
      {menuItems.map(item => (
        <MenuItem key={item.id} item={item} />
      ))}
    </div>
  );
};

export default MenuList;