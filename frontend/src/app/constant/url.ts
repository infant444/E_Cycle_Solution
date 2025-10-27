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
// Dashboard
export const DASHBOARD_BASE_URL=BASEURL+"/api/dashboard";
export const GET_STATES=DASHBOARD_BASE_URL+"/get/states";
export const GET_TASK_STATUS_GROUP=DASHBOARD_BASE_URL+"/get/task-status";
export const GET_CLIENT_GROUP=DASHBOARD_BASE_URL+"/get/client-group";
export const GET_INVENTORY_GROUP=DASHBOARD_BASE_URL+"/get/inventory";
export const GET_RECENT_PRODUCT=DASHBOARD_BASE_URL+'/get/recent-inventory';
export const GET_TOP_CLIENT=DASHBOARD_BASE_URL+'/get/recent-client';
export const GET_PENDING_TIMESHEET=DASHBOARD_BASE_URL+'/get/recent-pending-timeSheet';
export const GET_STAFF_STATES=DASHBOARD_BASE_URL+"/staff/get/states";

// Client
export const CLIENT_BASE_URL=BASEURL+"/api/client";
export const ADD_CLIENT=CLIENT_BASE_URL+"/addClient";
export const GET_ALL_CLIENT=CLIENT_BASE_URL+"/getAll";
export const GET_CLIENT_BY_ID=CLIENT_BASE_URL+"/get/";
export const GET_CLIENT_COLLECTION_DETAIL=CLIENT_BASE_URL+"/get-recent/collection/";
export const GET_CLIENT_PRODUCT_DETAIL=CLIENT_BASE_URL+"/get-recent/product/";
export const GET_CLIENT_TASK_DETAIL=CLIENT_BASE_URL+"/get-task/";

export const UPDATE_CLIENT=CLIENT_BASE_URL+"/update/";
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
export const INVENTORY_BASE_URL=BASEURL+'/api/inventory';
export const INVENTORY_MAKE_PURCHASE=INVENTORY_BASE_URL+'/add-inventory';
export const ADD_SALES_ON_INVENTORY=INVENTORY_BASE_URL+"/product/add-sales";
export const INVENTORY_STATE=INVENTORY_BASE_URL+'/inventory/state';
export const GET_ALL_INVENTORY=INVENTORY_BASE_URL+"/get/allCollection";
export const GET_INVENTORY_BY_ID=INVENTORY_BASE_URL+"/get/inventory/";
export const GET_PRODUCT_BY_STAFF=INVENTORY_BASE_URL+"/get-recent/productByStaff";
export const GET_PRODUCT_BY_CLIENT=INVENTORY_BASE_URL+"/get-recent/productByClient/";
export const PARTICULAR_INVENTORY_STATE=INVENTORY_BASE_URL+'/particular-inventory/state/';
export const GET_TRANSACTION_FROM_PARTICULAR_INVENTORY=INVENTORY_BASE_URL+"/inventory/get-transaction/";
export const GET_PRODUCT_FROM_PARTICULAR_INVENTORY=INVENTORY_BASE_URL+"/get/product/";


// Meeting
export const MEETING_BASE_URL=BASEURL+"/api/meeting";
export const ADD_MEETING=MEETING_BASE_URL+"/add";
export const GET_ALL_MEETING=MEETING_BASE_URL+"/get/all";
export const GET_ALL_MEETING_UPCOMING=MEETING_BASE_URL+'/get/all/upcoming';
export const GET_BY_MEETING_STAFF=MEETING_BASE_URL+'/get/user/';
export const GET_BY_MEETING_STAFF_UPCOMING=MEETING_BASE_URL+'/get/user/upcoming/';
export const GET_BY_MEETING_MY_UPCOMING=MEETING_BASE_URL+'/get/my/upcoming/';
export const GET_BY_MEETING_ID=MEETING_BASE_URL+'/get/meeting/';
export const UPDATE_MEETING_DETAIL=MEETING_BASE_URL+'/update/all/';
export const UPDATE_MEETING_STATUS=MEETING_BASE_URL+'/update/status/';
export const DELETE_BY_ID_MEETING=MEETING_BASE_URL+'/delete/meeting/';

// Notification
export const NOTIFICATION_BASE_URL=BASEURL+'/api/notification';
export const GET_ALL_NOTIFICATION=NOTIFICATION_BASE_URL+"/getAll";
export const GET_NOT_READ_NOTIFICATION=NOTIFICATION_BASE_URL+"/get/notRead";
export const MAKE_IT_READ=NOTIFICATION_BASE_URL+"/make-read/";
