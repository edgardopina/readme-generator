// TODO: Include packages needed for this application
const inquirer = require('inquirer');

// TODO: Create an array of questions for user input
const userQuestions = [
   // generate questions for sections to be included
   {
      type: 'input',
      name: 'projectTitle',
      message: 'What is the title of your project? (Required)',
      validate: (titleInput) => {
         if (titleInput) {
            return true;
         } else {
            console.log('Please enter the name of your project.');
            return false;
         }
      },
   },
   {
      type: 'checkbox',
      name: 'sections',
      message: 'What sections would you like to include? (Check all that apply)',
      choices: [
         {
            name: 'Description',
            checked: true,
         },
         { name: 'Table of Contents' },
         { name: 'Installation' },
         { name: 'Usage' },
         { name: 'Credits' },
         { name: 'License' },
         { name: 'Badges' },
         { name: 'Features' },
         { name: 'Contributing' },
         { name: 'Tests' },
         { name: 'Questions' },
      ],
      validate(answer) {
         if (answer.length < 1) {
            return 'You must choose at least one section.';
         }
         return true;
      },
   },
];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {}

// TODO: Create a function to initialize app
function init() {
   return inquirer.prompt(userQuestions);
}

// Function call to initialize app
init();
