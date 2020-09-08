const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const teamMemberArr = [];


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// function to start app
function appStart() {
    createHTML();
    createMember();
}

// function to create a team member
function createMember() {
    // get basic employee information
    inquirer.prompt([
        {
            name: 'name',
            type: 'input',
            message: 'Enter team member name: ',
        },
        {
            name: 'id',
            type: 'input',
            message: 'Enter id of team member: ',
        },
        {
            name: 'email',
            type: 'input',
            message: 'Enter team member email: '
        },
        {
            name: 'role',
            type: 'list',
            message: 'Select team member role',
            choices: [
                'Manager',
                'Engineer',
                'Intern'
            ]
        }
    ])
        // create a selector for role based information
        .then(function (name, id, email, role) {
            // create role type information
            let roleType = "";
            if (role === "Engineer") {
                roleType = "GitHub username"
            } else if (role === "Intern") {
                roleType = "school name"
            } else {
                roleType = "office phone number"
            }
            // get role based infomation and determine if more team members are needed
            inquirer.prompt([
                {
                    name: 'roleType',
                    type: 'input',
                    message: `Enter team member ${roleType}`

                },
                {
                    name: 'moreMember',
                    type: 'list',
                    message: 'Do you need to add another team member?',
                    choices: [
                        'yes',
                        'no'
                    ]
                }
            ])
                // create a team member isntance
                .then(function (roleType, moreMember) {
                    let newTeamMember = "";
                    if (role === "Manager") {
                        newTeamMember = new Manager(name, id, email, roleType)
                    } else if (role === "Engineer") {
                        newTeamMember = new Engineer(name, id, email, roleType)
                    } else {
                        newTeamMember = new Intern(name, id, email, roleType)
                    }
                    // add instance to team member array
                    //consonle.log(newTeamMember)
                    teamMemberArr.push(newTeamMember)
                    // loop through team members until complete
                    if (moreMember === "yes") {
                        createMember()
                    }
                    createHTML()
                })
        })
}

// function to create an html page
function createHTML() {
    // check if output directory exists
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR)
    }
    fs.writeFileSync(outputPath, render(teamMemberArr))
}

// start the application
appStart()

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
