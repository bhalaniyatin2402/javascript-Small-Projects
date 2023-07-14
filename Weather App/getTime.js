const time = document.getElementById('time')

function getTime() {
    const date = new Date()

    let ampm = date.getHours() >= 12 ? 'PM' : 'AM';

    const hour = () => {
        const hours = date.getHours()
        if (hours > 12) {
            return hours - 12
        }
        return hours
    }

    const minute = () => {
        const minutes = date.getMinutes()
        if (minutes < 10) {
            return `0${minutes}`
        } else {
            return minutes
        }
    }

    const month = () => {
        const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JULY', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
        return months[date.getMonth() + 1]
    }

    const day = () => {
        const day = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
        return day[date.getDay()]
    }

    return `${day()}  &nbsp;|&nbsp;  ${month()} ${date.getDate()}  &nbsp;|&nbsp;  ${hour()}:${minute()} ${ampm}`
}

getTime()

// set value to html
time.innerHTML = getTime()
