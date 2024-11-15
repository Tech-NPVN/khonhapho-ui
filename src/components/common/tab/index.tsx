import { Badge } from 'antd';

type TabLabelWithBadge = {
  title: string;
  count: number;
  className?: string;
  overflowCount?: number;
};

const TabLabelWithBadge = ({
  title,
  count,
  className,
  overflowCount = 99,
}: TabLabelWithBadge) => {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`}>
      <span>{title}</span>
      {count > 0 && <Badge count={count} className="badge-error" overflowCount={overflowCount} />}
    </div>
  );
};

export { TabLabelWithBadge };
