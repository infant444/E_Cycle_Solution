import { Routes } from '@angular/router';
import { Home } from './Components/home/home';
import { TimeSheetWeekView } from './Components/time-sheet-week-view/time-sheet-week-view';


export const routes: Routes = [
  { path: "", component: Home },
  {
    path: "login",
    loadComponent: () => import("./Components/login/login").then(m => m.Login)
  },
  {
    path: "inventory",
    loadComponent: () => import("./Components/inventory/inventory").then(m => m.Inventory)
  },
  {
    path: "time-sheet",
    loadComponent: () => import("./Components/time-sheet/time-sheet").then(m => m.TimeSheet,),
  },
  {
    path: "time-sheet/weak-view",
    loadComponent: () => import("./Components/time-sheet-week-view/time-sheet-week-view").then(m => m.TimeSheetWeekView)
  },
  {
    path:"time-sheet/report",
    loadComponent:()=>import("./Components/time-report/time-report").then(m=>m.TimeReport)
  },
];
