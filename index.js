// TODO: Include packages needed for this application
import { writeFile } from 'fs';
import inquirer from 'inquirer';
import generateMarkdown from './utils/generateMarkdown.js';
import licenseList from './utils/licenseList.js';
import { makeBadge, ValidationError } from 'badge-maker';
import fetch from 'node-fetch';

// TODO: Create an array of questions for user input
const userPrompts = [
   {
      type: 'input',
      name: 'projectTitle',
      message: "\nPlease enter your PROJECT'S TITLE? (Required)",
      validate: (notEmpty) => {
         if (notEmpty) {
            return true;
         } else {
            return false;
         }
      },
   },
   {
      type: 'editor',
      name: 'description',
      message:
         '\nEnter a short DESCRIPTION explaining the what, why, and how of your project. What was your motivation? Why did you build this project? What problem does it solve? What did you learn? What makes your project stand out?. (Required)',
      validate: (notEmpty) => {
         if (notEmpty) {
            return true;
         } else {
            return false;
         }
      },
   },
   {
      type: 'confirm',
      name: 'confirmInstallation',
      message: '\nDo you want to add an INSTALLATION section?',
      default: true,
   },
   {
      type: 'editor',
      name: 'installation',
      message:
         '\nWhat are the steps required to INSTALL  your project? Provide a step-by-step description of how to get the development environment running or leave EMPTY.',
      when: (answers) => answers.confirmInstallation,
   },
   {
      type: 'confirm',
      name: 'confirmUsage',
      message: '\nDo you want to add an USAGE section?',
      default: true,
   },
   {
      type: 'editor',
      name: 'usage',
      message:
         '\nProvide USAGE instructions and examples for use, include screenshots/videos as needed or leave EMPTY.',
      when: (answers) => answers.confirmUsage,
   },
   {
      type: 'confirm',
      name: 'confirmCredits',
      message: '\nDo you want to add a CREDITS section?',
      default: true,
   },
   {
      type: 'editor',
      name: 'credits',
      message:
         '\nList your collaborators CREDITS, if any, with links to their GitHub profiles. If you used any third-party assets that require attribution, list the creators with links to their primary web presence in this section. If you followed tutorials, include links to those here as well or leave EMPTY.',
      when: (answers) => answers.confirmCredits,
   },
   {
      type: 'confirm',
      name: 'confirmLicense',
      message: '\nDo you want to add a LICENSE section?',
      default: true,
   },
   {
      type: 'input',
      name: 'licenseGrantor',
      message: 'Enter the name of the LICENSE GRANTOR: (Required)',
      validate: (notEmpty) => {
         if (notEmpty) {
            return true;
         } else {
            return false;
         }
      },
      when: (answers) => answers.confirmLicense,
   },
   {
      type: 'list',
      name: 'licenseType',
      message:
         'Select from one of the following LICENSE TYPES: (for a detailed explanation, please visit https://choosealicense.com)',
      choices: licenseList.name,
      loop: false,
      when: (answers) => answers.confirmLicense,
   },
   {
      type: 'confirm',
      name: 'confirmFeatures',
      message: '\nDo you want to add a FEATURES section?',
      default: true,
   },
   {
      type: 'editor',
      name: 'features',
      message: '\nAdd your project main FEATURES here or leave EMPTY.',
      when: (answers) => answers.confirmFeatures,
   },
   {
      type: 'confirm',
      name: 'confirmContribute',
      message: '\nDo you want to add a CONTRIBUTING section?',
      default: true,
   },
   {
      type: 'editor',
      name: 'contributing',
      message:
         "\nIf you created an application or package and would like other developers to contribute it, you will want to add guidelines for how to do so. The 'Contributor Covenant' (https://www.contributor-covenant.org/) is an industry standard, but you can write your own or leave it EMPTY.",
      when: (answers) => answers.confirmContribute,
   },
   {
      type: 'confirm',
      name: 'confirmTests',
      message: '\nDo you want to add a TESTS section?',
      default: true,
   },
   {
      type: 'editor',
      name: 'tests',
      message: '\nIf you wrote TESTS for your app, then provide examples on how to run them or leave EMPTY.',
      when: (answers) => answers.confirmTests,
   },
   {
      type: 'input',
      name: 'gitHubUser',
      message: 'Enter your GitHub username: (Required)',
      validate: (notEmpty) => {
         if (notEmpty) {
            return true;
         } else {
            return false;
         }
      },
   },
   {
      type: 'input',
      name: 'email',
      message: 'Enter a valid email address: (Required)',
      validate: (notEmpty) => {
         if (notEmpty) {
            return true;
         } else {
            return false;
         }
      },
   },
];

//TODO: Create a function to write README file
function writeToFile(fileName, data) {
   return new Promise((resolve, reject) => {
      writeFile(fileName, data, (err) => {
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
async function init() {
   const promise = await fetch('https://api.github.com/licenses', {
      headers: {
         Accept: 'application/vnd.github.v3+json',
      },
   });
   const licenseData = await promise.json();
   console.log('licenseData:\n', licenseData);

   licenseData.forEach((elem) => {
      licenseList.name.push(elem.name);
      licenseList.url.push('https://choosealicense.com/licenses/' + elem.key);
   });

   // for (let i = 0; i < licenseData.length; ++i) {
   //    licenseList.name.push(licenseData[i].name);
   //    licenseList.url.push(licenseData[i].url);
   // }

   console.log(licenseList);
   return inquirer.prompt(userPrompts);
}

// Function call to initialize app
init()
   .then((sections) => {
      console.log(sections);
      return generateMarkdown(sections);
   })
   .then((readmePage) => {
      return writeToFile('./README.md', readmePage);
   })
   .finally(() => {
      console.log('\n completed ');
   });
