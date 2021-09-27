import { makeBadge, ValidationError } from 'badge-maker'; // import badge-maker into node
// import Obj data of licenseList obtained from fetch, for use in markdown.
import licenseList from './licenseList.js';
// import function to create a file (for badge.svg file)
import writeToFile from '../index.js';

// declare a Badge object to use with badge-maker program
const licenseBadge = {
   label: 'License',
   message: ``,
   labelColor: 'black',
   color: '#ce090a',
   style: 'plastic',
};

// variables needing to be declared Globally (for now)
// so that the scope of the functions below remain unaffected.
// TOC is Table of Contents
let TOC = ``;
let badge = ``;

// TODO: Create a function that returns a license badge based on which license is passed in
function renderLicenseBadge(index) {
   // if value is > -1, then there is a license present from the prompts' input data.
   if (index >= 0) {
      licenseBadge.message = `${licenseList.name[index]}`;
      badge = `${makeBadge(licenseBadge)}`; // builds badge code
      writeToFile('./assets/images/badge.svg', badge); // create badge.svg file
      return `![License Badge](./assets/images/badge.svg)\n`; // returns MARKDOWN for badge.svg file to be inserted
   } else {
      return ``; // If there is no license, return an empty string
   }
}

// TODO: Create a function that returns the license link
function renderLicenseLink(index) {
   // if value is > -1, then there is a license present from the prompts' input data.
   if (index >= 0) {
      return `${licenseList.url[index]}`;
   } else {
      return ``; // If there is no license, return an empty string
   }
}

// TODO: Create a function that returns the license section of README
function renderLicenseSection(data) {
   if (data.confirmLicense) {
      // if no elem is present, findIndex() method will return -1.
      // compare elem index with data.licenseType (user selected license) and check if they match.
      // if they do, assign that index value for usage.
      let index = licenseList.name.findIndex((elem) => elem === data.licenseType);
      // badge is rendered and assigned through the index value provided above.
      badge = renderLicenseBadge(index);
      console.log(badge);
      let year = new Date(); // generate Date object for our Copyright message below.
      let section = `## License\n\n`;
      // License name and link is rendered at line 57. (link function from above also used the index value parameter.)
      section += `
   Copyright (c) ${year.getFullYear()} ${data.licenseGrantor}. All rights reserved.
   
   Licensed under the [${data.licenseType}](${renderLicenseLink(index)}).\n\n`;
      TOC += `* [License](#license)\n`;
      return section;
   } else {
      return ``; // If there is no license, return an empty string
   }
}

// TODO: Create a function to generate markdown for README
// Our function checks if there is incoming content info within the data parameter
// to then be generated as markdown content.
function generateMarkdown(data) {
   // local variables (except TOC) used to manage individual portions of the markdown.
   let title = `# ${data.projectTitle}\n\n`;
   TOC = `## Table of Contents\n\n`;
   let description = ``;
   let content = ``; // this variable manages all sections content other than project title, description,
   // and license

   if (data.description) {
      description += `## Description\n\n`;
      description += `${data.description}\n\n`;
   }

   if (data.confirmInstallation) {
      content += `## Installation\n\n`;
      content += `${data.installation}\n\n`;
      TOC += `* [Installation](#installation)\n`;
   }

   if (data.confirmUsage) {
      content += `## Usage\n\n`;
      content += `${data.usage}\n\n`;
      TOC += `* [Usage](#usage)\n`;
   }

   if (data.confirmCredits) {
      content += `## Credits\n\n`;
      content += `${data.credits}\n\n`;
      TOC += `* [Credits](#credits)\n`;
   }

   // Inserting content here to follow layout from USER Story
   content += renderLicenseSection(data);

   if (data.confirmFeatures) {
      content += `## Features\n\n`;
      content += `${data.features}\n\n`;
      TOC += `* [Features](#features)\n`;
   }

   if (data.confirmContribute) {
      content += `## Contributing\n\n`;
      content += `${data.contributing}\n\n`;
      TOC += `* [Contributing](#contributing)\n`;
   }

   if (data.confirmTests) {
      content += `## Tests\n\n`;
      content += `${data.tests}\n\n`;
      TOC += `* [Tests](#tests)\n`;
   }

   {
      content += `## Questions\n\n`;
      content += `

README Generator created by [${data.gitHubUser}](https://github.com/${data.gitHubUser}).\n
For any additional questions or comments, please send a message to the following address:

GitHub Email Address: <${data.email}>\n\n`;
      TOC += `* [Questions](#questions)\n`;
   }
   // console.log(title + badge + description + TOC + content); //console.log left for testing
   return title + badge + description + TOC + content;
}

export default generateMarkdown;
