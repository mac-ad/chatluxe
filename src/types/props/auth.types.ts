import { Dispatch } from "react";

export interface authFormPropsInterface {
  handleSubmit: any;
  onSubmit: Function;
  register: any;
  setPage: Dispatch<string>;
  loading: boolean;
  errors: any;
  setValue: any;
  trigger: any;
}
