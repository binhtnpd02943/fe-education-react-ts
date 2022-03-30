import { CustomError } from "@/shared/api/aloApi";
import { ListResponse } from "@/shared/model/base-response.comon";
import { City } from "@/shared/model/city.model";
import { createAction } from "@reduxjs/toolkit";

import { CityType } from "./type";


export const fetchCityListRequest = createAction<undefined>(
    CityType.FETCH_CITY_LIST_REQUEST
);

export const fetchCityListSuccess = createAction<ListResponse<City>>(
    CityType.FETCH_CITY_LIST_REQUEST_SUCCESS
);

export const fetchCityListFailed = createAction<CustomError>(
    CityType.FETCH_CITY_LIST_REQUEST_FAILED
);