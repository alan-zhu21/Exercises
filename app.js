function extractValue(arr, key) {
    const finalArr = [];
    return arr.reduce(function (obj) {
        finalArr.push(obj[key]);
    })
}