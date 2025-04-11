import { Button, Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useCart } from '../hooks/useCart';

interface CartButtonProps {
  onClick: () => void;
}

const CartButton: React.FC<CartButtonProps> = ({ onClick }) => {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
      <Badge count={totalItems} offset={[-8, 0]}>
        <Button
          type="primary"
          size="large"
          icon={<ShoppingCartOutlined />}
          onClick={onClick}
          className="px-6 h-12 rounded-full shadow-lg"
        >
          Giỏ hàng
        </Button>
      </Badge>
    </div>
  );
};

export default CartButton;
