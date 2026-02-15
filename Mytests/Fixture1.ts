import {test as base} from '@playwright/test';

type Fixture1 = {
    helloWorld: string;
    byeWorld: string;
}

export const test = base.extend<Fixture1>({
    helloWorld:async({}, use) => {
        console.log('Hello World');
        const varhelloWorld = 'This variable is declared in helloWorld fixture. ';
        await use(varhelloWorld);
        console.log('Clean up after helloWorld fixture');
    },

    byeWorld:async({helloWorld},use) => {
        console.log('Bye World');
        const varbyeWorld = helloWorld + 'This variable is declared in byeWorld fixture';
        await use(varbyeWorld);
        console.log('Clean up after byeWorld fixture');
    }

})