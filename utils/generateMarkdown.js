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
   let readmePage = `# ${data.projectTitle}\n`;
   if (data.description) {
      readmePage += `## Description\n`;
      readmePage += `${data.description}\n`;
   }
   if (data.installation) {
      readmePage += `## Installation\n`;
      readmePage += `${data.installation}\n`;
   }
   if (data.usage) {
      readmePage += `## Usage\n`;
      let usagePar = data.usage.split('\r\n');
      console.log(data.usage, usagePar);
      let imgCounter = 0;
      let displayImg = [false, false, false];
      if (data.imageVideo1) {
         displayImg[imgCounter] = true;
         imgCounter++;
      }
      if (data.imageVideo2) {
         displayImg[imgCounter] = true;
         imgCounter++;
      }
      if (data.imageVideo3) {
         displayImg[imgCounter] = true;
         imgCounter++;
      }
      imgCounter = 0;
      usagePar.forEach((elem) => {
         readmePage += `- ${elem}`;
         if (elem) {
            if (parCounter === 1 && data.imageVideo1) {
               readmePage += !['myAltText']('./assets/images/' + data.imageVideo1);
               displayImg[imgCounter] = false;
               imgCounter++;
            }
            if (parCounter === 2 && data.imageVideo2) {
               readmePage += !['myAltText']('./assets/images/' + data.imageVideo2);
               displayImg[imgCounter] = false;
               imgCounter++;
            }
            if (parCounter === 3 && data.imageVideo3) {
               readmePage += !['myAltText']('./assets/images/' + data.imageVideo3);
               displayImg[imgCounter] = false;
               imgCounter++;
            }
         }
      });
      for (let i = 0; i < 3; i++) {
         if (displayImg[i]) {
            readmePage += !['myAltText']('./assets/images/' + data.imageVideo + (i + 1));
         }
      }
   }
   if (data.credits) {
      readmePage += `## Credits\n`;
      readmePage += `${data.credits}\n`;
   }

   // console.log(readmePage);
   return readmePage;
}

// console.log('section: ', section);
module.exports = generateMarkdown;

/*
Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis illo maxime omnis itaque autem sapiente, eius expedita quibusdam. Earum quasi quo, aut tempora cumque eligendi suscipit beatae! Amet, possimus doloribus. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis illo maxime omnis itaque autem sapiente, eius expedita quibusdam. Earum quasi quo, aut tempora cumque eligendi suscipit beatae! Amet, possimus doloribus.
*/
