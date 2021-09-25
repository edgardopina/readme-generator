var license = [
   'Academic Free License v3.0',
   'Apache license 2.0',
   'Artistic license 2.0',
   'Boost Software License 1.0',
   'BSD 2-clause "Simplified" license',
   'BSD 3-clause "New" or "Revised" license',
   'BSD 3-clause Clear license',
   'Creative Commons license family',
   'Creative Commons Zero v1.0 Universal',
   'Creative Commons Attribution 4.0',
   'Creative Commons Attribution Share Alike 4.0',
   'Do What The F*ck You Want To Public License',
   'Educational Community License v2.0',
   'Eclipse Public License 1.0',
   'Eclipse Public License 2.0',
   'European Union Public License 1.1',
   'GNU Affero General Public License v3.0',
   'GNU General Public License family',
   'GNU General Public License v2.0',
   'GNU General Public License v3.0',
   'GNU Lesser General Public License family',
   'GNU Lesser General Public License v2.1',
   'GNU Lesser General Public License v3.0',
   'ISC',
   'LaTeX Project Public License v1.3c',
   'Microsoft Public License',
   'MIT',
   'Mozilla Public License 2.0',
   'Open Software License 3.0',
   'PostgreSQL License',
   'SIL Open Font License 1.1',
   'University of Illinois/NCSA Open Source License',
   'The Unlicense',
   'zLib License',
];

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
      readmePage2 += `
   Copyright (c) ${data.licenseGrantor}. All rights reserved.
   
   Licensed under the ${data.licenseType}.
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

gitHub Email Address: [${data.email}](${data.email})\n
`;
      TOC += `* [Questions](#questions)
`;
   }

   console.log(readmePage1 + TOC + readmePage2);
   return readmePage1 + TOC + readmePage2;
}

// console.log('section: ', section);
export default generateMarkdown;

/*
Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis illo maxime omnis itaque autem sapiente, eius expedita quibusdam. Earum quasi quo, aut tempora cumque eligendi suscipit beatae! Amet, possimus doloribus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis illo maxime omnis itaque autem sapiente, eius expedita quibusdam. Earum quasi quo, aut tempora cumque eligendi suscipit beatae! Amet, possimus doloribus.
*/
