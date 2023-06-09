type ApplicationError = {
  name: string;
  message: string;
};

type UserDataProps = {
  email: string;
  password: string;
};

type SignupDataProps = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type BuyAndSaleStockRequestProps = {
  walletId?: number;
  stock: string;
  price: number;
  quantity: number;
};

export {
  ApplicationError,
  UserDataProps,
  SignupDataProps,
  BuyAndSaleStockRequestProps,
};
