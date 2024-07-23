type DepartmentStatsType = {
  branch: {
    name: string;
    deparment: {
      name: string;
      manager?: {
        avatar: string;
        name: string;
      };
      deputyQuantity?: number;
      assistantQuantity?: number;
      ownerQuantity?: number;
      staffQuantity?: number;
      learnerQuantity?: number;
      totalMember: number;
      fluctuations?: {
        type: 'increase' | 'decrease';
        count: number;
      };
    };
  };
};

export { type DepartmentStatsType };
