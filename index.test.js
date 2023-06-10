const index  = require('./index.js');
const inquirer = require('inquirer');

jest.mock('inquirer');

describe('module test', () => {
    let backup;
    before(() => {
      backup = inquirer.then;
      inquirer.then = (start) => Promise.resolve({department: 'test'})
    })
  
    it('should equal test', () => {
      module({inquirer}).then(answers => answers.department.should.equal('test'))
    })
  
    // restore
    after(() => {
      inquirer.prompt = backup
    })
});