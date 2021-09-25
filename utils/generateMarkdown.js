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
   let readmePage1 = `# ${data.projectTitle}\n`;
   let TOC = `## Table of Contents\n
`;
   let readmePage2 = ``;

   if (data.description) {
      readmePage1 += `## Description\n`;

      readmePage1 += `${data.description}\n
`;
   }

   if (data.confirmInstallation) {
      readmePage2 += `## Installation\n`;
      readmePage2 += `${data.installation}\n`;
      TOC += `* [Installation](#installation)
`;
   }

   if (data.confirmUsage) {
      readmePage2 += `## Usage\n`;
      readmePage2 += `${data.usage}\n`;
      TOC += `* [Usage](#usage)
`;
   }

   if (data.confirmCredits) {
      readmePage2 += `## Credits\n`;
      readmePage2 += `${data.credits}\n`;
      TOC += `* [Credits](#credits)
`;
   }

   if (data.confirmLicense) {
      readmePage2 += `## License\n`;
      let index = licenseList.name.findIndex((elem) => elem === data.licenseType);
      licenseBadge.message = `${licenseList.name[index]}`;
      badge = `${makeBadge(licenseBadge)}\n`;

      readmePage2 += `
   Copyright (c) ${data.licenseGrantor}. All rights reserved.
   
   Licensed under the [${data.licenseType}](${licenseList.url[index]}).
`;
      TOC += `* [License](#license)
`;
   }

   if (data.confirmFeatures) {
      readmePage2 += `## Features\n`;
      readmePage2 += `${data.features}\n`;
      TOC += `* [Features](#features)
`;
   }

   if (data.confirmContribute) {
      readmePage2 += `## Contributing\n`;
      readmePage2 += `${data.contributing}\n`;
      TOC += `* [Contributing](#contributing)
`;
   }

   if (data.confirmTests) {
      readmePage2 += `## Tests\n`;
      readmePage2 += `${data.tests}\n`;
      TOC += `* [Tests](#tests)
`;
   }

   {
      readmePage2 += `## Questions\n`;
      readmePage2 += `

README Generator created by [${data.gitHubUser}](https://github.com/${data.gitHubUser})

GitHub Email Address: [${data.email}](${data.email})\n
`;
      TOC += `* [Questions](#questions)
`;
   }

   console.log(readmePage1 + badge + TOC + readmePage2);
   return readmePage1 + badge + TOC + readmePage2;
}

// console.log('section: ', section);
export default generateMarkdown;

/*
Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis illo maxime omnis itaque autem sapiente, eius expedita quibusdam. Earum quasi quo, aut tempora cumque eligendi suscipit beatae! Amet, possimus doloribus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis illo maxime omnis itaque autem sapiente, eius expedita quibusdam. Earum quasi quo, aut tempora cumque eligendi suscipit beatae! Amet, possimus doloribus.
*/
