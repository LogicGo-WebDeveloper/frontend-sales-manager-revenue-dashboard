import React from 'react';
import { Skeleton, Card } from 'antd';

const CardSkeleton = ({ count = 2, className = '' }) => {
  return (
    <div className={className}>
      {Array.from({ length: count }).map((_, idx) => (
        <Card
          key={idx}
          className="mb-4 rounded-xl shadow-sm"
          style={{ marginBottom: 16, backgroundColor: '#fff' }}
        >
          <Skeleton
            active
            avatar
            title
            paragraph={{ rows: 3, width: ['100%', '100%', '100%'] }}
          />
        </Card>
      ))}
    </div>
  );
};

export default CardSkeleton;