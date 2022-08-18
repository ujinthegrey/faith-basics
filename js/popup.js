const BIBLE_RST_URL = 'https://raw.githubusercontent.com/ujinthegrey/rst/main/rst.json'
//const body = document.querySelector('body')
const popupAnchors = document.querySelectorAll('._popup-anchor')

//---POPUP-------------
/* const popup = document.querySelector('.popup')
//const popupBody = document.querySelector('.popup__body')
const popupTitle = document.querySelector('.popup__title')
const popupText = document.querySelector('.popup__text')
const popupAnchors = document.querySelectorAll('._popup-anchor')
if (popupAnchors.length) {
    for (let popupAnchor of popupAnchors) {
        popupAnchor.addEventListener('click', e => {
            e.preventDefault()
            const addressToShow = popupAnchor.innerHTML.replace(/\s/g, '')
            popupTitle.innerHTML = addressToShow
            const popupText = document.createElement('p')
            popupText.classList.add('popup__text')
            popupText.textContent = getBibleVerse('Мал', 1, 1)
            popupBody.append(popupText)
            popupText.innerText = getBibleVerse('Лев.', 3, 1)
            popup.classList.remove('_hidden')
            body.classList.add('_lock')
        })
    }
}
if (popup) {
    popup.addEventListener('click', e => {
        e.preventDefault()
        popup.classList.add('_hidden')
        body.classList.remove('_lock')
    })
}
function createPoputText(popupBody, address) {
    const popupText = document.createElement('p')
    popupText.classList.add('popup__text')
    popupText.textContent = getBibleText(address)
    popupBody.append(popupText)
    return popupBody
} */


//createBibleTextPopup('Зах.1:1', 'В восьмой месяц...')


// ----CREATE POPUP ----------------
{/* <div class="popup _hidden">
    <div class="popup__body">
    <h1 class="popup__title"></h1>
    <p class="popup__text"></p>
</div> */}
async function fetchAndApendBibleVerse({book, chapter, verse}) {
    const bibleRst = await fetchBibleRst()
    const bibleVerse = getBibleVerse(bibleRst, {book, chapter, verse})
    console.log('fetchAndApendBibleVerse >>>>>>>>>>>>>>>>>>', 'bibleVerse >>>>>>>>>>>>>>>', bibleVerse)
    const bibleTextPopup = createBibleTextPopup(`${book}${chapter}${verse}`, bibleVerse)
    body.append(bibleTextPopup)
}
//fetchAndApendBibleVerse({ bool: 'Мал.', chapter: '2', verse: '9'})

function createBibleTextPopup(address, bibleVerse) {
    const popup = document.createElement('div')
    popup.classList.add('popup')
    const popupBody = document.createElement('div')
    popupBody.classList.add('popup__body')
    const popupTitle = document.createElement('h1')
    popupTitle.classList.add('popup__title')
    popupTitle.textContent = address
    const popupText = document.createElement('p')
    popupText.classList.add('popup__text')
    popupText.textContent = bibleVerse
    popupBody.append(popupTitle)
    popupBody.append(popupText)
    popup.append(popupBody)
    console.log('createBibleTextPopup', address, bibleVerse)
    return popup
} 

//--- BIBLE CONTENT -----------------
async function fetchBible() {
    try{
        return (await fetch(BIBLE_RST_URL)).json()
    } catch (e) {
        console.log('Ошибка при загрузке Библии по URL >>>>>>>>>>>>', e)
    }
}
async function getBibleVerse(b, c, v) {
    try {
        const bibleRst = await fetchBible()
        console.log('getBibleVerse() >>>>>>>>>>>>>>>',
        bibleRst['Books'][b]['Chapters'][c]['Verses'][v]['Text']
        )
    } catch (e) {
        console.log('Ошибка при поиске стиха >>>>>>>>>>>>>>>', e)
    }
}
function getAddressObject(address) {
    cleanAddress = address.replace(/\s/g, '').toLowerCase()
    book = cleanAddress.split('.')[0] + '.'
    chapter = cleanAddress.split('.')[1].split(':')[0]
    verseRange = cleanAddress.split('.')[1].split(':')[1]
    let verses = []
    if (verseRange.includes('-')) {
        verseStart = +verseRange.split('-')[0]
        verseEnd = +verseRange.split('-')[1]
        for (let i = verseStart; i < verseEnd + 1; i++) {
            verses.push(`${i}`)
        }
    } else {
        verses.push(verseRange)
    }
    return { book, chapter, verses}
}
console.log(getAddressObject('Зах.4:2-4'))
getBibleVerse(37, 2, 8)

//logBible()

/* async function getBibleVerse(book, chapter, verse) {
    try {
        const bibleVerse = await fetch(BIBLE_RST_URL)
            .then(response => response.json())
            .then(data => {
                console.log( 'getBibleVerse >>>>>>>>>>>>>',
                    data["Books"].find(b => b.BookName.toLowerCase() === book.toLowerCase())['Chapters'][chapter - 1]['Verses'][verse - 1]['Text']
                    )})
    } catch (e) {
        console.log('Ошибка при загрузке места Писания', e)
    }
} */

//getBibleVerse('Зах.', 1, 1)
//console.log(getAddressObject('Рим.2:4-7'))
//getBibleText('Рим.2:4-7')

/* function getBibleText(address = 'Езд.7:10') {
    const addressObject = getAddressObject(address)
    const book = addressObject.book
    const chapter = addressObject.chapter
    const verse = addressObject.verses[0]
    let bibleText = getBibleVerse(book, chapter, verse)  
    console.log('getBibleText >>>>>>>>>>>>>', bibleText);
    return bibleText
} */

function getAddressObject(address) {
    cleanAddress = address.replace(/\s/g, '').toLowerCase()
    book = cleanAddress.split('.')[0] + '.'
    chapter = cleanAddress.split('.')[1].split(':')[0]
    verseRange = cleanAddress.split('.')[1].split(':')[1]
    let verses = []
    if (verseRange.includes('-')) {
        verseStart = +verseRange.split('-')[0]
        verseEnd = +verseRange.split('-')[1]
        for (let i = verseStart; i < verseEnd + 1; i++) {
            verses.push(`${i}`)
        }
    } else {
        verses.push(verseRange)
    }
    return { book, chapter, verses}
}