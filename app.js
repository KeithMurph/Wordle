const tileDisplay = document.querySelector('.tileContainer');
const keyboard = document.querySelector('.keyContainer');

const worlde= 'SUPER'


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

guessRows.forEach((guessRow, guessRowIndex) => {
   const rowElement = document.createElement('div')
   rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)
   guessRow.forEach((guess, guessIndex) => {
     const tileElement =  document.createElement('div')
     tileElement.setAttribute('id', 'guessRow-' + guessRowIndex + '-tile-' + guessIndex)
     tileElement.classList.add('tile')
     rowElement.append(tileElement)
   })

   tileDisplay.append(rowElement)
})







// creates keyboard 
keys.forEach(key => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key 
    buttonElement.setAttribute('id', key)
    buttonElement.addEventListener('click', () => handleClick(key))
    keyboard.append(buttonElement)
})

const handleClick = (letter) => {
    console.log('%c clicked', 'color: green; background-color:black' , letter )
    addLetter(letter)
}


const addLetter = (letter) => {
   const tile =  document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
    tile.textContent = letter
    currentTile++
}