export const projectAssignedEmployee=(name:string,companyName:string,project:string,due:string,manager:string)=>{
    return {
  "body": {
    "name": name,
    "intro": "We are pleased to inform you that you have been officially assigned to a new project at"+companyName+".",
    "table": {
      "data": [
        {
          "Project Name": ""+project,
          "Due Date": ""+due,
          "Manager": ""+manager
        }
      ],
      "columns": {
        "customWidth": {
          "Project Name": "30%",
          "Due Date": "20%",
          "Manager": "30%"
        },
        "customAlignment": {
          "Project Name": "left",
          "Due Date": "center",
          "Manager": "left"
        }
      }
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

export const ProjectAssignedManager=(name:string,project:string,company:string,due:string,staff:string[])=>{
    return {
  "body": {
    "name": ""+name,
    "intro": "You have been officially assigned to oversee the **"+project+"** for **"+company+"**.",
    "table": {
      "data": [
        {
          "Project Name": ""+project+"",
          "Client/Company": ""+company+"",
          "Due Date": "["+due+"]",
          "Team Members": staff.map((x)=>{
            return x+", "
          })
        }
      ],
      "columns": {
        "customWidth": {
          "Project Name": "25%",
          "Client/Company": "25%",
          "Due Date": "25%",
          "Team Members": "25%"
        },
        "customAlignment": {
          "Project Name": "left",
          "Client/Company": "left",
          "Due Date": "center",
          "Team Members": "left"
        }
      }
    },
    "action": {
      "instructions": "You can review the complete project details and requirements by clicking the button below:",
      "button": {
        "color": "#22BC66",
        "text": "View Project Details",
        "link": "https://localhost:4200/"
      }
    },
    "outro": "If you have any questions or require additional resources, please reach out to the project coordination team."
  }
}

}