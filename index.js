// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');

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
      type: 'input',
      name: 'imageVideo1',
      message:
         "Enter USAGE image-1/video-1 file name with extension; i.e. videoFile1.mp4 or leave EMPTY: (for Windows NotePad use the same instructions above)' after your FIRST paragraph of the USAGE section (upload your file in the './assets/images-videos/' folder)",
   },
   {
      type: 'input',
      name: 'imageVideo2',
      message:
         "Enter USAGE image-2/video-2 file name with extension; i.e. videoFile2.mp4 or leave EMPTY. It will be placed after your SECOND paragraph of the USAGE section (upload your file in the './assets/images-videos/' folder)",
   },
   {
      type: 'input',
      name: 'imageVideo3',
      message:
         "Enter USAGE image-3/video-3 file name with extension; i.e. videoFile3.mp4 or leave EMPTY. It will be placed after your THIRD paragraph of the USAGE section (upload your file in the './assets/images-videos/' folder)",
   },
   {
      type: 'editor',
      name: 'credits',
      message: 'Enter the CREDITS section or leave EMPTY: (for Windows NotePad use the same instructions above)',
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
   // return promptData(userHeaders);
   return inquirer.prompt(userHeaders);
}

// Function call to initialize app
init()
   .then((headers) => {
      console.log(headers);
      return generateMarkdown(headers);
   })
   .then((readmePage) => {
      return console.log('README.md page: ', readmePage);
   })
   .finally(() => {
      console.log('\n completed ');
   });
