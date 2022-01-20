const mysql = require("mysql2");
const inquirer = require("inquirer");

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "",
        database: "employee_management_db"
    },
    console.log(`Connected to EMS_db.`)
);

const start = () => {
  inquirer
    .prompt(
        {
            type: "list",
            name: "startMenu",
            message: "Welcome to Employee Management System. Please select an option.",
            choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"],
        }
    )
    .then(response => {
        switch (response.startMenu) {
            case "View all departments":
                db.query("SELECT departmentsName AS 'Department Name', departmentsId AS 'Department Id' FROM departments", (err, result) => {
                    err ? console.log(err) : console.table(result);
                    start();
                }
                );
                break;
            case "View all roles":
                db.query("SELECT rolesId AS 'Role ID', job_title AS 'Job Title', departmentsName AS 'Department Name', roles.salary AS 'Salary' FROM roles JOIN departments on roles.departmentsId = departments.departmentsId", (err, result) => {
                    err ? console.log(err) : console.table(result);
                    start();
                });
                break;
            case "View all employees":
                db.query("SELECT id AS 'Employee Id', first_name AS 'First name', last_name AS 'Last name', manager_id AS 'Manager', roles.salary AS 'Salary', roles.job_title AS 'Job Title', departments.departmentsName AS 'Department Name' FROM employees JOIN roles ON roles.rolesId = employees.roles_id  JOIN departments ON roles.departmentsId  = departments.departmentsId", (err, result) => {
                    err ? console.log(err) : console.table(result);
                    start();
                });
                break;
            case "Add a department":
                inquirer
                    .prompt( 
                        {
                            type: "input",
                            name: "department",
                            message: "What is the name of the department?"
                        }
                    )
                    .then(response => {
                        db.query("INSERT INTO departments (departmentsName) VALUES (?)", response.department, (err, result) => {
                            console.log(response.department + ` added to Departments.`);
                            start();
                        });
                    })
                    .catch(err => console.log(err));
                break;
            case "Add a role":
                db.query("SELECT * FROM departments", (err, depResult) => {
                    let depChoices = [];
                    for (let i = 0; i < depResult.length; i++) {
                        depChoices.push(depResult[i].departmentsName);
                    }
                    inquirer
                        .prompt([
                            {
                                type: "input",
                                name: "title",
                                message: "What is the name of the role?"
                            },
                            {
                                type: "input",
                                name: "salary",
                                message: "What is the salary of the role?"
                            },
                            {
                                type: "list",
                                name: "department",
                                message: "Which department does the role belong to?",
                                choices: depChoices,
                            }
                        ])
                    .then(response => {
                        db.query("SELECT * FROM departments WHERE departments.departmentsName = ?", response.department, (err, result) => {
                        db.query("INSERT INTO roles (job_title, salary, departmentsId) VALUES (?, ?, ?)", [response.title, response.salary, result[0].departmentsId], (err, result) => {
                        err ? console.log(err) : console.log(`${response.title} added to Roles.`);
                        start();
                    });
                    });
                    })
                    .catch(err => console.log(err));
                });
                break;
case "Add an employee":
    db.query("SELECT * FROM roles", (err, roleResult) => {
        let roleChoices = [];
        for (let i = 1; i < roleResult.length; i++) {
            roleChoices.push(roleResult[i].job_title);
        }
        db.query("SELECT * FROM employees", (err, managerResult) => {
            let managerChoices = [];
            for (let i = 0; i < managerResult.length; i++) {
                let fullName = [managerResult[i].manager_id];
                managerChoices.push(fullName.join(" "));
            }
            inquirer
                .prompt([
                    {
                        type: "input",
                        name: "firstname",
                        message: "What is the employee's first name?"
                    },
                    {
                        type: "input",
                        name: "lastname",
                        message: "What is the employee's last name?"
                    },
                    {
                        type: "list",
                        name: "role",
                        message: "What is the employee's role?",
                        choices: roleChoices
                    },
                    {
                        type: "list",
                        name: "manager",
                        message: "Who is the employee's manager?",
                        choices: managerChoices
                    }
                ])
                .then(response => {
                    db.query("SELECT * FROM roles WHERE job_title = ?", response.role, (err, result) => {
                    db.query("SELECT * FROM employees WHERE manager_id = ?", response.manager, (err, managerResults) => {
                    db.query("INSERT INTO employees (first_name, last_name, roles_id, manager_id) VALUES (?, ?, ?, ?)", [response.firstname, response.lastname, result.rolesId, managerResults.manager_id], (err, result) => {
                        err ? console.log(err) : console.log(`${response.firstname} ${response.lastname} added to Employees.`);
                        start();
                });
                });
                });
                })
                .catch(err => console.log(err));
        });
    });
    break;
    case "Update an employee role":
        db.query("SELECT * FROM employees", (err, employeeResult) => {
            let employeeChoices = [];
                for (let i = 0; i < employeeResult.length; i++) {
                    let fullName = [employeeResult[i].rolesId];
                    employeeChoices.push(fullName.join(" "));
                }
            db.query("SELECT * FROM roles", (err, roleResult) => {
                let roleChoices = [];
                for (let i = 1; i < roleResult.length; i++) {
                    roleChoices.push(roleResult[i].job_title);
                }
                inquirer
                 .prompt([
                    {
                        type: "list",
                        name: "employee",
                        message: "Which employee's role do you want to update?",
                        choices: employeeChoices
                    },
                    {
                        type: "list",
                        name: "role",
                        message: "Which role do you want to assign to the selected employee?",
                        choices: roleChoices
                    }
                        ])
                        .then(response => {
                        db.query("SELECT * FROM roles WHERE rolesId = ?", response.role, (err, roleResponse) => {
                        db.query("UPDATE employees SET roles_id = ? WHERE first_name = ? AND last_name = ?", [roleResponse.roles_id, response.employee.split(" ")[0], response.employee.split(" ")[1]], (err, employeeResponse) => {
                        err ? console.log(err) : console.log(`Updated ${response.employee.split(" ")[0]} ${response.employee.split(" ")[1]}'s role.`);
                        start();
                        });
                        });
                        })
                 .catch(err => console.log(err));
            });
        });
        break;
    default:
        start();
}})
        .catch(err => console.log(err));
}

start();