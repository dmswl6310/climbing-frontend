export interface InputProps {
  name: string;
  title: string;
  type?: string;
  placeholder?: string;
  onChange?: (event: { target: { value: string } }) => Promise<void> | void;
  message?: string;
  buttonText?: string;
  onClick?: any;
}
