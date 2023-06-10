import module from './node_modules';
import inquirer from 'inquirer';

jest.mock('inquirer');

describe('module test', () => {
    test('user input', async () => {
        expect.assertion(1);
        inquirer.prompt = jest.fn().mockResolvedValue({ email:'some@email.com'});

        await expect(module()).resolves.toEqual({ email: 'some@email.com'});
    });
});