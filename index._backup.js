// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');
// TODO: Create an array of questions for user input
const userHeaders = [
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

const sectionsInfo = [
   {
      sectionName: 'Description',
      sectionPrompts: [
         {
            type: 'editor',
            name: 'description',
            message: 'Please write a short application description of at least 100 characters.',
            validate(text) {
               if (text.length < 100) {
                  return 'Must be at least 100 characters.';
               }

               return true;
            },
         },
      ],
   },
   {
      sectionName: 'Installation',
      sectionPrompts: [
         {
            type: 'editor',
            name: 'installation',
            message: 'Please provide a step-by-step description of how to get the development environment running.',
            validate(text) {
               if (text.length <= 0) {
                  return 'This section cannot be empty.';
               }
               return true;
            },
         },
      ],
   },
   {
      sectionName: 'Usage',
      sectionPrompts: [
         {
            type: 'input',
            name: 'usage',
            message: 'Provide instructions and examples for use. Include screenshots as needed.',
         },
      ],
   },
   {
      sectionName: 'Credits',
      sectionPrompts: [
         {
            type: 'input',
            name: 'credits',
            message: 'credits',
         },
      ],
   },
   {
      sectionName: 'License',
      sectionPrompts: [
         {
            type: 'input',
            name: 'license',
            message: 'license',
         },
      ],
   },
   {
      sectionName: 'Badges',
      sectionPrompts: [
         {
            type: 'input',
            name: 'badges',
            message: 'badges',
         },
      ],
   },
   {
      sectionName: 'Features',
      sectionPrompts: [
         {
            type: 'input',
            name: 'features',
            message: 'features',
         },
      ],
   },
   {
      sectionName: 'Contributing',
      sectionPrompts: [
         {
            type: 'input',
            name: 'contributing',
            message: 'contributing',
         },
      ],
   },
   {
      sectionName: 'Tests',
      sectionPrompts: [
         {
            type: 'input',
            name: 'tests',
            message: 'tests',
         },
      ],
   },
   {
      sectionName: 'Questions',
      sectionPrompts: [
         {
            type: 'input',
            name: 'questions',
            message: 'questions',
         },
      ],
   },
];

//TODO: Create a function to write README file
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

function promptData(promptArr) {
   return inquirer.prompt(promptArr);
}

// TODO: Create a function to initialize app
function init() {
   return promptData(userHeaders);
}

// Function call to initialize app
init()
   .then((headers) => {
      headers.sections.forEach((headerName) => {
         //console.log(headerName);
         var sectionPrompts = [];
         var index = sectionsInfo.findIndex((sectionElem) => sectionElem.sectionName === headerName);
         sectionPrompts = sectionsInfo[index].sectionPrompts;
         return inquirer.prompt(sectionPrompts);
      });
   })
   .then(console.log('\n completed '));


//var sectionsData = inquirer.prompt(sectionsInfo);

// .then((data) => {
//    return generateMarkdown(data);
// })
// .then((readmeData) => {
//    return writeToFile('./README.md', readmeData);
// })
// .then((writeResponse) => console.log(writeResponse))
