const getDateFromParams = (year, month) => {
    let obj = {};
    let yearInt = parseInt(year);
    let monthInt = month ? parseInt(month) : null;
    if (monthInt) { // if a month is entered
        return Object.assign({
            start: new Date(`${monthInt}/01/${yearInt}`),
            end: new Date(`${monthInt === 11 ? 0 : monthInt + 1}/01/${monthInt === 11 ? yearInt + 1 : yearInt}`)
        }, obj);
    } else {
        return Object.assign({ // if a
            start: new Date(`01/01/${yearInt}`),
            end: new Date(`01/01/${yearInt + 1}`)
        }, obj);
    }
}

module.exports = getDateFromParams;