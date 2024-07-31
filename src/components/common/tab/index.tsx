import { Badge } from 'antd';

const TabLabelWithBadge = ({ title, count }: { title: string; count: number }) => {
  return (
    <div className="flex items-center justify-center gap-3">
      <span>{title}</span>
      {count > 0 && <Badge count={count} className="badge-error" overflowCount={100000} />}
    </div>
  );
};

export { TabLabelWithBadge };
