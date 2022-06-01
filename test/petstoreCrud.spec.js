const axios = require ('axios');

it ('Create: add a new pet to store', function () {
    const data = JSON.stringify({
        "id": 1160,
        "category": {
            "id": 0,
            "name": "string"
        },
        "name": "Susanna",
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

    axios(config)
        .then(function (response) {
            console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
            console.log(error);
        });
});
