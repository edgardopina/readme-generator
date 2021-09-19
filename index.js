// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown');
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
function writeToFile(fileName, data) {
   return new Promise((resolve, reject) => {
      fs.writeFile(fileName, data, (err) => {
         // if there's an error, reject the Promise and send the error to the Promise's `.catch()` method
         if (err) {
            reject(err);
            // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
            return;
         }
         // if everything went well, resolve the Promise and send the successful data to the `.then()` method
         resolve({
            ok: true,
            message: 'File created!',
         });
      });
   });
}

// TODO: Create a function to initialize app
function init() {
   return inquirer.prompt(userQuestions);
}

// Function call to initialize app
init()
   .then((data) => {
      return generateMarkdown(data);
   })
   .then((readmeData) => {
      return writeToFile('./README.md', readmeData);
   })
   .then(writeResponse => console.log(writeResponse));

//#region region
// const questions = [
//    {
//       type: 'editor',
//       name: 'bio',
//       message: 'Please write a short bio of at least 3 lines.',
//       validate(text) {
//          if (text.split('\n').length < 3) {
//             return 'Must be at least 3 lines.';
//          }

//          return true;
//       },
//    },
// ];
//#endregion
