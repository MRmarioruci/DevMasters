const fs = require('fs');
const files = [
    './cheatsheets/apis.json',
    './cheatsheets/docker.json',
    './cheatsheets/flask.json',
    './cheatsheets/fp.json',
    './cheatsheets/git.json',
    './cheatsheets/javascript.json',
    './cheatsheets/jest.json',
    './cheatsheets/oop.json',
    './cheatsheets/python.json',
    './cheatsheets/react.json',
    './cheatsheets/security.json',
    './cheatsheets/typescript.json',
]

function generateUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
files.forEach( async (file) => {
    await fs.readFile(file, 'utf8', (err, data) => {
        console.log(file);
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }
        let jsonData = JSON.parse(data);
        if(!jsonData) return;
        const idAdded = jsonData.groups.reduce((acc, currentValue) => {
            console.log(currentValue);
            const docs = currentValue?.docs?.map((item) => {
                return {
                    ...item,
                    id: generateUID()
                };
            } )
            return [...acc, {
                ...currentValue,
			    "docs": docs
            }]
        }, [])
        jsonData.groups = idAdded;
        fs.writeFile(file, JSON.stringify(jsonData, null, 4), 'utf8', (err) => {
            if (err) {
                console.error('Error writing to the file:', err);
                return;
            }
            console.log('File successfully modified and saved.');
        });
    });
})

