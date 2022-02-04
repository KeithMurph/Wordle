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
const tileRows = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', '']
]

tileRows.forEach((tileRow, tileRowIndex) => {
   const rowElement = document.createElement('div')
   rowElement.setAttribute('id', 'tileRow-' + tileRowIndex)
   tileRow.forEach((tile, tileIndex) => {
     const tileElement =  document.createElement('div')
     tileElement.setAttribute('id', 'tileRow-' + tileRowIndex + '-tile-' + tileIndex)
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

const handleClick = (key) => {
    console.log('clicked', key )
}