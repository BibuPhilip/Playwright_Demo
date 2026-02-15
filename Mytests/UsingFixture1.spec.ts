import {test} from './Fixture1.js';

test('testing my Fixture1: helloWorld', async({helloWorld})=>{
    console.log('Inside my test');
    console.log('Called in the test: ' + helloWorld);
})

test('testing my Fixture1: byeWorld', async({byeWorld})=>{
    console.log('Inside my test');
    console.log('Called in the test: ' + byeWorld);
})