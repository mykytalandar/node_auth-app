export type FormErrors = {
  name: string;
  email: string;
  password: string;
};

export type LoginFormErrors = Omit<FormErrors, 'name'>;


