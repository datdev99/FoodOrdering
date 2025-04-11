// src/components/Header.tsx
import React from 'react';
import { Card, Typography } from 'antd';

const { Title, Text } = Typography;

const Header: React.FC = () => {
  return (
    <Card className="mb-4 shadow-md" bodyStyle={{ padding: '16px' }}>
      <div className="flex items-center justify-between">
        <div>
          <Title level={4} className="mb-0">Nhà hàng Ngon Phố</Title>
          <Text type="secondary">Ẩm thực Việt Nam</Text>
        </div>
        <div className="w-16 h-16 rounded-lg bg-red-500 flex items-center justify-center text-white font-bold">
          NP
        </div>
      </div>
      <div className="mt-3 bg-gray-100 py-2 px-3 rounded-md">
        <Text strong>Bàn số: 15</Text>
      </div>
    </Card>
  );
};

export default Header;