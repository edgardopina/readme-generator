import { makeBadge, ValidationError } from 'badge-maker'; // import badge-maker into node
// import Obj data of licenseList obtained from fetch, for use in markdown.
import licenseList from './licenseList.js';

// declare a Badge object to use with badge-maker program
const licenseBadge = {
   label: 'License',
   message: ``,
   labelColor: 'black',
   color: '#ce090a',
   style: 'plastic',
};

let TOC = ``;
let badge = ``;

// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(index) {
   if (index >= 0) {
      licenseBadge.message = `${licenseList.name[index]}`;
      return `${makeBadge(licenseBadge)}\n
`;
   } else {
      return ``;
   }
}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(index) {
   if (index >= 0) {
      return `${licenseList.url[index]}\n`;
   } else {
      return ``;
   }
}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(data) {
   if (data.confirmLicense) {
      let index = licenseList.name.findIndex((elem) => elem === data.licenseType);
      badge = renderLicenseBadge(index);
      let year = new Date();
      let section = `## License\n`;
      section += `
   Copyright (c) ${year.getFullYear()} ${data.licenseGrantor}. All rights reserved.
   
   Licensed under the [${data.licenseType}](${renderLicenseLink(index)}).
`;
      TOC += `* [License](#license)
`;
      return section;
   } else {
      return ``;
   }
}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
   let title = `# ${data.projectTitle}\n`;
   TOC = `## Table of Contents\n
`;
   let description = ``;
   let content = ``;

   if (data.description) {
      description += `## Description\n
`;
      description += `${data.description}\n
`;
   }

   if (data.confirmInstallation) {
      content += `## Installation\n
`;
      content += `${data.installation}\n`;
      TOC += `* [Installation](#installation)
`;
   }

   if (data.confirmUsage) {
      content += `## Usage\n
`;
      content += `${data.usage}\n
`;
      TOC += `* [Usage](#usage)
`;
   }

   if (data.confirmCredits) {
      content += `## Credits\n
`;
      content += `${data.credits}\n
`;
      TOC += `* [Credits](#credits)
`;
   }

   content += renderLicenseSection(data);

   if (data.confirmFeatures) {
      content += `## Features\n`;
      content += `${data.features}\n`;
      TOC += `* [Features](#features)
`;
   }

   if (data.confirmContribute) {
      content += `## Contributing\n`;
      content += `${data.contributing}\n`;
      TOC += `* [Contributing](#contributing)
`;
   }

   if (data.confirmTests) {
      content += `## Tests\n`;
      content += `${data.tests}\n`;
      TOC += `* [Tests](#tests)
`;
   }

   {
      content += `## Questions\n`;
      content += `

README Generator created by [${data.gitHubUser}](https://github.com/${data.gitHubUser})

GitHub Email Address: [${data.email}](${data.email})\n
`;
      TOC += `* [Questions](#questions)
`;
   }
   // console.log(title + badge + description + TOC + content); //console.log left for testing
   return title + badge + description + TOC + content;
}

export default generateMarkdown;
