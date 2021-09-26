// TODO: Include packages needed for this application
import { writeFile } from 'fs';
import inquirer from 'inquirer';
import generateMarkdown from './utils/generateMarkdown.js';
import licenseList from './utils/licenseList.js';
import { makeBadge, ValidationError } from 'badge-maker';
import fetch from 'node-fetch';

const clearTheScreen = '\u001b[3J\u001b[2J\u001b[1J';
const helpStart = `                           Welcome to the "README.md Generator" Application

1. For 'or leave EMPTY' prompts, you still need to open and close the Editor if  you are prompted to.
2. The Windows default editor is NotePad.
   a) Use alt-tab to navigate to the NotePad editor if needed.
   b) Do enable the menu option 'Format Word-Wrap' for a better experience.
   c) Hit 'enter' key twice when you want to finish a paragraph.
   d) Save AND Close the file - use mouse or alt-F4.
   e) For other editors, follow the editor's instructions.
3. You can iterate over your initial version of README.md file by reusing (copy/paste) the content 
   from the generated README.md file into the new prompts to make adjustments as needed.
4. Use Markdown syntax as neeeded to beautify your README.md file.
   a) The h1 'Project Name' header, and all h2 'Section Name' headers ARE provided by the application.
   b) Full reference of Markdown syntax at: https://guides.github.com/features/mastering-markdown/
   c) Basic sintax follows:
	
	### h3 header
	#### h4 headers
	##### h5 header
	###### h6 header
	This is a paragraph - paragraphs are separated by an blank line (hit enter 2 times)
	**bold**
	__bold__
	*italic*
	_italic_
	_You **can** combine them_
	http://my.domain.com/landingPage
	[link description](http://my.domain.com/landingPage)
	![my alt text] ('./local/path/to/myFile)
	![my alt text] (http://url.path.to/aFile)
   
5. If you cannot see all these instructions, cancel the process with ctrl-c, then MAXIMIZE your
   terminal/console and re-launch the application for the best user experience.

                                 Enjoy using "README.md Generator"!`;
const helpEnd = `
Congratulations, your README.md file has been generated. You will find the README.md file in the root
directory. You will need push it to your GitHub repository to see how it renders or you can use a VS Code 
extension to preview it within VS Code (however, the VS Code Extension will not show the Table Of Contents properly).

                            Thank you for using the "README.md Generator!`;

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
// After installing the node-fetch package, we can now use fetch method to connect and retrieve data from github API
async function init() {
   const promise = await fetch('https://api.github.com/licenses', {
      headers: {
         Accept: 'application/vnd.github.v3+json',
      },
   });
   const licenseData = await promise.json();
   // console.log('licenseData:\n', licenseData); // verify that data is obtained from fetch promise.

   // Use forEach() array method to pass/(or push) the retrieved data into a new array container (licenseList)
   licenseData.forEach((elem) => {
      licenseList.name.push(elem.name);
      // concat proper web address with the selected license key
      licenseList.url.push('https://choosealicense.com/licenses/' + elem.key);
   });

   //#region
   // for (let i = 0; i < licenseData.length; ++i) {
   //    licenseList.name.push(licenseData[i].name);
   //    licenseList.url.push(licenseData[i].url);
   // }
   // console.log(licenseList);
   //#endregion

   console.log(clearTheScreen);
   console.log(helpStart);
   return inquirer.prompt(userPrompts);
}

// Function call to initialize app
init()
   .then((sections) => {
      // console.log(sections);
      return generateMarkdown(sections);
   })
   .then((readmePage) => {
      return writeToFile('./README.md', readmePage);
   })
   .finally(() => {
      console.log(clearTheScreen);
      console.log(helpEnd);
   });
