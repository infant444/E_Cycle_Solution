const BASEURL="http://localhost:5000"

import { environment } from "../../environment/environment.pord";


// const BASEURL=environment.production?'':'http://localhost:5000';
// employee
export const EMPLOYEE_BASE_URL=BASEURL+"/api/user";
export const LOGIN=EMPLOYEE_BASE_URL+"/login";
export const GET_ALL_STAFF=EMPLOYEE_BASE_URL+"/getAll";



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
export const UPDATE_ALL_PROJECT=Project_BASE_URL+"/update/";
export const DELETE_BY_ID_PROJECT=Project_BASE_URL+"/delete/";


// Task

export const ADD_TASK=Project_BASE_URL+"/task/add";
export const GET_ALL_TASK=Project_BASE_URL+"/task/getall/";
export const GET_BY_ID_TASK=Project_BASE_URL+"/task/get/";
export const UPDATE_STATUS_TASK=Project_BASE_URL+"/task/status/update/";


// Time sheet


// Inventory



// Marketing
