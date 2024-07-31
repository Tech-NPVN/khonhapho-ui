import { Select } from 'antd';

type SelectAddonOption = {
  value: string;
  display_value: string;
};

type SelectAddonProps = {
  options: SelectAddonOption[];
  defaultValue?: SelectAddonOption['value'];
  className?: string;
};

const SelectAddon = ({ options, defaultValue, className }: SelectAddonProps) => {
  return (
    <Select defaultValue={defaultValue} className={className}>
      {options.map(({ display_value, value }) => (
        <Select.Option key={value} value={value}>
          {display_value}
        </Select.Option>
      ))}
    </Select>
  );
};

export { SelectAddon, type SelectAddonOption, type SelectAddonProps };
