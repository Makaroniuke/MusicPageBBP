var lessons = JSON.parse(document.getElementById('dates').getAttribute('data-dates'));

let dates = []
function checkDate(){
    for(let i=0; i < lessons.length; i++){       
        dates.push( new Date(lessons[i].date).toISOString().substring(0, 10))
    }
    console.log(dates)
}
checkDate()

var fp = flatpickr(".date", {
    inline: true,
    minDate: "today",
    maxDate: new Date().fp_incr(28), 
    disable: dates, 
    locale: {
        "firstDayOfWeek": 1 // start week on Monday
    }
})