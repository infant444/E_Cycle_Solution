import { Routes } from '@angular/router';
import { Home } from './Components/home/home';
import { Dashboard } from './Components/dashboard/dashboard';
import { AuthGuard } from './guard/auth/auth-guard';
import { MeetingComponent } from './Components/meeting/meeting.component';


export const routes: Routes = [
  {
    path: "",
    component: Home,
    canActivate: [AuthGuard]
  },
  {
    path: "admin/dashboard",
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
        children: [
          {
            path: '',
            loadComponent: () => import("./Components/my-project/my-project.component").then(m => m.MyProjectComponent),
            canActivate: [AuthGuard]
          },
          {
            path: "view/:projectid",
            loadComponent: () => import("./Components/view-my-project/view-my-project.component").then(m => m.ViewMyProjectComponent),
            canActivate: [AuthGuard]
          }
        ],
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
        children: [
          {
            path: '',
            loadComponent: () => import("./Components/my-task/my-task.component").then(m => m.MyTaskComponent),
            canActivate: [AuthGuard]
          },
          {
            path: "view/:taskId",
            loadComponent: () => import("./Components/view-my-task/view-my-task.component").then(m => m.ViewMyTaskComponent),
            canActivate: [AuthGuard]
          }
        ],

        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: "time-sheet",
    children: [
      {
        path: '',
        loadComponent: () => import("./Components/time-sheet/time-sheet").then(m => m.TimeSheetComponent,),
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
    path: "admin/time-sheet",
    loadComponent: () => import("./Components/admin-time-sheet/admin-time-sheet.component").then(m => m.AdminTimeSheetComponent),
    canActivate: [AuthGuard]
  },
  {
    path: "employee",
    children: [
      {
        path: '',
        loadComponent: () => import("./Components/employee/employee.component").then(m => m.EmployeeComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'view/:id',
        loadComponent: () => import("./Components/view-employee/view-employee.component").then(m => m.ViewEmployeeComponent),
        canActivate: [AuthGuard]
      },{
        path:'edit/:id',
        loadComponent: () => import("./Components/employee/employee.component").then(m => m.EmployeeComponent),
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path:'meeting',
    children:[
      {
        path:'',
        loadComponent:()=>import("./Components/meeting/meeting.component").then(m=>m.MeetingComponent),
        canActivate: [AuthGuard]
      },
      {
        path:'view/:id',
        loadComponent:()=>import("./Components/view-meeting/view-meeting.component").then(m=>m.ViewMeetingComponent),
        canActivate: [AuthGuard]
      },
        {
        path:'edit/:id',
        loadComponent:()=>import("./Components/meeting/meeting.component").then(m=>m.MeetingComponent),
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
