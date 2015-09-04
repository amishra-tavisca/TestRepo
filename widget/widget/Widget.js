
function start() {
    
    var city = ["beijing", "london", "moscow", "newdelhi", "newyork", "paris", "pune", "tokyo"]; //just add new cities here if supported by API
    var select = createDropdown(city);
    document.getElementById("Div1").innerHTML = "Select City ";
    document.getElementById("Div1").setAttribute("style", "border: solid; background: #FFCCFF; width:200px;");    
    document.getElementById("Div1").appendChild(select);
    var para = document.createElement("P");
}


function createDropdown(city) {

    var select = document.createElement("select");
    insertCitiesInDropdown(select,city);
    onChangeFunction(select);
    return select;
}


function insertCitiesInDropdown(select,city) {
    var cityCount = city.length;
    for (var i = 0; i < cityCount; i++) {
        var option1 = document.createElement("option");
        option1.value = city[i];
        option1.innerHTML = city[i].toUpperCase();
        select.appendChild(option1);
    }
}


function onChangeFunction(select) {

    select.onchange = function () {
        var selectedOption = select.options[select.selectedIndex];
        display(selectedOption.value);
    };
}


function display(city) {
    
    var el = document.getElementById('Div1');
    while (el.hasChildNodes() && el.childElementCount>1)
        el.removeChild(el.lastChild);        
    var info = getData(city);
    var json = JSON.parse(info);
    showCity(city);
    showWeatherType(json);
    showOtherInformation(json);   
}


function showCity(city) {
    var para = document.createElement("P");
    var t = document.createTextNode("CITY : " + city.toLocaleUpperCase());
    para.appendChild(t);
    document.getElementById("Div1").appendChild(para);
}


function showWeatherType(json) {

    var para = document.createElement("P");
    var img = document.createElement("img");
    img.src = json.weatherIconUrl[0].value;
    var t = document.createTextNode("~~~~" + json.weatherDesc[0].value.toLocaleUpperCase() + "~~~~");
    para.appendChild(t);
    document.getElementById("Div1").appendChild(para);
    document.getElementById("Div1").appendChild(img);
}


function showOtherInformation(json) {

    for (var key in json) {
        if (key == "weatherDesc" || key == "weatherIconUrl")
            continue;
        var para = document.createElement("P");
        var t = document.createTextNode(key.toLocaleUpperCase() + " : " + json[key].toLocaleUpperCase());
        para.appendChild(t);
        document.getElementById("Div1").appendChild(para);
    }
}


function getData(city) {

    var request = new XMLHttpRequest();
    request.open("get", "http://training.appyoda.io/api/weather/" + city, false);
    request.send();
    var info = request.responseText;    
    return info;
}

start();      // calling the start function



