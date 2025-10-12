const BASEURL="http://localhost:5000"

import { environment } from "../../environment/environment.pord";


// const BASEURL=environment.production?'':'http://localhost:5000';
// employee
export const EMPLOYEE_BASE_URL=BASEURL+"/api/user";
export const LOGIN=EMPLOYEE_BASE_URL+"/login";
export const GET_ALL_STAFF=EMPLOYEE_BASE_URL+"/getAll";
export const GET_ALL_PROJECT_MEMBER=EMPLOYEE_BASE_URL+"/get-data/project-member";
export const GET_By_ID_STAFF=EMPLOYEE_BASE_URL+"/getById/";
export const REGISTER=EMPLOYEE_BASE_URL+"/register";
export const LOGOUT=EMPLOYEE_BASE_URL+"/logout/";
export const RESETPASSWORD=EMPLOYEE_BASE_URL+"/resetPassword/";
export const UPDATE_DETAIL=EMPLOYEE_BASE_URL+"/update/";
export const CHANGE_PASSWORD=EMPLOYEE_BASE_URL+"/updatePassword/";
export const UPDATE_LOCK_STATUS=EMPLOYEE_BASE_URL+"/update-status/";
export const DELETE_STAFF=EMPLOYEE_BASE_URL+"/delete/"
// Admin




// Client
export const CLIENT_BASE_URL=BASEURL+"/api/client";
export const ADD_CLIENT=CLIENT_BASE_URL+"/addClient";
export const GET_ALL_CLIENT=CLIENT_BASE_URL+"/getAll";
export const UPDATE_CLIENT=CLIENT_BASE_URL+"/update/";
export const GET_CLIENT_BY_ID=CLIENT_BASE_URL+"/get/";
export const DELETE_BY_ID_CLIENT=CLIENT_BASE_URL+"/delete/";


// Project

export const Project_BASE_URL=BASEURL+"/api/project";
export const ADD_PROJECT=Project_BASE_URL+"/add";
export const GET_ALL_PROJECT=Project_BASE_URL+"/getall";
export const GET_BY_ID_PROJECT=Project_BASE_URL+"/get/";
export const GET_BY_ClIENT_ID_PROJECT=Project_BASE_URL+"/get-by-client/";
export const GET_BY_MANAGER_ID=Project_BASE_URL+'/getByManager';
export const GET_BY_STAFF=Project_BASE_URL+'/getByStaff';
export const GET_BY_STAFF_ID=Project_BASE_URL+'/getByStaffId';
export const GET_BY_PARTICULAR_ID=Project_BASE_URL+'/get/paticularStaff/';
export const UPDATE_ALL_PROJECT=Project_BASE_URL+"/update/";
export const UPDATE_STATUS_PROJECT=Project_BASE_URL+"/update/status/";
export const DELETE_BY_ID_PROJECT=Project_BASE_URL+"/delete/";


// Task
export const ADD_TASK=Project_BASE_URL+"/task/add";
export const GET_ALL_TASK=Project_BASE_URL+"/task/getall/";
export const GET_BY_ID_TASK=Project_BASE_URL+"/task/get/";
export const GET_ALL_TASK_STATUS=Project_BASE_URL+"/task/getTask/";
export const GET_ALL_TASK_BY_MANGER=Project_BASE_URL+"/task/getAll/manager";
export const GET_TASK_COUNT=Project_BASE_URL+"/task/getCount";
export const GET_TASK_By_Staff=Project_BASE_URL+"/task/getByStaffId";
export const GET_TASK_By_PARTICULAR_Staff=Project_BASE_URL+"/task/get/paticularStaff/";

export const UPDATE_STATUS_TASK=Project_BASE_URL+"/task/status/update/";
export const UPDATE_TASK=Project_BASE_URL+"/task/update/";
export const DELETE_TASK=Project_BASE_URL+"/task/delete/";

// Time sheet

export const TIME_SHEET=BASEURL+'/api/timeSheet';
export const ADD_TIME_SHEET=TIME_SHEET+'/add';
export const GET_ALL_TIME_SHEET_WEEK=TIME_SHEET+'/getAll/weak';
export const GET_ALL_TIME_SHEET_STAFF=TIME_SHEET+'/getAll/staff';
export const GET_TIME_SHEET_ID=TIME_SHEET+'/get/';
export const GET_WEEK_HOUR=TIME_SHEET+'/get/totalHour/weak';
export const GET_TODAY_HOUR=TIME_SHEET+'/get/totalHour/today';
export const GET_WEEK_HOUR_REPORT=TIME_SHEET+'/get/report/week';
export const GET_TODAY_TASK_REPORT=TIME_SHEET+'/get/report/today';
export const GET_MONTH_TASK_REPORT=TIME_SHEET+'/get/report/month';
export const GET_TIME_TASK_REPORT=TIME_SHEET+'/get/report/all';
export const GET_ALL_TIME_SHEET_MANAGER=TIME_SHEET+"/getall/manager";
export const UPDATE_TIME_SHEET_STATUS=TIME_SHEET+"/update/";


// Inventory



// Marketing
