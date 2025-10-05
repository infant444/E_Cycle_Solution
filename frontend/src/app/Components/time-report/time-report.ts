import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Title } from "../../sub_component/title/title";
import { TimesheetBaseNav } from "../../sub_component/timesheet-base-nav/timesheet-base-nav";
import { CommonModule, formatDate } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ChartData, ChartOptions } from 'chart.js';
import { Task } from '../../model/task.model';
import { ProjectServices } from '../../Services/project/project.services';
import { TimeSheet } from '../../model/timesheet.model';
import { TimeSheetService } from '../../Services/timesheet/time-sheet.service';
import { UserServices } from '../../Services/user/user';
@Component({
  selector: 'app-time-report',
  imports: [Title, TimesheetBaseNav, CommonModule, NgChartsModule],
  templateUrl: './time-report.html',
  styleUrl: './time-report.css'
})
export class TimeReport implements OnInit {


  lastMonthTimeSheet?: TimeSheet[];
  currentWeekStart = new Date();
  weekTotal = 0;
  weekdays: string[] = [];
  dateRange!: string;
  barChartData!: ChartData<'bar'>;
  barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `Hours: ${tooltipItem.raw} hrs`;
          }
        }
      },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: '#444',
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
      title: {
        display: true,
        text: 'Last 7 Day-wise Hours Report',
        font: {
          size: 20
        },
        color: '#222'
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#333',
          font: { size: 12 }
        },
        grid: {
          color: 'rgba(200,200,200,0.3)',
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: '#333',
          font: { size: 12 }
        },
        grid: {
          color: 'rgba(200,200,200,0.2)',
        }
      }
    }
  };
  barChartData1!: ChartData<'bar'>;

  barChartOptions1: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `Hours: ${tooltipItem.raw} hrs`;
          }
        }
      },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          color: '#444',
          font: {
            size: 14,
            weight: 'bold'
          }
        }
      },
      title: {
        display: true,
        text: 'Today Task-wise Hours Report',
        font: {
          size: 20
        },
        color: '#222'
      }
    },
    scales: {
      x: {
        ticks: {
          color: '#333',
          font: { size: 12 }
        },
        grid: {
          color: 'rgba(200,200,200,0.3)',
        }
      },
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          color: '#333',
          font: { size: 12 }
        },
        grid: {
          color: 'rgba(200,200,200,0.2)',
        }
      }
    }
  };
  constructor(
    private projectService: ProjectServices,
    private timeSheetService: TimeSheetService,
    private cd: ChangeDetectorRef,
    private userServices: UserServices
  ) { }
  ngOnInit(): void {
    this.barChartOptions.animation = {
      duration: 1500,
      easing: 'easeOutBounce'
    };
    this.timeSheetService.getReportWeek().subscribe((res) => {
      console.log(res)
      const labels = res.map(t => {
        const d = new Date(t.date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${day}/${month}/${year}`;
      });

      const hours = res.map(t => parseInt((parseInt(t.day_hours.toString()) / 3600).toString()));

      this.barChartData = {
        labels: labels,
        datasets: [
          {
            label: 'Total Hours',
            data: hours,
            backgroundColor: ['rgba(54, 162, 235, 0.7)',
              'rgba(255, 99, 132, 0.7)',
              'rgba(255, 206, 86, 0.7)']
          }
        ]
      };
      this.cd.markForCheck()
    });
    this.timeSheetService.getReportToday().subscribe((res) => {
      const labels = res.map(t => t.task_name);
      const hours = res.map(t => parseInt((parseInt(t.today_hour.toString()) / 3600).toString()));

      this.barChartData1 = {
        labels: labels,
        datasets: [
          {
            label: 'Total Hours',
            data: hours,
            backgroundColor: ['rgba(54, 162, 235, 0.7)',
              'rgba(255, 99, 132, 0.7)',
              'rgba(255, 206, 86, 0.7)']
          }
        ]
      };
      this.cd.markForCheck()
    })
    this.timeSheetService.getReportMonth().subscribe((res) => {
      this.lastMonthTimeSheet = res;
      this.cd.markForCheck();
    })

  }


  sectoHr(x: string): number {
    return (parseInt(x.toString()) / 3600)
  }
  getTime(dateStr: string): Date {
    const today = new Date();
    const [hours, minutes] = dateStr.split(':').map(Number);
    today.setHours(hours, minutes, 0);
    return today;
  }
  downloadCSV(data: TimeSheet[] | undefined = this.lastMonthTimeSheet, filename: string = this.userServices.currentUser.name + '_timeSheet_Monthly_report.csv'): void {
    if (!data || !data.length) {
      return;
    }

    const formatTime = (time: string) => {
      const d = new Date(`1970-01-01T${time}`);
      return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
    };
    const formatDate=(date:any)=>{
        const d = new Date(date);
        const year = d.getFullYear();
        const month = String(d.getMonth() + 1).padStart(2, '0');
        const day = String(d.getDate()).padStart(2, '0');
        return `${day}/${month}/${year}`;
      }
    // Step 2: Map rows -> convert object values into CSV format
    const filteredData = data.map(item => {
      const { task, project, ...rest } = item;


      return {
        ...rest,
        date: formatDate(item.date),
        start_time: formatTime(item.start_time),
        end_time: formatTime(item.end_time),
        total_hours: parseInt((parseInt(item.total_hours.toString()) / 3600).toString()),
        staff: this.userServices.currentUser.name || item.staff,
      };
    });
    const rows = filteredData.map(row => {
      return Object.values(row).map(val => `"${val}"`).join(',');
    });
    const headers = Object.keys(filteredData[0]).join(',');

    const csvContent = [headers, ...rows].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
  }
}

