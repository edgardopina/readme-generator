import { makeBadge, ValidationError } from 'badge-maker';
import licenseList from './licenseList.js';

const licenseBadge = {
   label: 'License',
   message: ``,
   labelColor: 'black',
   color: '#ce090a',
   style: 'plastic',
};

// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {}

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
   let badge = ``;
   let title = `# ${data.projectTitle}\n`;
   let TOC = `## Table of Contents\n
`;
   let description = ``;
   let content = ``;

   if (data.description) {
      description += `## Description\n`;

      description += `${data.description}\n
`;
   }

   if (data.confirmInstallation) {
      content += `## Installation\n`;
      content += `${data.installation}\n`;
      TOC += `* [Installation](#installation)
`;
   }

   if (data.confirmUsage) {
      content += `## Usage\n`;
      content += `${data.usage}\n`;
      TOC += `* [Usage](#usage)
`;
   }

   if (data.confirmCredits) {
      content += `## Credits\n`;
      content += `${data.credits}\n`;
      TOC += `* [Credits](#credits)
`;
   }

   if (data.confirmLicense) {
      let index = licenseList.name.findIndex((elem) => elem === data.licenseType);
      licenseBadge.message = `${licenseList.name[index]}`;
      badge = `${makeBadge(licenseBadge)}\n
`;
      content += `## License\n`;

      content += `
   Copyright (c) ${data.licenseGrantor}. All rights reserved.
   
   Licensed under the [${data.licenseType}](${licenseList.url[index]}).
`;
      TOC += `* [License](#license)
`;
   }

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

   console.log(title + badge + description + TOC + content);
   return title + badge + description + TOC + content;
}

// console.log('section: ', section);
export default generateMarkdown;

/*
Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis illo maxime omnis itaque autem sapiente, eius expedita quibusdam. Earum quasi quo, aut tempora cumque eligendi suscipit beatae! Amet, possimus doloribus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis illo maxime omnis itaque autem sapiente, eius expedita quibusdam. Earum quasi quo, aut tempora cumque eligendi suscipit beatae! Amet, possimus doloribus.
*/
