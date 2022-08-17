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
const popupBody = document.querySelector('.popup__body')
const popupTitle = document.querySelector('.popup__title')
const popupText = document.querySelector('.popup__text')
const popupAnchors = document.querySelectorAll('._popup-anchor')
if (popupAnchors.length) {
    for (let popupAnchor of popupAnchors) {
        popupAnchor.addEventListener('click', e => {
            e.preventDefault()
            const address = popupAnchor.innerHTML.replace(/\s/g, '')
            popupTitle.innerHTML = address
            //createPoputText(address)
            //popupText.innerHTML = getBibleText(popupAnchor.innerHTML.replace(/\s/g, ''))
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
}

//--- BIBLE CONTENT -----------------
const BIBLE_RST_URL = 'https://raw.githubusercontent.com/ujinthegrey/rst/main/rst.json'
async function getBibleVerse(book, chapter, verse) {
    const bibleVerse = await fetch(BIBLE_RST_URL)
        .then(response => response.json())
        .then(data => {
            console.log(
                data["Books"].find(b => b.BookName === book)['Chapters'][chapter - 1]['Verses'][verse - 1]['Text']
                )})
}
getBibleVerse('Зах.', 1, 1)