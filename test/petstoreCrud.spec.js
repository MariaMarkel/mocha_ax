const axios = require ('axios');

const data = JSON.stringify({
    "id": Math.floor(Math.random()*1001 + 1000),
    "category": {
        "id": 0,
        "name": "string"
    },
    "name": "Taco",
    "photoUrls": [
        "string"
    ],
    "tags": [
        {
            "id": 0,
            "name": "string"
        }
    ],
    "status": "available"
});

const config = {
    method: 'post',
    url: 'https://petstore.swagger.io/v2/pet',
    headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
    },
    data: data
};
let petId;

it ('Create: add a new pet to store', async function () {
    await axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
            petId = response.data.id;
        })
        .catch(function (error) {
            console.log(error);
        });
});
it ('Read: find pet by id', function () {
    const config = {
        method: 'get',
        url: `https://petstore.swagger.io/v2/pet/${petId}`,
        headers: { }
    };
    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error.response.statusText);
        });
})
