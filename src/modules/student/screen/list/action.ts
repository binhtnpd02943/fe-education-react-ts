import { CustomError } from "@/shared/api/aloApi";
import { builderActionType, createBaseActionTable } from "@/shared/helper/action.helper";
import { ListResponse } from "@/shared/model/base-response.comon";
import { Student } from "@/shared/model/student.model";
import { createAction } from "@reduxjs/toolkit";
import { StudentActionType } from "./type";


export const actionTable = createBaseActionTable(builderActionType('LIST_STUDENT'))
export const getListStudentRequest = createAction<any>(
    StudentActionType.GET_LIST_STUDENT_REQUEST
)

export const getListStudentSuccess = createAction<ListResponse<Student>>(
    StudentActionType.GET_LIST_STUDENT_SUCCESS
)

export const getListStudentFailure = createAction<CustomError>(
    StudentActionType.GET_LIST_STUDENT_FAILURE
)

export const deleteStudentRequest = createAction<any>(
    StudentActionType.DELETE_STUDENT_REQUEST
)

export const deleteStudentSuccess = createAction<ListResponse<Student>>(
 StudentActionType.DELETE_STUDENT_SUCCESS
)

export const deleteStudentFailure = createAction<CustomError>(
    StudentActionType.DELETE_STUDENT_FAILURE
)

