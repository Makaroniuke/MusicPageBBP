const button = document.querySelector('button.checkout')
    
button.addEventListener('click', () =>{

    
    const date2 = document.getElementById('date').value
    if(date2){

    const preferences2 = document.getElementById('preferences').value
    fetch('/create-checkout-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            date: date2,
            preferences: preferences2
        })
    }).then(res=>{
    if(res.ok) return res.json()
    return res.json().then(json => Promise.reject(json))
    }).then(({url}) =>{
        window.location = url 
    }).catch(e=>{
        console.error(e.error)
    })
}
})

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

