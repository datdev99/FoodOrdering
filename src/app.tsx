import React, { useState } from 'react';
import { Layout } from 'antd';
import Header from './components/Header';
import CategoryTabs from './components/CategoryTabs';
import MenuList from './components/MenuList';
import CartButton from './components/CartButton';
import CartDrawer from './components/CartDrawer';
import { CartProvider } from './hooks/useCart';
import { menuData } from './data/menuData';
import { Category } from './types';

const { Content } = Layout;

const App: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  
  const categories: Category[] = [
    { key: 'all', label: 'Tất cả' },
    { key: 'appetizer', label: 'Khai vị' },
    { key: 'main', label: 'Món chính' },
    { key: 'dessert', label: 'Tráng miệng' },
    { key: 'drinks', label: 'Đồ uống' },
  ];

  const filteredMenu = selectedCategory === 'all' 
    ? menuData 
    : menuData.filter(item => item.category === selectedCategory);

  return (
    <CartProvider>
      <Layout className="min-h-screen bg-gray-100">
        <Content className="max-w-3xl mx-auto pb-24">
          <Header />
          <CategoryTabs 
            categories={categories} 
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
          <MenuList menuItems={filteredMenu} />
        </Content>
        <CartButton onClick={() => setIsCartOpen(true)} />
        <CartDrawer 
          open={isCartOpen} 
          onClose={() => setIsCartOpen(false)} 
        />
      </Layout>
    </CartProvider>
  );
};

export default App;