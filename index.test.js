const index  = require('./index.js');
const inquirer = require('inquirer');

describe('module test', () => {
    let backup;
    before(() => {
      backup = inquirer.then.case;
      inquirer.then.case = (start) => Promise.resolve({department: 'test'})
    })
  
    it('should equal test', () => {
      module({inquirer}).then(answers => answers.department.should.equal('test'))
    })
  
    // restore
    after(() => {
      inquirer.prompt = backup
    })
});