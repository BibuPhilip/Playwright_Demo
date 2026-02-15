import {test as baseTest} from '@playwright/test';

type myTestFixtures = {
    testFixture1: string;
    testFixture2: string;
}

type myWorkerFixtures = {
    workerFixture1: string;
}

export const test = baseTest.extend<myTestFixtures, myWorkerFixtures>({
    testFixture1: async({}, use)=>{
        const testfixture1 = 'I am Test fixture 1';
        console.log('Before part of Test fixture 1');
        await use(testfixture1);
        console.log('After part of Test fixture 1');
    },
    testFixture2: async({}, use)=>{
        const testfixture2 = 'I am Test fixture 2';
        console.log('Before part of Test fixture 2');
        await use(testfixture2);
        console.log('After part of Test fixture 2');
    },
    workerFixture1: [async({}, use)=>
        {
        const workerfixture1 = 'I am Worker fixture 1';
        console.log('Before part of Worker fixture 1');
        await use(workerfixture1);
        console.log('After part of Worker fixture 1');
    }, {scope:'worker'}
    ]
})