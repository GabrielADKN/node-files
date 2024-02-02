const fs = require('fs');

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            console.error(`Error reading ${path}: ${err}`);
            process.exit(1);
        }
        console.log(data);
    });
}

if (process.argv[2]) {
    cat(process.argv[2]);
}else {
    console.error('Please provide a file path');
    process.exit(1);
}