import { Routes } from '@angular/router';
import { Home } from './Components/home/home';


export const routes: Routes = [
  { path: "", component: Home },
  { path: "login", loadComponent: () => import("./Components/login/login").then(m => m.Login) },
  { path: "inventory", loadComponent: () => import("./Components/inventory/inventory").then(m => m.Inventory) },
  {
    path: "time-sheet",
    loadComponent: () => import("./Components/time-sheet/time-sheet").then(m => m.TimeSheet,),
    children:[
      {path:"weak-view",loadComponent:()=>import("./Components/time-sheet-week-view/time-sheet-week-view").then(m=>m.TimeSheetWeekView)}
    ]
  }
];
