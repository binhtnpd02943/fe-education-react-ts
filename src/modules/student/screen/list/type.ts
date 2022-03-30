import { Student } from "@/shared/model/student.model";
import {NgxTableState} from '@/fe-helper/core/components/ngx-table/type'

export type StudentState = {
    isLoading: boolean;
    data: Student[];
    error: string;
  } & NgxTableState

  export interface ListStudentModel {
    tableSelection: any[],
    dataSource: any[],
  }
export enum StudentActionType {
    GET_LIST_STUDENT_REQUEST = '@@STUDENT/GET_LIST_STUDENT_REQUEST',
    GET_LIST_STUDENT_SUCCESS = '@@STUDENT/GET_LIST_STUDENT_SUCCESS',
    GET_LIST_STUDENT_FAILURE = '@@STUDENT/GET_LIST_STUDENT_FAILURE',

    DELETE_STUDENT_REQUEST = '@@STUDENT/DELETE_STUDENT_REQUEST',
    DELETE_STUDENT_SUCCESS = '@@STUDENT/DELETE_STUDENT_SUCCESS',
    DELETE_STUDENT_FAILURE = '@@STUDENT/DELETE_STUDENT_FAILURE',
}