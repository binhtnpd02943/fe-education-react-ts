import { FormType } from "../api/type";


export type BaseDropdownModel = {
  id: any,
  label: string,
  name?: string,
  type?: FormType,
}