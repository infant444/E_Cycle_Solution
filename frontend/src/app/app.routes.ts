import { Routes } from '@angular/router';
import { Home } from './Components/home/home';
import { Dashboard } from './Components/dashboard/dashboard';
import { AuthGuard } from './guard/auth/auth-guard';
import { LoginGuard } from './guard/login/login-guard';


export const routes: Routes = [
  {
    path: "",
    component: Home,
    canActivate:[AuthGuard]
  },
  {
    path: "admin",
    component: Dashboard,
    canActivate:[AuthGuard]
  },
  {
    path: "login",
    loadComponent: () => import("./Components/login/login").then(m => m.Login),
  },
  {
    path: "inventory",
    loadComponent: () => import("./Components/inventory/inventory").then(m => m.Inventory),
    canActivate:[AuthGuard]

  },
  {
    path: "time-sheet",
    loadComponent: () => import("./Components/time-sheet/time-sheet").then(m => m.TimeSheet,),
    canActivate:[AuthGuard]
  },
  {
    path:"client",
    loadComponent:()=>import("./Components/client/client").then(m=>m.Client),
    canActivate:[AuthGuard]
  },
  {
     path:"project",
    loadComponent:()=>import("./Components/project/project").then(m=>m.Project),
    canActivate:[AuthGuard]
  },
  {
    path: "time-sheet/weak-view",
    loadComponent: () => import("./Components/time-sheet-week-view/time-sheet-week-view").then(m => m.TimeSheetWeekView),
    canActivate:[AuthGuard]

  },
  {
    path: "time-sheet/report",
    loadComponent: () => import("./Components/time-report/time-report").then(m => m.TimeReport),
    canActivate:[AuthGuard]

  },

  {
    path: "time-sheet/**",
    redirectTo: "/time-sheet"
  },
  { path: "**", redirectTo: '' },

];
