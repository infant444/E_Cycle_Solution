import { Routes } from '@angular/router';
import { Home } from './Components/home/home';
import { Dashboard } from './Components/dashboard/dashboard';
import { AuthGuard } from './guard/auth/auth-guard';
import { LoginGuard } from './guard/login/login-guard';


export const routes: Routes = [
  {
    path: "",
    component: Home,
    canActivate: [AuthGuard]
  },
  {
    path: "admin",
    component: Dashboard,
    canActivate: [AuthGuard]
  },
  {
    path: "login",
    loadComponent: () => import("./Components/login/login").then(m => m.Login),
  },
  {
    path: "inventory",
    loadComponent: () => import("./Components/inventory/inventory").then(m => m.Inventory),
    canActivate: [AuthGuard]

  },

  {
    path: "client",
    children: [
      {
        path: '',
        loadComponent: () => import("./Components/client/client").then(m => m.Client),
      },
      {
        path: 'edit/:id',
        loadComponent: () => import("./Components/client/client").then(m => m.Client),
      },
      {
        path: 'view/:clientId',
        loadComponent: () => import("./Components/view-client/view-client.component").then(m => m.ViewClientComponent),
      }
    ],
    canActivate: [AuthGuard]

  },
  {
    path: "project",
    children: [
      {
        path: '',
        loadComponent: () => import("./Components/project/project").then(m => m.Project),
        canActivate: [AuthGuard]
      }, {
        path: "view/:projectid",
        loadComponent: () => import("./Components/view-project/view-project.component").then(m => m.ViewProjectComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'edit/:projectid',
        loadComponent: () => import("./Components/project/project").then(m => m.Project),
        canActivate: [AuthGuard]
      },
      {
        path: "myProject",
        loadComponent: () => import("./Components/my-project/my-project.component").then(m => m.MyProjectComponent),
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: "task",
    children: [
      {
        path: '',
        loadComponent: () => import("./Components/task/task.component").then((m => m.TaskComponent)),
        canActivate: [AuthGuard]
      }, {
        path: 'view/:taskId',
        loadComponent: () => import("./Components/view-task/view-task.component").then((m => m.ViewTaskComponent)),
        canActivate: [AuthGuard]
      },
      {
        path: 'edit/:taskId',
        loadComponent: () => import("./Components/task/task.component").then((m => m.TaskComponent)),
        canActivate: [AuthGuard]
      }, {
        path: 'myTask',
        loadComponent: () => import("./Components/my-task/my-task.component").then(m => m.MyTaskComponent),
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: "time-sheet",
    children: [
      {
        path: '',
        loadComponent: () => import("./Components/time-sheet/time-sheet").then(m => m.TimeSheet,),
        canActivate: [AuthGuard]
      },
      {
        path: "weak-view",
        loadComponent: () => import("./Components/time-sheet-week-view/time-sheet-week-view").then(m => m.TimeSheetWeekView),
        canActivate: [AuthGuard]

      },
      {
        path: "report",
        loadComponent: () => import("./Components/time-report/time-report").then(m => m.TimeReport),
        canActivate: [AuthGuard]

      },
    ]

  },

  {
    path: "time-sheet/**",
    redirectTo: "/time-sheet"
  },
  { path: "**", redirectTo: '' },

];
