const inquirer = require('inquirer');
const db = require('./database/connection');

db.connect(err => {
    if (err) throw err;
    console.log('Database connected.');
    employee_tracker();
});

var employee_tracker = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'options',
            message: 'What would you like to do?',
            choices: [
                'View All Employees',
                'View All Departments',
                'View All Roles',
                'Add Employee',
                'Add Department',
                'Add Role',
                'Update Employee Role',
                'Exit'
            ]
        }
    ]).then(answer => {
        switch (answer.options) {
            case 'View All Employees':
                viewAllEmployees();
                break;
            case 'View All Departments':
                viewAllDepartments();
                break;
            case 'View All Roles':
                viewAllRoles();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Add Department':
                addDepartment();
                break;
            case 'Add Role':
                addRole();
                break;
            case 'Update Employee Role':
                updateEmployeeRole();
                break;
            case 'Exit':
                db.end();
                break;
        }
    });
} inquirer.prompt([
    type: 'input',
    name: 'role',
    message: 'What is the role?'
    validate: roleInput => {
        if (roleInput) {
            return true;
        } else {
            console.log('Please enter a role!');
            return false;
        }
    }
])
    type: 'input',
    name: 'salary',
    message: 'What is the salary?'
    validate: salaryInput => {
        if (salaryInput) {
            return true;
        } else {
            console.log('Please enter a salary!');
            return false;
        }
    }
    type: 'list',
    name: 'department',
    message: 'What is the department?',
    choices: ['Sales', 'Engineering', 'Finance', 'Legal']
    validate: departmentInput => {
        if (departmentInput) {
            return true;
        } else {
            console.log('Please enter a department!');
            return false;
        }
    }
]).then(answer => {
    for (let i = 0; i < answer.length; i++) {
        if (answer[i].department === 'Sales') {
            answer[i].department = 1;
        } else if (answer[i].department === 'Engineering') {
            answer[i].department = 2;
        } else if (answer[i].department === 'Finance') {
            answer[i].department = 3;
        } else if (answer[i].department === 'Legal') {
            answer[i].department = 4;
        }
    }
} else if (answer.options === 'Update Employee Role') {
    db.query('SELECT * FROM employee', (err, rows) => {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Which employee would you like to update?',
                choices: rows.map(employee => {
                    return {
                        name: `${employee.first_name} ${employee.last_name}`,
                        value: employee.id
                    }
                })
            }
        ]).then(answer => {
            db.query('SELECT * FROM role', (err, rows) => {
                if (err) throw err;
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'role',
                        message: 'What is the new role?',
                        choices: rows.map(role => {
                            return {
                                name: role.title,
                                value: role.id
                            }
                        })
                    }
                ]).then(roleAnswer => {
                    db.query('UPDATE employee SET role_id = ? WHERE id = ?', [roleAnswer.role, answer.employee], (err, result) => {
                        if (err) throw err;
                        console.log('Employee role updated.');
                        employee_tracker();
                    });
                });
            });
        });
    }
    ).then(answer => {
        for (let i = 0; i < answer.length; i++) {
            if (answer[i].role === 'Sales Lead') {
                answer[i].role = 1;
            } else if (answer[i].role === 'Salesperson') {
                answer[i].role = 2;
            } else if (answer[i].role === 'Lead Engineer') {
                answer[i].role = 3;
            } else if (answer[i].role === 'Software Engineer') {
                answer[i].role = 4;
            } else if (answer[i].role === 'Accountant') {
                answer[i].role = 5;
            } else if (answer[i].role === 'Legal Team Lead') {
                answer[i].role = 6;
            } else if (answer[i].role === 'Lawyer') {
                answer[i].role = 7;
            }
        }
    }
    
