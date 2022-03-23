let data = true;

let fetchdata = new Promise((resolve, reject) => {
    if (!data) {
        reject();
    } else {
        resolve({
            id: 1,
            message: 'worked'
        });
    }
});

fetchdata.then(fetchd => {
    console.log(fetchd)
})