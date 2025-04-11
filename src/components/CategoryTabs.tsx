import React from 'react';
import { Tabs } from 'antd';
import { Category } from '../types';

interface CategoryTabsProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ 
  categories, 
  selectedCategory, 
  onSelectCategory 
}) => {
  return (
    <Tabs
      activeKey={selectedCategory}
      onChange={onSelectCategory}
      className="mb-4 bg-white p-2 rounded-lg shadow-sm"
      items={categories.map(category => ({
        key: category.key,
        label: category.label,
      }))}
      centered
    />
  );
};

export default CategoryTabs;