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

export { ApplicationError, UserDataProps, SignupDataProps };
