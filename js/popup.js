const BIBLE_RST_URL = 'https://raw.githubusercontent.com/ujinthegrey/rst/main/rst.json'
const BIBLE_BOOKS_ABBR = [
    ['бытие', 'бытия', 'быт', 'бт'],
    ['исход', 'исхода', 'исх', 'ихд'],
    ['левит', 'лев', 'лв', 'лвт'],
    ['числа', 'чисел', 'чис', 'числ', 'чс'],
    ['второзаконие', 'второзакония', 'втор', 'второзак', 'второз', 'вт', 'втр', 'втрз'],
    ['иисуснавин', 'нисусанавина', 'ис.нав', 'ис.навин', 'ис.навина', 'нав', 'навин'],
    ['судьи', 'судей', 'суд', 'сд'],
    ['руфь', 'руфи', 'руф', 'рф'],
    ['1царств', '1-аяцар', '1цар', '1царства'],
    ['2царств', '2-аяцар', '2цар', '2царства'],
    ['3царств', '3-аяцар', '3цар', '3царства'],
    ['4царств', '4-аяцар', '4цар', '4царства'],
    ['1паралипоменон', '1аяпаралипоменон', '1пар', '1аяпар', '1парал', '1паралип'],
    ['2паралипоменон', '2аяпаралипоменон', '2пар', '2аяпар', '2парал', '2паралип'],
    ['ездра', 'ездры', 'езд', 'ездр', 'эздра', 'эздры', 'эзд', 'эздр'],
    ['неемия', 'неемии', 'неем', 'нм'],
    ['есфирь', 'есфири', 'есф', 'есфр', 'есфир', 'эсфирь', 'эсфири', 'эсф', 'эсфр', 'эсфир'],
    ['иов', 'иова', 'ив'],
    ['псастирь', 'псалтири', 'псалиырь', 'псалтыри', 'псалм.', 'пс'],
    ['притчи', 'притч', 'пр', 'прит', 'прч', 'пртч'],
    ['екклесиаст', 'екклесиаста', 'еккл', 'екклес', 'экклесиаст', 'экклесиаста', 'эккл', 'экклес'],
    ['песняпесней', 'пенсипесней', 'песней', 'песн', 'пес'],
    ['исайя', 'исайи', 'ис'],
    ['иеремия', 'иеремии', 'иер', 'иерем'],
    ['плачиеремии', 'плачаиеремии', 'плач', 'пл', 'плиер', 'плиеремии'],
    ['иезекииль', 'иезекииля', 'иез', 'иезек', 'иезекиил'],
    ['даниил', 'даниила', 'дан', 'днл'],
    ['осия', 'осии', 'ос'],
    ['иоиль', 'иоиля', 'иоил'],
    ['амос', 'амоса', 'ам', 'амс'],
    ['авдий', 'авдия', 'авд', 'авдй'],
    ['иона', 'ионы', 'ион'],
    ['михей', 'михея', 'мих', 'мх'],
    ['наум', 'наума', 'нм'],
    ['аввакум', 'аввакума', 'авв', 'аввак'],
    ['софония', 'софонии', 'соф', 'софон'],
    ['аггей', 'аггея', 'агг', 'аг', 'агй'],
    ['захария', 'захарии', 'зах', 'захар', 'зхр'],
    ['малахия', 'малахии', 'мал', 'малах', 'млх'],
    ['матфей', 'матфея', 'матф', 'мат', 'мт', 'мф', 'мтф'],
    ['марк', 'марка', 'мар', 'мк', 'мр', 'мрк'],
    ['лука', 'луки', 'лук', 'лк'],
    ['иоанн', 'иоанна', 'иоан', 'ин', 'иан'],
    ['деяний', 'деяния', 'деян', 'дн'],
    ['римлянам', 'рим', 'римл', 'римлян', 'рм'],
    ['1коринфянам', '1коринф', '1кор', '1коринфян', '1корнф'],
    ['2коринфянам', '2коринф', '2кор', '2коринфян', '2корнф'],
    ['галатам', 'галат', 'гал', 'гл', 'глт', 'глтм'],
    ['ефесянам', 'ефесян', 'ефес', 'еф', 'ефс', 'эфесянам', 'эфесян', 'эфес', 'эф', 'эфс'],
    ['филиппийцам', 'филиппийц', 'филипп', 'филип', 'фил', 'флп'],
    ['колоссянам', 'колоссян', 'колосс', 'колос', 'кол', 'клсн', 'клснм'],
    ['1фессалоникийцам', '1фессал', '1фесс', '1фес', '1фслн'],
    ['2фессалоникийцам', '2фессал', '2фесс', '2фес', '2фслн'],
    ['1тимофея', '1тимофея', '1тим', '1тимоф', '1тмф'],
    ['2тимофея', '2тимофея', '2тим', '2тимоф', '2тмф'],
    ['тит', 'титу', 'тита'],
    ['филимону', 'филимон', 'филимонга', 'филим', 'флм'],
    ['ефпеям', 'евр'],
    ['иаков', 'иакова', 'иак', 'икв', 'иакв'],
    ['1петр', '1петра', '1пет', '1пт', '1оепетр', '1оепетра', '1оепет', '1оепт'],
    ['2петр', '2петра', '2пет', '2пт', '2оепетр', '2оепетра', '2оепет', '2оепт'],
    ['1иоанн', '1иоанна', '1иоан', '1ин', '1иан'],
    ['2иоанн', '2иоанна', '2иоан', '2ин', '2иан'],
    ['3иоанн', '3иоанна', '3иоан', '3ин', '3иан'],
    ['иуда', 'иуды', 'иуд', 'ид'],

    ['откровения', 'откровение', 'откр', 'отк', 'от'],
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
            popupText.innerHTML = 'загрузка текста...'
            popup.classList.remove('_hidden')
            body.classList.add('_lock')
            popupText.innerHTML = await gerBibleTextFromAddress(addressToShow)
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
        return bibleText.join(' ')
    } catch (e) {
        console.log('Ошибка при загрузке библейского текста >>>>>>>>>>>>>>>', e);
        return `не удалось найти текст по этому адресу`
    }
}
async function gerBibleTextFromAddress(stringAddress) {
    try {
        const addressObject = getAddressObject(stringAddress)
        const bibleTextFromAddress = await getBibleText(addressObject)
        return bibleTextFromAddress
    } catch (e) {
        console.log('Ошибка при загрузке библейского текста >>>>>>>>>>>>>>>', e);
        return `не удалось найти текст по этому адресу`
    }
}

function getAddressObject(address) {
    const cleanAddress = address.replace(/\s/g, '').toLowerCase()
    const book = getBookByAbbr(cleanAddress.split('.')[0])
    //------NORMALIZE CHAPTER NOMBERS --------------
    let chapter = +cleanAddress.split('.')[1].split(':')[0]
        if ((book === 18) && (chapter > 8) && (chapter < 147)) {
            chapter = chapter + 1
        }
    const verseRange = cleanAddress.split('.')[1].split(':')[1]
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
function getBookByAbbr(abbr) {
    for (let i = 0; i < BIBLE_BOOKS_ABBR.length; i++) {
        if (BIBLE_BOOKS_ABBR[i].includes(abbr)) {
            return i 
        }
    }
    return `книга ${abbr.toUpperCase()} не найдена`
}
