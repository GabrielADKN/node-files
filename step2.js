const fs = require('fs');
const axios = require('axios');

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        }
        console.log(data);
    });
}

function webCat(url) {
    axios.get(url)
        .then(function(response) {
            console.log(response.data);
        })
        .catch(function(error) {
            console.error(`Error fetching ${url}: ${error}`);
            process.exit(1);
        });
}

if (process.argv[2]) {
    if (process.argv[2].startsWith('http')) {
        webCat(process.argv[2]);
    } else {
        cat(process.argv[2]);
    }
} else {
    console.error('Please provide a file path or URL');
    process.exit(1);
}