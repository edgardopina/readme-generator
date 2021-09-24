// TODO: Include packages needed for this application
import { writeFile } from 'fs';
import inquirer from 'inquirer';
import generateMarkdown from './utils/generateMarkdown.js';
import fetch from 'node-fetch';

// Container for License name & url link from gitHub API. Global Scope.
const licenseList = {
   name: [],
   url: [],
};

// TODO: Create an array of questions for user input
const userHeaders = [
   {
      type: 'input',
      name: 'projectTitle',
      message: 'What is the title of your Project? (Required)',
      validate: (notEmpty) => {
         if (notEmpty) {
            return true;
         } else {
            console.log('Please enter the name of your project!');
            return false;
         }
      },
   },
   {
      type: 'editor',
      name: 'description',
      message:
         'Enter a detailed PROJECT DESCRIPTION or leave EMPTY: (for Windows NotePad use menu options Format/Word-Wrap to get better capture experience; use ctrl-s: to save the file; use alt-f x to exit editor)',
      validate: (notEmpty) => {
         if (notEmpty) {
            return true;
         } else {
            console.log('Please enter a valid PROJECT DESCRIPTION.');
            return false;
         }
      },
   },
   {
      type: 'editor',
      name: 'installation',
      message:
         'Enter detailed INSTALLATION INSTRUCTIONS or leave EMPTY: (for Windows NotePad follow the same instructions above)',
   },
   {
      type: 'editor',
      name: 'usage',
      message:
         'Enter detailed instructions about you app USAGE or leave EMPTY: (for Windows NotePad use the same instructions above)',
   },

   {
      type: 'editor',
      name: 'license',
      message: 'Enter the CREDITS section or leave EMPTY: (for Windows NotePad use the same instructions above)',
   },

   {
      type: 'editor',
      name: 'contributing',
      message: 'Enter detailed contributing info or leave EMPTY: (for Windows NotePad use the same instructions above)',
   },
   {
      type: 'editor',
      name: 'tests',
      message:
         'Enter detailed Testing information about your app or leave EMPTY: (for Windows NotePad use the same instructions above)',
   },

   {
      type: 'editor',
      name: 'questions',
      message: 'Enter the CREDITS section or leave EMPTY: (for Windows NotePad use the same instructions above)',
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
   // return promptData(userHeaders);
   // return inquirer.prompt(userHeaders);

   const promise = await fetch('https://api.github.com/licenses', {
      headers: {
         Accept: 'application/vnd.github.v3+json',
      },
   });
   const licenseData = await promise.json();
   console.log('licenseData:\n', licenseData);
   
   
   licenseData.forEach((elem) => {
      licenseList.name.push(elem.name);
      licenseList.url.push(elem.url);
   });

   // for (let i = 0; i < licenseData.length; ++i) {
   //    licenseList.name.push(licenseData[i].name);
   //    licenseList.url.push(licenseData[i].url);
   // }
   
   console.log(licenseList);
   return licenseData;
}

// Function call to initialize app
init();
// .then((headers) => {
//    return generateMarkdown(headers);
// })
// .then((readmePage) => {
//    return writeToFile('./README.md', readmePage);
// })
// .finally(() => {
//    console.log('\n completed ');
// });
