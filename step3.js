const fs = require('fs');
const axios = require('axios');

function writeToFile(path, data) {
    fs.writeFile(path, data, 'utf8', function (err) {
        if (err) {
            console.error(`Couldn't write ${path}: ${err}`);
            process.exit(1);
        }
    });
}

function cat(path, outFile) {
    fs.readFile(path, 'utf8', function (err, data) {
        if (err) {
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        }
        if (outFile) {
            writeToFile(outFile, data);
        } else {
            console.log(data);
        }
    });
}

function webCat(url, outFile) {
    axios.get(url)
        .then(function (response) {
            if (outFile) {
                writeToFile(outFile, response.data);
            } else {
                console.log(response.data);
            }
        })
        .catch(function (error) {
            console.error(`Error fetching ${url}: ${error}`);
            process.exit(1);
        });
}

let outFile;
if (process.argv[2] === '--out') {
    outFile = process.argv[3];
    if (process.argv[4]) {
        if (process.argv[4].startsWith('http')) {
            webCat(process.argv[4], outFile);
        } else {
            cat(process.argv[4], outFile);
        }
    } else {
        console.error('Please provide a file path or URL');
        process.exit(1);
    }
} else if (process.argv[2]) {
    if (process.argv[2].startsWith('http')) {
        webCat(process.argv[2]);
    } else {
        cat(process.argv[2]);
    }
} else {
    console.error('Please provide a file path or URL');
    process.exit(1);
}