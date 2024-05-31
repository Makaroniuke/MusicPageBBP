const status = document.querySelectorAll("[id='status']");
for(var i = 0; i < status.length; i++){
    if(status[i].textContent === 'Approved'){
        status[i].style.color = 'green'
    }else if(status[i].textContent === 'Changed'){
        status[i].style.color = 'Orange'
    }else{
        status[i].style.color = 'red'
    }
}