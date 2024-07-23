import { SectionBody } from '@/components/common';
import { Badge } from 'antd';
import { OnlAccountSearch } from './onl-account.search';
import { OnlAccountTable } from './onl-account.table';

export const OnlAccount = () => {
  return (
    <div className="mt-5">
      <SectionBody
        title={
          <div className="flex items-center gap-3">
            Tài khoản đang online
            <Badge count={12} className="badge-error" />
          </div>
        }
      >
        <OnlAccountSearch />
        <OnlAccountTable />
      </SectionBody>
    </div>
  );
};
