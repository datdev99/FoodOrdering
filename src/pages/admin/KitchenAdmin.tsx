import { useState, useEffect } from 'react';
import { Clock, CheckCircle, AlertCircle, Users, ChefHat, Timer, Bell, DollarSign, Receipt } from 'lucide-react';

const KitchenAdmin = () => {
  const [orders, setOrders] = useState([
    {
      id: 'DH001',
      tableNumber: 5,
      customerName: 'Nguyễn Văn A',
      items: [
        { id: 1, name: 'Phở Bò Tái', quantity: 2, status: 'pending', cookTime: 15, price: 85000 },
        { id: 2, name: 'Cơm Gà Nướng', quantity: 1, status: 'cooking', cookTime: 20, startTime: Date.now() - 300000, price: 65000 }
      ],
      orderTime: new Date(Date.now() - 600000),
      priority: 'normal',
      paymentStatus: 'unpaid',
      totalAmount: 235000
    },
    {
      id: 'DH002',
      tableNumber: 3,
      customerName: 'Trần Thị B',
      items: [
        { id: 3, name: 'Bún Bò Huế', quantity: 1, status: 'pending', cookTime: 18, price: 75000 },
        { id: 4, name: 'Chả Cá Lã Vọng', quantity: 2, status: 'pending', cookTime: 25, price: 120000 }
      ],
      orderTime: new Date(Date.now() - 300000),
      priority: 'high',
      paymentStatus: 'unpaid',
      totalAmount: 315000
    },
    {
      id: 'DH003',
      tableNumber: 8,
      customerName: 'Lê Minh C',
      items: [
        { id: 5, name: 'Bánh Mì Thịt Nướng', quantity: 3, status: 'ready', cookTime: 10, price: 35000 },
        { id: 6, name: 'Cà Phê Sữa Đá', quantity: 2, status: 'ready', cookTime: 5, price: 25000 }
      ],
      orderTime: new Date(Date.now() - 900000),
      priority: 'normal',
      paymentStatus: 'paid',
      totalAmount: 155000
    },
    {
      id: 'DH004',
      tableNumber: 12,
      customerName: 'Phạm Văn D',
      items: [
        { id: 7, name: 'Phở Gà', quantity: 1, status: 'ready', cookTime: 12, price: 70000 },
        { id: 8, name: 'Nem Rán', quantity: 1, status: 'ready', cookTime: 8, price: 45000 }
      ],
      orderTime: new Date(Date.now() - 1200000),
      priority: 'normal',
      paymentStatus: 'paid',
      totalAmount: 115000
    }
  ]);

  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const updateItemStatus = (orderId, itemId, newStatus) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          items: order.items.map(item => {
            if (item.id === itemId) {
              const updatedItem = { ...item, status: newStatus };
              if (newStatus === 'cooking') {
                updatedItem.startTime = Date.now();
              }
              return updatedItem;
            }
            return item;
          })
        };
      }
      return order;
    }));
  };

  const updatePaymentStatus = (orderId, newPaymentStatus) => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          paymentStatus: newPaymentStatus
        };
      }
      return order;
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cooking': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'ready': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800 border-green-200';
      case 'unpaid': return 'bg-red-100 text-red-800 border-red-200';
      case 'partial': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500';
      case 'normal': return 'bg-blue-500';
      case 'low': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  const getCookingTime = (item) => {
    if (item.status === 'cooking' && item.startTime) {
      const elapsed = Math.floor((Date.now() - item.startTime) / 1000 / 60);
      return `${elapsed}/${item.cookTime} phút`;
    }
    return `${item.cookTime} phút`;
  };

  const getFilteredOrders = () => {
    if (activeTab === 'all') return orders;
    if (activeTab === 'paid') return orders.filter(order => order.paymentStatus === 'paid');
    if (activeTab === 'unpaid') return orders.filter(order => order.paymentStatus === 'unpaid');
    return orders.filter(order => 
      order.items.some(item => item.status === activeTab)
    );
  };

  const getOrderStats = () => {
    const allItems = orders.flatMap(order => order.items);
    const totalRevenue = orders.filter(order => order.paymentStatus === 'paid')
      .reduce((sum, order) => sum + order.totalAmount, 0);
    const unpaidRevenue = orders.filter(order => order.paymentStatus === 'unpaid')
      .reduce((sum, order) => sum + order.totalAmount, 0);
    
    return {
      pending: allItems.filter(item => item.status === 'pending').length,
      cooking: allItems.filter(item => item.status === 'cooking').length,
      ready: allItems.filter(item => item.status === 'ready').length,
      total: allItems.length,
      totalRevenue,
      unpaidRevenue,
      paidOrders: orders.filter(order => order.paymentStatus === 'paid').length,
      unpaidOrders: orders.filter(order => order.paymentStatus === 'unpaid').length
    };
  };

  const stats = getOrderStats();

  return (
    <div className=''>
      <div className="min-h-screen bg-gray-50 p-4">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <ChefHat className="h-8 w-8 text-orange-600" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Quản Lý Nhà Bếp</h1>
                <p className="text-gray-600">Hệ thống tiếp nhận và xử lý đơn hàng</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Thời gian hiện tại</p>
                <p className="text-lg font-semibold text-gray-900">{formatTime(currentTime)}</p>
              </div>
              <Bell className="h-6 w-6 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Chờ xử lý</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Đang chế biến</p>
                <p className="text-2xl font-bold text-blue-600">{stats.cooking}</p>
              </div>
              <Timer className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Hoàn thành</p>
                <p className="text-2xl font-bold text-green-600">{stats.ready}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Tổng đơn</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <Users className="h-8 w-8 text-gray-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Doanh thu</p>
                <p className="text-lg font-bold text-green-600">{formatCurrency(stats.totalRevenue)}</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Chưa thanh toán</p>
                <p className="text-lg font-bold text-red-600">{formatCurrency(stats.unpaidRevenue)}</p>
              </div>
              <Receipt className="h-8 w-8 text-red-600" />
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'all', name: 'Tất cả', count: orders.length },
                { id: 'pending', name: 'Chờ xử lý', count: stats.pending },
                { id: 'cooking', name: 'Đang chế biến', count: stats.cooking },
                { id: 'ready', name: 'Hoàn thành', count: stats.ready },
                { id: 'paid', name: 'Đã thanh toán', count: stats.paidOrders },
                { id: 'unpaid', name: 'Chưa thanh toán', count: stats.unpaidOrders }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-orange-500 text-orange-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.name} ({tab.count})
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Orders List */}
        <div className="grid grid-cols-3 gap-4">
          {getFilteredOrders().map(order => (
            <div key={order.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${getPriorityColor(order.priority)}`}></div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {order.id} - Bàn {order.tableNumber}
                    </h3>
                    <span className="text-sm text-gray-500">{order.customerName}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Thời gian đặt</p>
                    <p className="text-sm font-medium text-gray-900">{formatTime(order.orderTime)}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPaymentStatusColor(order.paymentStatus)}`}>
                      {order.paymentStatus === 'paid' ? 'Đã thanh toán' : 
                       order.paymentStatus === 'unpaid' ? 'Chưa thanh toán' : 'Thanh toán một phần'}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Tổng tiền</p>
                    <p className="text-lg font-bold text-gray-900">{formatCurrency(order.totalAmount)}</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="space-y-3">
                  {order.items.map(item => (
                    <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <h4 className="font-medium text-gray-900">{item.name}</h4>
                          <span className="text-sm text-gray-500">x{item.quantity}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(item.status)}`}>
                            {item.status === 'pending' ? 'Chờ xử lý' : 
                            item.status === 'cooking' ? 'Đang chế biến' : 'Hoàn thành'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-sm text-gray-500">
                            Thời gian: {getCookingTime(item)}
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            {formatCurrency(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        {item.status === 'pending' && (
                          <button
                            onClick={() => updateItemStatus(order.id, item.id, 'cooking')}
                            className="px-3 py-1 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
                          >
                            Bắt đầu
                          </button>
                        )}
                        {item.status === 'cooking' && (
                          <button
                            onClick={() => updateItemStatus(order.id, item.id, 'ready')}
                            className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                          >
                            Hoàn thành
                          </button>
                        )}
                        {item.status === 'ready' && (
                          <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-md">
                            Sẵn sàng phục vụ
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Payment Actions */}
                <div className="mt-4 pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-700">Trạng thái thanh toán:</span>
                    <div className="flex space-x-2">
                      {order.paymentStatus === 'unpaid' && (
                        <button
                          onClick={() => updatePaymentStatus(order.id, 'paid')}
                          className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                        >
                          Đánh dấu đã thanh toán
                        </button>
                      )}
                      {order.paymentStatus === 'paid' && (
                        <button
                          onClick={() => updatePaymentStatus(order.id, 'unpaid')}
                          className="px-3 py-1 bg-red-600 text-white text-sm rounded-md hover:bg-red-700 transition-colors"
                        >
                          Đánh dấu chưa thanh toán
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {getFilteredOrders().length === 0 && (
          <div className="text-center py-12">
            <ChefHat className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Không có đơn hàng nào trong danh mục này</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default KitchenAdmin;