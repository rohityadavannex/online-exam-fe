type StaffType = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  image?: string;
  status: boolean;
  staff: {
    designation: string;
    department: string;
    gender: number;
  };
};

export default StaffType;
