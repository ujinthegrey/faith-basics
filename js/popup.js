const BIBLE_RST_URL = 'https://raw.githubusercontent.com/ujinthegrey/rst/main/rst.json'
const BIBLE_BOOKS_ABBR = [
    ['бытие', 'бытия', 'быт', 'бт'],
    ['исход', 'исхода', 'исх', 'ихд'],
    ['левит', 'лев', 'лв', 'лвт'],
    ['числа', 'чисел', 'чис', 'числ', 'чс'],
    ['второзаконие', 'второзакония', 'втор', 'второзак', 'второз', 'вт', 'втр', 'втрз'],
    ['иисуснавин', 'нисусанавина', 'ис.нав', 'ис.навин', 'ис.навина', 'нав', 'навин'],
    ['судьи', 'судей', 'суд', 'сд'],
    ['Руфь', 'Руфи', 'Руф', 'Рф'],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
]
const popup = document.querySelector('.popup')
const popupTitle = document.querySelector('.popup__title')
const popupText = document.querySelector('.popup__text')
const popupAnchors = document.querySelectorAll('._popup-anchor')

//---FULL AND SHOW POPUP-------------
if (popupAnchors.length) {
    for (let popupAnchor of popupAnchors) {
        popupAnchor.addEventListener('click', async (e) => {
            e.preventDefault()
            const addressToShow = popupAnchor.innerHTML.replace(/\s/g, '')
            popupTitle.innerHTML = addressToShow
            popupText.innerHTML = await gerBibleTextFromAddress(addressToShow)
            popup.classList.remove('_hidden')
            body.classList.add('_lock')
        })
    }
}

//-----HIDE POPUP BY CLICJ ----------------
if (popup) {
    popup.addEventListener('click', e => {
        e.preventDefault()
        popup.classList.add('_hidden')
        body.classList.remove('_lock')
    })
}
//--- BIBLE CONTENT -----------------
async function fetchBible() {
    try{
        return (await fetch(BIBLE_RST_URL)).json()
    } catch (e) {
        console.log('Ошибка при загрузке Библии по URL >>>>>>>>>>>>', e)
    }
}
async function getBibleText({ book, chapter, verses }) {
    try {
        let bibleText = []
        const bibleRst = await fetchBible()
        const bibleChapter = bibleRst['Books'][book]['Chapters'][chapter - 1]['Verses']
        for (let verse of verses) {
            const verseText = bibleChapter[verse - 1]['Text']
            bibleText.push(verseText)
        }
        console.log(bibleText.join(' '))
        return bibleText.join(' ')
    } catch (e) {
        console.log('Ошибка при загрузке библейского текста >>>>>>>>>>>>>>>', e);
    }
}
async function gerBibleTextFromAddress(stringAddress) {
    const addressObject = getAddressObject(stringAddress)
    console.log(addressObject)
    const bibleTextFromAddress = await getBibleText(addressObject)
    console.log(bibleTextFromAddress)
    return bibleTextFromAddress
}
//gerBibleTextFromAddress('Быт.1:1-4')

function getAddressObject(address) {
    cleanAddress = address.replace(/\s/g, '').toLowerCase()
    book = getBookByAbbr(cleanAddress.split('.')[0])
    chapter = +cleanAddress.split('.')[1].split(':')[0]
    verseRange = cleanAddress.split('.')[1].split(':')[1]
    let verses = []
    if (verseRange.includes('-')) {
        verseStart = +verseRange.split('-')[0]
        verseEnd = +verseRange.split('-')[1]
        for (let i = verseStart; i < verseEnd + 1; i++) {
            verses.push(`${i}`)
        }
    } else {
        verses.push(+verseRange)
    }
    return { book, chapter, verses}
}
console.log(getAddressObject('Быт.1:1'))

function getBookByAbbr(abbr) {
    for (let i = 0; i < BIBLE_BOOKS_ABBR.length; i++) {
        if (BIBLE_BOOKS_ABBR[i].includes(abbr)) {
            return i 
        }
    }
    return `книга ${abbr.toUpperCase()} не найдена`
}
