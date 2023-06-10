const module = require('./index.js')

describe('' () => {
    const inquirer = {prompt: () => Promise.resolve({email:'test'}
    )};

    it('should equal test', () => {
        module({inquirer})(...).then(answers => answers.email.should.equal('test'))
    })
});