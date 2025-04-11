import React from 'react';
import { Drawer, List, Button, Typography, Divider, message, Empty } from 'antd';
import { MinusOutlined, PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { useCart } from '../hooks/useCart';
import { CartItem } from '../types';

const { Title, Text } = Typography;

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const { cartItems, addToCart, removeFromCart, clearCart, getTotalPrice } = useCart();
  
  const handleCheckout = () => {
    if (cartItems.length > 0) {
      message.success('Đơn hàng của bạn đã được gửi đến nhà bếp và sẽ được phục vụ trong thời gian sớm nhất!');
      clearCart();
      onClose();
    } else {
      message.warning('Vui lòng chọn món trước khi đặt hàng!');
    }
  };

  return (
    <Drawer
      title="Giỏ hàng của bạn"
      placement="bottom"
      onClose={onClose}
      open={open}
      height={500}
      extra={
        <Button type="text" onClick={clearCart} disabled={cartItems.length === 0}>
          <DeleteOutlined /> Xóa tất cả
        </Button>
      }
      footer={
        <div>
          <div className="flex justify-between items-center py-3">
            <Title level={4} className="m-0">Tổng cộng:</Title>
            <Title level={4} className="m-0 text-red-500">{getTotalPrice().toLocaleString()}đ</Title>
          </div>
          <Button 
            type="primary" 
            block 
            size="large"
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
          >
            Đặt hàng
          </Button>
        </div>
      }
    >
      {cartItems.length === 0 ? (
        <Empty description="Giỏ hàng trống" />
      ) : (
        <List
          itemLayout="horizontal"
          dataSource={cartItems}
          renderItem={(item: CartItem) => (
            <List.Item>
              <List.Item.Meta
                title={item.name}
                description={
                  <Text className="text-red-500">{item.price.toLocaleString()}đ</Text>
                }
              />
              <div className="flex items-center">
                <Button
                  type="text"
                  icon={<MinusOutlined />}
                  onClick={() => removeFromCart(item.id)}
                  className="flex items-center justify-center"
                />
                <span className="mx-2 w-6 text-center">{item.quantity}</span>
                <Button
                  type="text"
                  icon={<PlusOutlined />}
                  onClick={() => addToCart(item)}
                  className="flex items-center justify-center"
                />
              </div>
            </List.Item>
          )}
        />
      )}
    </Drawer>
  );
};

export default CartDrawer;