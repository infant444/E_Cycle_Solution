export const projectAssignedEmployee = (name: string, companyName: string, project: string, due: string, manager: string) => {
  return {
    "body": {
      "name": name,
      "intro": "We are pleased to inform you that you have been officially assigned to a new project at " + companyName + ".",
      "dictionary": {
        "Project Name": project,
        "Due Date": new Date(due).toISOString().split('T')[0],
        "Manager": manager
      },
      "action": {
        "instructions": "Please confirm your availability and readiness for this assignment by clicking the button below:",
        "button": {
          "color": "#22BC66",
          "text": "Confirm Assignment",
          "link": "https://localhost:4200/confirm"
        }
      },
      "outro": "If you have any questions or need further details, feel free to reach out to your project manager or HR."
    }
  }

}

export const ProjectAssignedManager = (name: string, project: string, company: string, due: string, staff: string[],) => {
  return {
   "body": {
  "name": name,
  "intro": "You have been officially assigned to oversee the " + project + " for " + company + ".",
  "dictionary": {
    "Project Name": project,
    "Client/Company": company,
    "Due Date": new Date(due).toISOString().split("T")[0],
    "Team Members": staff.join(", ")
  },
  "action": {
    "instructions": "You can review the complete project details and requirements by clicking the button below:",
    "button": {
      "color": "#22BC66",
      "text": "View Project Details",
      "link": "https://localhost:4200/project"
    }
  },
  "outro": "If you have any questions or require additional resources, please reach out to the project coordination team."
}

  }

}

export const TaskAssignedForStaff = (staffName: string, projectName: string, TaskName: string, Description: String, due: string, priority: number, projectId: string) => {
  return {
    body: {
      name: staffName,
      intro: `You have been assigned a new task in the project **${projectName}**.`,
      dictionary: {
        "Task": TaskName,
        "Description": Description,
        "Deadline": new Date(due).toISOString().split('T')[0],
        "Priority": priority == 3 ? 'High' : priority == 2 ? 'Medium' : 'Low'
      },
      action: [
        {
          instructions: 'Please confirm whether you accept this task:',
          button: {
            color: '#22BC66', // Green
            text: '✅ Accept Task',
            link: `https://yourcompany.com/task/accept?id=${projectId}`
          }
        },
        {
          instructions: '',
          button: {
            color: '#DC3545', // Red
            text: '❌ Decline Task',
            link: `https://yourcompany.com/task/decline?id=${projectId}`
          }
        }
      ],
      outro: 'If you have any questions or concerns, feel free to reply to this email.'
    }

  }

}