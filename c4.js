var player1 = {
    name : "",
    color : "#0000ff",
    score : 0
}

var player2 = {
    name : "",
    color : "#ff0000",
    score : 0
}

var rows = $('tr')

var cols = {}

for(var i = 0; i < 7; i++){
    cols[i] = rows.eq(i).find('span.dot')
}

var firstGame = true;
var ongoing = false;
var moves = 0;

function clearBoard(){
    $('span.dot').removeClass('P1dot')
    $('span.dot').removeClass('P2dot')
    $('span.dot').removeClass('irrelevantdot')
    $('span.dot').css('background-color', '#f7f7f7')
}

function updatePlayerInfo(){
    $('#nameP1').text(player1['name'])
    $('#nameP2').text(player2['name'])
    updateColors()
    updatePlayerScores()
}

function updateColors() {
    $('.P1').css('background-color', player1['color'])
    $('.P1dot').css('background-color', player1['color'])
    $('.P2').css('background-color', player2['color'])
    $('.P2dot').css('background-color', player2['color'])
}

function updatePlayerScores(){
    $('#scoreP1').text(player1['score'])
    $('#scoreP2').text(player2['score'])
}

function NewGame(){

    if(firstGame == true || confirm("Would you like to change contestents?") == true){
        player1['name'] = null
        player2['name'] = null
        while(player1['name'] == "" || player1['name'] == null) player1['name'] = prompt("Enter first competitor's name: ")
        while(player2['name'] == "" || player2['name'] == null) player2['name'] = prompt("Enter the other competitor's name: ")
        firstGame = false;
        player1['score'] = 0
        player2['score'] = 0
    }

    clearBoard()
    updatePlayerInfo()
    moves = 0
    if((moves + player1['score'] + player2['score']) % 2){
        $('.P1').css('opacity', '0.45')
        $('.P2').css('opacity', '0.90') 
        alert(player2['name'] + " starts. Have fun.")
    }
    else {
        $('.P2').css('opacity', '0.45')
        $('.P1').css('opacity', '0.90')
        alert(player1['name'] + " starts. Have fun.")
       
    }

    $('#starter').text('Restart')
    ongoing = true
}

function move(){
    if(ongoing == false) return;
    var row = rows.index($(this).parent().parent())
    var col = cols[row].index($(this))
    for(var i = 5; i >= 0; i--){
        if(cols[i].eq(col).attr('class') == 'dot'){
            moves++;
            if((moves + player1['score'] + player2['score']) % 2) {
                cols[i].eq(col).toggleClass('P1dot')
                $('.P1').css('opacity', '0.45')
                $('.P2').css('opacity', '0.90')
            }
            else {
                cols[i].eq(col).toggleClass('P2dot');
                $('.P2').css('opacity', '0.45')
                $('.P1').css('opacity', '0.90')
            }
            updatePlayerInfo()
            checkVictory(i, col)
            if(ongoing && moves == 42) draw()
            return null;
        }
    }
    alert('No possible moves there. Try Again.')
}

function checkVictory(row, col){
    var cls = cols[row].eq(col).attr('class')
    //H
    var count = 1, i = col + 1
    
    while(i < 7 && cols[row].eq(i).attr('class') == cls) {
        i++; count++;
    }
    
    i = col - 1

    while(i >= 0 && cols[row].eq(i).attr('class') == cls) {
        i--; count++;
    }

    if(count >= 4) {victory('H', row, col); return null;}

    //V
    var count = 1, i = row + 1
    
    while(i < 6 && cols[i].eq(col).attr('class') == cls) {
        i++; count++;
    }

    i = row - 1
    while(i >= 0 && cols[i].eq(col).attr('class') == cls) {
        i--; count++;
    }
    if(count >= 4) {victory('V', row, col); return null;}
    
    //D1 \
    var count = 1, ir = row + 1, ic = col - 1
    while(ir < 6 && ic >= 0 && cols[ir].eq(ic).attr('class') == cls) {
        ir++; ic--; count++;
    }

    ir = row - 1; ic = col + 1

    while(ir >= 0 && ic < 7 && cols[ir].eq(ic).attr('class') == cls) {
        ir--; ic++; count++;
    }
    if(count >= 4) {victory('D1', row, col); return null;}

    //D2 /
    var count = 1, ir = row + 1, ic = col + 1
    while(ir < 6 && ic < 7 && cols[ir].eq(ic).attr('class') == cls) {
        ir++; ic++; count++;
    }

    ir = row - 1; ic = col - 1

    while(ir >= 0 && ic >= 0 && cols[ir].eq(ic).attr('class') == cls) {
        ir--; ic--; count++;
    }
    if(count >= 4) {victory('D2', row, col); return null;}
}

function victory(how, row, col) {
    var cls = cols[row].eq(col).attr('class')
    var victoryElements = [cols[row].eq(col)]

    if(how == 'H') {
        var i = col + 1
        while(i < 7 && cols[row].eq(i).attr('class') == cls) {
            victoryElements.push(cols[row].eq(i))
            i++;
        }
        i = col - 1
        while(i >= 0 && cols[row].eq(i).attr('class') == cls) {
            victoryElements.push(cols[row].eq(i))
            i--;
        }
    }

    if(how == 'V') {
        var i = row + 1
        while(i < 6 && cols[i].eq(col).attr('class') == cls) {
            victoryElements.push(cols[i].eq(col))
            i++;
        }
        i = row - 1
        while(i >= 0 && cols[i].eq(col).attr('class') == cls) {
            victoryElements.push(cols[i].eq(col))
            i--;
        }
    }

    if(how == 'D1') {
        var ir = row + 1, ic = col - 1
        while(ir < 6 && ic >= 0 && cols[ir].eq(ic).attr('class') == cls) {
            victoryElements.push(cols[ir].eq(ic))
            ir++; ic--;
        }

        ir = row - 1; ic = col + 1

        while(ir >= 0 && ic < 7 && cols[ir].eq(ic).attr('class') == cls) {
            victoryElements.push(cols[ir].eq(ic))
            ir--; ic++;
        }
    }
 
    if(how == 'D2'){
        var ir = row + 1, ic = col + 1
        while(ir < 6 && ic < 7 && cols[ir].eq(ic).attr('class') == cls) {
            victoryElements.push(cols[ir].eq(ic))
            ir++; ic++;
        }

        ir = row - 1; ic = col - 1

        while(ir >= 0 && ic >= 0 && cols[ir].eq(ic).attr('class') == cls) {
            victoryElements.push(cols[ir].eq(ic))
            ir--; ic--;
        }
    }

    $('span.dot').addClass('irrelevantdot')
    for(var e of victoryElements){
        e.toggleClass('irrelevantdot')
    }
    $('.irrelevantdot').css('background-color', '#292b2c')
    var winner;
    if((moves + player1['score'] + player2['score']) % 2 == 1){
        winner = player1['name']
        player1['score']++
        $('.P1').css('opacity', '1')
        $('.P2').css('opacity', '0.45')
    }
    else{
        winner = player2['name']
        player2['score']++
        $('.P1').css('opacity', '0.45')
        $('.P2').css('opacity', '1')
    } 
    
    alert('Victory for ' + winner + ' : ' + how)
    
    ongoing = false
    updatePlayerScores()
    $('#starter').text('New Game')
}
function draw() {
    player1['score'] += 0.5
    player2['score'] += 0.5
    alert('No more moves possible. Draw.')
    ongoing = false
    updatePlayerScores()
    $('#starter').text('New Game')
    $('.P1').css('opacity', '0.90')
    $('.P2').css('opacity', '0.90')

}

$('span.dot').click(move)

$('#starter').click(NewGame)

$('#colorP1').on("input", function(){
    player1['color'] = $('#colorP1').val()
    updatePlayerInfo()
})

$('#colorP2').on("input", function(){
    player2['color'] = $('#colorP2').val()
    updatePlayerInfo()
})
