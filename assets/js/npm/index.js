const { writeFile } = require('fs').promises;
const inquirer = require('inquirer');

const promptUser = () => {
    return inquirer.prompt([
    {type: 'input', name: 'title', message: 'What is the title of your project?'},
    {type: 'input', name: 'description', message: 'What is the description of your project?'},
    {type: 'input', name: 'installation', message: 'What are the steps required to install your project?'},
    {type: 'input', name: 'usage', message: 'What are the instructions for use?'},
    {type: 'input', name: 'contribution', message: 'What are the contribution guidelines?'},
    {type: 'input', name: 'test', message: 'What are the test instructions?'},
    {type: 'list', name: 'license', message: 'What license would you like to use?', choices: ['MIT', 'GNU', 'Apache', 'BSD', 'None']},
    {type: 'input', name: 'github', message: 'What is your GitHub username?'},
    {type: 'input', name: 'email', message: 'What is your email address?'},
    {type: 'input', name: 'credits', message: 'Who are the contributors?'},
    {type: 'input', name: 'badges', message: 'What badges are being used?'},
    {type: 'input', name: 'features', message: 'What are the features?'},
    {type: 'input', name: 'how-to-contribute', message: 'How can others contribute?'},
    ]);
};
const init = () => {
    promptUser()
  .then((answers) => writeFile('README.md', generateREADME(answers)))
  .then(() => console.log('Successfully wrote to README.md'))
  .catch((err) => console.error(err));

};

init();

const licenseChoices = ['MIT', 'GNU', 'Apache', 'BSD', 'None'];

const licenseURLs = {
  MIT: 'https://img.shields.io/badge/License-MIT-yellow.svg',
  GNU: 'https://img.shields.io/badge/License-GPLv3-blue.svg',
  Apache: 'https://img.shields.io/badge/License-Apache%202.0-blue.svg',
  BSD: 'https://img.shields.io/badge/License-BSD%203--Clause-blue.svg',
  None: 'https://img.shields.io/badge/License-None-lightgrey.svg',
};
       
inquirer
  .prompt({
    type: 'list',
    name: 'license',
    message: 'What license would you like to use?',
    choices: Object.keys(licenseURLs),
  })
  .then((answers) => {
    const selectedLicense = answers.license;
    const selectedLicenseURL = licenseURLs[selectedLicense];
    console.log(`You selected ${selectedLicense}!`);
    console.log(`Badge URL: ${selectedLicenseURL}`);
  })
  .catch((error) => {
    console.error('An error occurred:', error);
  });


// Path: assets\utils\generateREADME.md
const generateREADME = (answers) => {
    return `
    # ${answers.title}
    ## Description: ${answers.description}
    ## Table of Contents:
    * [Installation] (#installation)
    * [Usage] (#usage)
    * [Contribution] (#contribution)
    * [Test](#test)
    * [License](#license)
    * [GitHub](#github)
    * [Email](#email)
    * [Questions](#questions)
    * [Credits](#credits)
    * [Badges](#badges)
    * [Features](#features)
    * [Tests](#tests)
    * [Documentation](#documentation)
    ### Installation: ${answers.installation}
    ### Usage: ${answers.usage}
    ### Contribution: ${answers.contribution}
    ### Test: ${answers.test}
    ### License: ${answers.license}
    ### Questions: ${answers.github}
    ### Contact: ${answers.email}
    ### Questions: ${answers.Questions}
    ### Credits: ${answers.credits}
    ### Badges: ${answers.badges}
    ### Features: ${answers.features}
    ### Tests: ${answers.tests}
    ### Documentation: ${answers.documentation}`;
};

module.exports = generateREADME;

