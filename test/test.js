const { expect } = require('chai');
const axios = require ('axios');
//const request = require ('superagent');

// function sum(a,b) {
//     return a + b;
// }
//
// describe('Array', function() {
//     describe('#indexOf()', function() {
//         it('should return -1 when the value is not present', function() {
//             //expect([1, 2, 3].indexOf(4)).eq( -1);
//             expect (sum(2, 4)).eq(6);
//             expect (sum(3, -1)).eq(2);
//             expect (sum(-3, -1)).eq(-4);
//         });
//         it('Should return 2', function() {
//             expect (sum(3, -1)).eq(2);
//         });
//         it('Should return -6', function() {
//             expect (sum(-2, -4)).eq(6);
//
//         });
//     });
// });

// function avg (n) {
//     let sum = 0;
//     for (let i = 1; i <=n; i++) {
//        sum += i;
//     }
//     return sum/n;
// }
// function avg2 (arr) {
//     let sum = 0;
//     for (let el of arr) {
//         if (typeof el !== 'number') continue;
//         else sum += el;
//     }
//     return sum/arr.length;
// }
// function avg3 (str) {
//     let sum = 0;
//     let arr = str.split(' ');
//     for (let el of arr) {
//         sum += el.length;
//     }
//     return sum/arr.length;
// }
// function countKeys (obj) {
//     let count = 0;
//     for (k in obj) {
//         if (obj.hasOwnProperty(k)) count++;
//     }
//     return count;
// }

// const countKeys = function (obj) {
//     if (typeof obj !== 'object' || obj === null) {
//         return 0;
//     }
//     const keys = Object.keys(obj);
//     let sum = keys.length;
//     keys.forEach(key => sum += countKeys(obj[key]));
//     return sum;
// }

// describe ('Homework', function(){
//     it ('avg(1, 2, 3, 4, 5)', function() {
//        expect(avg(5)) .eq(3);
//     });
//     it ('avg(1, 2, 3)', function() {
//         expect(avg(3)) .eq(2);
//     });
//     it ('avg(1, 2, 3, 345, 6, \'s\', 8)', function() {
//         expect(avg2([1, 2, 3, 345, 6, 's', 8])) .eq(52.142857142857146);
//     });
//     it ('avgArr([1, 3, 5, 6, 5])', function() {
//         expect(avg2([1, 3, 5, 6, 5])) .eq(4);
//     });
//     it ('avgArr([1, -2, 5, 6, 5])', function() {
//         expect(avg2([1, -2, 5, 6, 5])) .eq(3);
//     });
//     it ('avgArr([1, null, 5, 6, 5]', function() {
//         expect(avg2([1, null, 5, 6, 5])) .eq(3.4);
//     });
//     it ('avgLengthWordInSent(\'Hello hi\')', function() {
//         expect(avg3('Hello hi')) .eq(3.5);
//     });
//     it ('countKeysInObject({ a: 1, b: 3})', function() {
//         expect(countKeys({ a: 1, b: 3})).eq(2);
//     });
//     it ('countKeysInObject({ a: 1, b: { q:2, r: { t: 5 } } })', function() {
//         expect(countKeys({ a: 1, b: { q:2, r: { t: 5 } } })).eq(5);
//     });
// });

// it ('axios', function (){
//     return axios.get('https://nazarov-kanban-server.herokuapp.com/card')
//         .then(res=> {
//             console.log(res.data)
//             expect(res.data).to.be.an('array')
//         })
// });

let getCardId;

it ('Should Create Cards', function (){
    return axios({
        method: 'POST',
        url: 'https://nazarov-kanban-server.herokuapp.com/card',
        data: {
            name: 'Axios',
            description: '123 1234 56',
            priority: 1,
            status: 'todo'
        }
    })
        .then(res=> {
            console.log(res.data)
            expect(res.status).eq(201)
            expect(res.data).eq('Card created')
        })
});
it ('Should get Card List', function (){
    return axios({
        method: 'GET',
        url: 'https://nazarov-kanban-server.herokuapp.com/card',
    })
        .then(res=> {
            console.log(res.data)
            expect(res.status).eq(200)
            expect(res.data).an('array')
            getCardId = res.data[0]._id;
        })
});
it ('Should delete Card', function (){
    return axios({
        method: 'DELETE',
        url: `https://nazarov-kanban-server.herokuapp.com/card/${getCardId}`,
    })
        .then(res=> {
            expect(res.status).eq(200)
            expect(res.data).eq('Card deleted')
        })
});
it('should verify deleted card', async () => {
    const result = await axios({
        method: 'GET',
        url: `https://nazarov-kanban-server.herokuapp.com/card/${getCardId}`,
    }).then(res => res.data)
        .catch(err => err.response)
    // console.log(result)
    expect(result.status).eq(404)
});

