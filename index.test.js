const index  = require('./index.js');
const inquirer = require('inquirer');

jest.mock('inquirer');

describe('module test', () => {
    test('user input', async () => {
        expect.assertion(1);
        inquirer.prompt = jest.fn().mockResolvedValue({ email:'some@email.com'});

        await expect(index()).resolves.toEqual({ email: 'some@email.com'});
    });
});