var moment = require('moment')
function formatDate(date) {
    return moment.utc(String(date)).format('DD/MM/YYYY')
}

function formatHour(hour) {
    //return 'oi'
    if (hour) {
        return hour.split(':')[0] + ':' + hour.split(':')[1]
        //return moment.utc(String(hour)).format('DD/MM/YYYY')
    }
}