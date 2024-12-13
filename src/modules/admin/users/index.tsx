'use client';

import UsersHeader from './users-header';
import UsersTable from './users-table';

/** (Admin) Index trang thành viên */
const UsersIndex = () => {
  return (
    <div className="m-4 lg:ms-0">
      <div>
        <UsersHeader
          onFilterChange={(value) => {
            console.log(value);
          }}
        />
      </div>
      <div className="mt-4 bg-white dark:bg-primary_color_d rounded-lg overflow-hidden pb-4">
        <UsersTable />
      </div>
    </div>
  );
};

export default UsersIndex;
