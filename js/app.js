// ---DROPDOWN MENU ------------------
const body = document.querySelector('body')
const headerIcon = document.querySelector('.header__icon')
const dropdown = document.querySelector('.dropdown')

if (headerIcon && dropdown) {
    headerIcon.addEventListener('click', () => {
        headerIcon.classList.toggle('_active') 
        dropdown.classList.toggle('_active')
        body.classList.toggle('_lock')
    })
}

// ---SMOOTH ANCHOR SCROOL-------------
const anchors = document.querySelectorAll('a[href*="#"]')
if (anchors.length) {
    for (let anchor of anchors) {
            anchor.addEventListener('click', function (e) {
                e.preventDefault()
                headerIcon.classList.remove('_active')
                dropdown.classList.remove('_active')
                body.classList.remove('_lock')
                
                const blockToScroll = document.getElementById(anchor.getAttribute('href').substr(1))
                
                if (blockToScroll) {
                    blockToScroll.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    })
                }
            })
        }
    }

//---POPUP-------------
const popup = document.querySelector('.popup')
const popupTitle = document.querySelector('.popup__title')
const popupText = document.querySelector('.popup__text')
const popupAnchors = document.querySelectorAll('._popup-anchor')
if (popupAnchors.length) {
    for (let popupAnchor of popupAnchors) {
        popupAnchor.addEventListener('click', e => {
            e.preventDefault()
            popupTitle.innerHTML = popupAnchor.innerHTML.replace(/\s/g, '')
            //popupText.innerHTML = getBibleText(popupAnchor.innerHTML.replace(/\s/g, ''))
            console.log(getBibleText(popupAnchor.innerHTML.replace(/\s/g, '')));
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

//--- BIBLE CONTENT -----------------
const getBibleBookAddress = (textAddress) => {
    const book = textAddress.split('.')[0] + '.'
    return book
}
const getBibleChapterAddress = (textAddress) => {
    const chapter = textAddress.split('.')[1].split(':')[0]
    return chapter
}
const getBibleVersesAddress = (textAddress) => {
    const verses = textAddress.split('.')[1].split(':')[1]
    const versesArray = []

    if (verses.includes('-')) {
        const verseStart = +verses.split('-')[0]
        const verseEnd = +verses.split('-')[1]
        for (let i = verseStart; i < verseEnd + 1; i++) {
            versesArray.push(i.toString())
        }
    } else {
        versesArray.push(verses)
    }
    return versesArray
}
const getBibleVerse = async (book, chapter, verse) =>{
    const response = await fetch('https://raw.githubusercontent.com/ujinthegrey/rst/main/rst.json')
    const data = await response.json()
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        return (data['Books']
            .find(b => b.BookName === book)
            ['Chapters'][chapter - 1]
            ['Verses'][verse - 1]
            ['Text']
        )
    })
}

console.log(getBibleVerse('Быт.',  1,  1))

const getBibleText = (address) => {
    const book = getBibleBookAddress(address)
    const chapter = getBibleChapterAddress(address)
    const verses = getBibleVersesAddress(address)
    let bibleText = ''

    if (verses.length > 1) {
        for (let verse of verses) {
            bibleText = bibleText + ' ' + getBibleVerse(book, chapter, verse)
        }
    } else {
        bibleText = verses[0].text
    }
    return bibleText
}

/* console.log(getBibleText('Лев.7:10-11')) */
