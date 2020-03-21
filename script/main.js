//=================Butoane
var start = 4, add = 2
var numberPlace
var button1 = document.getElementById('button1')
var button2 = document.getElementById('button2')
var button3 = document.getElementById('button3')
var button4 = document.getElementById('button4')
var screen = document.getElementById('screen')

button1.onclick = function (){
    table = table.concat(addNumbers(add))
    generateTable()
}

/*
function button2CheckOnRow(place){
    for(var i = place + 1 ; i < table.length ; i++){
        if(table[place] + table[i] == 10 || table[place] == table[i]){
            return i
        }else if(table[place] != -1) return -1
    }
}

function button2CheckOnColumn(place) {
    for(var i = place + 9 ; i < table.length ; i++){
        if(table[place] + table[i] == 10 || table[place] == table[i]){
            return i
        }else if(table[place] != -1) return -1
    }
}
*/
button2.onclick = function (){
    for(var i = 0 ; i < table.length - 1 ; i++){
        if(table[i] != -1){
            var matchedPlace = button2CheckOnRow(i)
            if(matchedPlace != -1){
                console.log(i, matchedPlace)
                break
            }else{
                matchedPlace = button2CheckOnColumn(i)
                if(matchedPlace != -1){
                    console.log(i, matchedPlace)
                    break
                }
            }
        }
    }
}

button3.onclick = function (){
    table = generateTableNumbers(start)
    generateTable()
}

button4.onclick = function (){

}
/*
function numberHandle(event) {
    var numberSelected = Number(event.target.id)

    if(numberSelected == numberPlace){
        numberPlace = -1
        event.target.classList.remove("selected")
    }
    else if(numberPlace == -1){
        numberPlace = numberSelected
        event.target.classList.add("selected")
    }
    else{
        document.getElementById(numberPlace).classList.remove("selected")
        if(checkPlaces(numberSelected, numberPlace)){
            table[numberSelected] = -1
            table[numberPlace] = -1
            generateTable()
        }
        numberPlace = -1
    }
}
*/
//=================Generare tabel
/*
function generateTableNumbers(counter) {
    var counter = counter*6
    var numbers = []
    
    for(var i = 0 ; i <= counter / 2 - 1 ; i++){
        var number = Math.floor((Math.random() * 9) + 1)
        numbers[i*2] = number
        numbers[i*2+1] = number
    }

    for(var i = 0 ; i <= counter - 1 ; i++){
        var newIndex = Math.floor(Math.random() * (counter - 1))
        var aux = numbers[i]
        numbers[i] = numbers[newIndex]
        numbers[newIndex] = aux
    }

    return numbers
}
*//*
function addNumbers(add) {
    var counter = add * 6

    var t = [], t1 = [], ct = 0

    for(var i = 0 ; i < table.length ; i++)
        if(table[i] != -1) t[ct++] = table[i]
    
    ct = 0
    for(var i = 0 ; i < counter ; i++)
        t1[ct++] = t[Math.floor(Math.random() * (t.length - 1))]
    return t1
}*/
/*
function remove1CheckRow(rowStart, rowEnd){
    for(var j = rowStart + 1 ; j <= rowEnd ; j++)
         if(table[j] != -1) return 0
    return 1
}

function remove1() {
    var rows = Math.floor((table.length + 1)/9)
    
    for(var i = 0 ; i < rows ; i++){
        var rowStart = i*9
        var rowEnd = i*9+8
        if(table[rowStart] == -1)
            if(remove1CheckRow(rowStart, rowEnd)) table.splice(rowStart, 9)
    }
}*/
/*
function generateTable() {
    remove1()
    var content = '';
    numberPlace = -1

    for(var i in table){
        if(table[i]!=-1)
        content += '<div onclick="numberHandle(event)" id="'+ i + '" class="number" >' + table[i] + '</div>'
        
        else
        content += '<div class="empty"></div>'
    }
    screen.innerHTML = content

    document.getElementById(10).classList.add('checked')
}
*/
//=================Check
/*function checkOnColumn(place1, place2) {
    if((place2 - place1) % 9 != 0) return 0
        
    for(var i = place1 + 9 ; i < place2 ; i+=9)
        if(table[i] != -1) return 0;
        
    return 1
}

function checkOnLine(place1, place2) {
    for(var i = place1 + 1 ; i < place2 ; i++)
        if(table[i] != -1) return 0

    return 1

}

function checkPlaces(place1, place2) {

    if(table[place1] != table[place2] && table[place1] + table[place2] != 10) return 0

    if(place1 == place2) return 0

    if(place2 < place1){
        var aux = place1
        place1 = place2
        place2 = aux
    }

    if(checkOnLine(place1, place2)) return 1

    if(checkOnColumn(place1, place2)) return 1

}
*/
table = generateTableNumbers(start)
generateTable()