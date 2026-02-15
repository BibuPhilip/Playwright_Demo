import {test} from './Fixture2.js'

test('Practice Test Fixture and Worker Fixture', async({workerFixture1, testFixture1, testFixture2})=>{
    console.log(workerFixture1);
    console.log(testFixture1);
    console.log(testFixture2);
})

test('Practice Only Test Fixture1', async({testFixture1})=>{
    console.log(testFixture1);
})

test('Practice Only Test Fixture2', async({testFixture2})=>{
    console.log(testFixture2);
})