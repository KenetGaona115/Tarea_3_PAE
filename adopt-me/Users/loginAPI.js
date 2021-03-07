var show = false;

function showButton(x){
    show = x;
}

function getData(){
    return show;
}

module.exports = {
    showButton: showButton,
    getData: getData,
}