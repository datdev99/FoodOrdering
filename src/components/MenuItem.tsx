import React from 'react';
import { Card, Typography, Button } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useCart } from '../hooks/useCart';
import { MenuItem as MenuItemType } from '../types';

const { Title, Text } = Typography;

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const { id, name, description, price, image } = item;
  const { addToCart, removeFromCart, getItemQuantity } = useCart();
  const quantity = getItemQuantity(id);

  return (
    <Card className="overflow-hidden shadow-sm">
      <div className="flex">
        <div className="w-24 h-24 bg-gray-200 rounded-md mr-4 flex-shrink-0 flex items-center justify-center">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover rounded-md" />
          ) : (
            <Text type="secondary" className="text-xs">Hình ảnh</Text>
          )}
        </div>
        <div className="flex-grow">
          <Title level={5} className="mb-1">{name}</Title>
          <Text type="secondary" className="text-sm block mb-3 line-clamp-2">{description}</Text>
          <div className="flex justify-between items-center">
            <Text className="text-red-500 font-semibold">{price.toLocaleString()}đ</Text>
            <div className="flex items-center">
              <Button
                type="primary"
                shape="circle"
                icon={<MinusOutlined />}
                size="small"
                disabled={quantity === 0}
                onClick={() => removeFromCart(id)}
                className="flex items-center justify-center"
              />
              <span className="mx-3 font-medium">{quantity}</span>
              <Button
                type="primary"
                shape="circle"
                icon={<PlusOutlined />}
                size="small"
                onClick={() => addToCart(item)}
                className="flex items-center justify-center"
              />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default MenuItem;