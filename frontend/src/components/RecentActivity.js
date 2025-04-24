import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

const RecentActivity = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const response = await axios.get('/api/product-history');
        setActivities(response.data.data);
      } catch (error) {
        console.error('Lỗi khi lấy hoạt động:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, []);

  if (loading) {
    return <div>Đang tải...</div>;
  }

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-xl font-semibold mb-4">Hoạt động gần đây</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity._id} className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-blue-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600">
                Đã thêm sản phẩm <span className="font-medium">{activity.productName}</span>
              </p>
              <p className="text-xs text-gray-400">
                {format(new Date(activity.createdAt), 'HH:mm dd/MM/yyyy', { locale: vi })}
              </p>
            </div>
          </div>
        ))}
        {activities.length === 0 && (
          <p className="text-gray-500 text-center">Chưa có hoạt động nào</p>
        )}
      </div>
    </div>
  );
};

export default RecentActivity; 