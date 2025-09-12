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


// Project



// Task



// Time sheet


// Inventory



// Marketing
