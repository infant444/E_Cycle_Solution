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

export const TaskAcceptedReplyMail = (staffName: string, projectName: string, task: string, description: string, due: string, priority: string, estimate_time: string) => {
  return {
    body: {
      name: staffName,
      intro: `✅ Thank you for accepting the task ${task} in the project ${projectName}.`,
      action: {
        instructions: `Here’s a quick summary of your assigned task:`,
        button: {
          color: '#4F46E5',
          text: 'View Task in Dashboard',
          link: `https://yourapp.com/tasks/${task}`
        }
      },
      dictionary: {
        'Task Name': task,
        'Description': description,
        'Priority': priority,
        'Due Date': due,
        'Estimated Time': `${estimate_time} hrs`
      },
      outro: `We appreciate your dedication and timely action. You can always view task progress and updates in your dashboard.`,
      signature: 'Best regards,\nRI planIt Team'
    }
  };


}
export const greatEmployee = (staffName: string, username: string, passcode: string) => {
  return {
    body: {
      name: staffName,
      intro: `🎉 Congratulations and welcome to E-Cycle Solutions! We’re excited to have you join our team.`,
      action: {
        instructions: 'Here are your login credentials to access your staff portal:',
        button: {
          color: '#22BC66',
          text: 'Go to Staff Portal',
          link: 'https://portal.ecyclesolutions.com/login'
        }
      },
      dictionary: {
        'Username': username,
        'Password': passcode
      },
      outro: [
        'Please keep your credentials secure and do not share them with anyone.',
        'We’re thrilled to have you with us — wishing you success and growth ahead!',
        'Warm regards,',
        'E-Cycle Solutions HR Team'
      ]
    }
  }

}

export const passwordChanged = (name: string) => {
  return {
    body: {
      name: name, // e.g., 'Infant Raj'
      intro: "Your password has been successfully reset.",
      action: {
        instructions:
          "If you didn’t request this password reset, please secure your account immediately using the button below:",
        button: {
          color: '#0d6efd', // Bootstrap primary blue
          text: 'Secure My Account',
          link: 'https://yourprojectlink.com/security',
        },
      },
      outro:
        "If you did request this change, you can safely ignore this email. For your safety, we recommend using a strong and unique password.",
    },
  };
}

export const resetPassword = (username: string, passcode: string) => {
  return {
    body: {
      name: username,
      intro: `Your password has been reset by the Admin Team.`,
      dictionary:{ 'Temporary Password': passcode },
      action: {
        instructions:
          'Use the temporary password to log in and make sure to change it immediately for security.',
        button: {
          color: '#0d6efd', // Blue button
          text: 'Login Now',
          link: 'http://localhost:4200/login',
        },
      },
      outro:
        'If you did not expect this password reset, please contact your administrator immediately.',
    },
  };
}


export const schudeleMeeting = (name: string, title: string, start_date: string, start_time: string, end_time: string, meetingType: string, meetingDescription: string) => {
  return {
    body: {
      name: `${name}`,
      intro: `
      <p style="font-size: 16px; line-height: 1.6; color: #444;">
        You have been scheduled for a meeting titled <b>${title}</b>.
      </p>
      <p style="font-size: 15px; line-height: 1.6; color: #555;">
        📅 <b>Date:</b> ${start_date}<br>
        🕒 <b>Time:</b> ${start_time} - ${end_time}<br>
        📍 <b>Type:</b> ${meetingType}
      </p>
      <p style="font-size: 15px; line-height: 1.6; color: #555;">
        ${meetingDescription}
      </p>
    `,
      action: {
        instructions: "Click the button below to add this meeting to your calendar:",
        button: {
          color: "#1a73e8",
          text: "Add to Calendar",
          link: "cid:meeting.ics", // not required, optional for look
        },
      },
      outro: "We look forward to your participation.",
    },
  };

}