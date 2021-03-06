


const tileDisplay = document.querySelector('.tileContainer');
const keyboard = document.querySelector('.keyContainer');
const messageDisplay = document.querySelector('.messageContainer');


let wordle 

const getWordle = () => {
    fetch('http://localhost:3001/word')
    .then(response => response.json())
    .then(json => {
        console.log(json)
        wordle = json.toUpperCase()
    })
    .catch(err => console.log(err))
}
getWordle()


// keyboard buttons
const keys = [
    'Q',
    'W',
    'E',
    'R',
    'T',
    'Y',
    'U',
    'I',
    'O',
    'P',
    'A',
    'S',
    'D',
    'F',
    'G',
    'H',
    'J',
    'K',
    'L',
    'ENTER',
    'Z',
    'X',
    'C',
    'V',
    'B',
    'N',
    'M',
    '«',



];

// game tile rows 
const guessRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
]

let currentRow = 0
let currentTile = 0
let isGameOver = false


guessRows.forEach((guessRow, guessRowIndex) => {
    const rowElement = document.createElement('div')
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)
    guessRow.forEach((guess, guessIndex) => {
        const tileElement = document.createElement('div')
        tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
        tileElement.classList.add('tile')
        rowElement.append(tileElement)
    })

    tileDisplay.append(rowElement)
})






// creates keyboard 
keys.forEach(key => {
    const buttonElement = document.createElement('button', onclick='playAudio')
    buttonElement.textContent = key
    buttonElement.setAttribute('id', key)
    buttonElement.addEventListener('click', () => handleClick(key))
    keyboard.append(buttonElement)
 
})


// handles onscreen keyboard clicks 
const handleClick = (letter) => {
    if(!isGameOver) {
      
     
    console.log('%c clicked', 'color: green; background-color:black', letter)
    if (letter === '«') {
        deleteLetter()
        console.log('guessRows', guessRows)
        
        return
    }
    if (letter === 'ENTER') {
        checkRow()
        console.log('guessRows', guessRows)
        playAudio()
        return
    }
    addLetter(letter)
   
    console.log('guessRows', guessRows)
}
}


// adds a letter to guess row/guess tile 
const addLetter = (letter) => {
    if (currentTile < 5 && currentRow < 6) {
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = letter
        guessRows[currentRow][currentTile] = letter
        tile.setAttribute('data', letter)
        currentTile++

    }
}

// delete a letter with  '«' the on screen delete key
const deleteLetter = () => {
    if (currentTile > 0) {
        currentTile--
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = ''
        guessRows[currentRow][currentTile] = ''
        tile.setAttribute('data', '')
    }
}


// change row

const checkRow = () => {
    const guess = guessRows[currentRow].join('')
    console.log('guess', guess)
    if (currentTile > 4) {
        fetch(`http://localhost:3001/check/?word=${guess}`)
        .then(response =>  response.json())
        .then(json => {
            console.log(json)
            if (json == 'Entry word not found') {
                showMessage('Not a word!')
                return
            } else {
                console.log('guess is ' + guess, "answer is " + wordle)
                flipTile()
                if (wordle == guess) {
                    showMessage('CORRECT!')
                    isGameOver = true 
                    return
                } else {
                    if (currentRow >= 5) {
                        isGameOver = true
                        showMessage('Game Over')
                        return
                    }
                    if (currentRow < 5) {
                        currentRow++
                        currentTile = 0
                    }
            }
        }
        }).catch(err  => console.log(err))
        

        }
    }



// shows all messages
const showMessage = (message) => {
    const messageElement = document.createElement('p')
    messageElement.textContent = message
    messageDisplay.append(messageElement)
    setTimeout(() => messageDisplay.removeChild(messageElement), 2000)
}

//updated keyboard color

const addColorToKey = (keyLetter, color) => {
    const key = document.getElementById(keyLetter)
    key.classList.add(color)

}


const flipTile = () => {
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes
    let checkWordle = wordle
    const guess = []

    

    rowTiles.forEach(tile => {
        guess.push({
            letter: tile.getAttribute('data'),
            color: 'greyOverlay'
        })
    })

    guess.forEach((guess, index) => {
        if (guess.letter == wordle[index]) {
            guess.color = 'greenOverlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }

    })

    guess.forEach(guess => {
        if (checkWordle.includes(guess.letter)) {
            guess.color = 'yellowOverlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })


    rowTiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add('flip', guess[index].color)
            addColorToKey(guess[index].letter, guess[index].color)
        }, 390 * index)
    })


    
}

// add actual keyboard functionality 
 document.addEventListener("keyup", e => {
    console.log(e.key.toUpperCase());
    if(e.key.toUpperCase()==="BACKSPACE") {
        deleteLetter()
        return
       
    } else if(e.key.toUpperCase()=== "ENTER") {
        checkRow()
        
       
    } else if(currentRow<6) {
        addLetter(e.key.toUpperCase())
        return
      
        
    }
})


function playAudio()  {
    document.getElementById('Audio').play();

}
