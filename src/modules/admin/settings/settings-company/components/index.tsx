'use client';

import { SectionBody } from '@/components/common';
import { CompanyForm } from './company.form';

export const SettingsCompanyIndex = () => {
  return (
    <div className="mt-5 lg:pr-3">
      <SectionBody title="Cài đặt công ty">
        <CompanyForm />
      </SectionBody>
    </div>
  );
};
