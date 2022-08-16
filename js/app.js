//---BIBLE TEXTS --------------
const bibleTexts = {
    'Рим.1:18-21': 'Ибо открывается гнев Божий с неба на всякое нечестие и неправду человеков, подавляющих истину неправдою. 19 Ибо, что можно знать о Боге, явно для них, потому что Бог явил им. 20 Ибо невидимое Его, вечная сила Его и Божество, от создания мира через рассматривание творений видимы, так что они безответны. 21 Но как они, познав Бога, не прославили Его, как Бога, и не возблагодарили, но осуетились в умствованиях своих, и омрачилось несмысленное их сердце;',
    'Втор.4:32-39': '32 Ибо спроси у времен прежних, бывших прежде тебя, с того дня, в который сотворил Бог человека на земле, и от края неба до края неба: бывало ли что-нибудь такое, как сие великое дело, или слыхано ли подобное сему? 33 слышал ли [какой] народ глас Бога, говорящего из среды огня, и остался жив, как слышал ты? 34 или покушался ли [какой] бог пойти, взять себе народ из среды [другого] народа казнями, знамениями и чудесами, и войною, и рукою крепкою, и мышцею высокою, и великими ужасами, как сделал для вас Господь, Бог ваш, в Египте пред глазами твоими? 35 Тебе дано видеть [это], чтобы ты знал, что [только] Господь есть Бог, [и] нет еще кроме Его; 36 с неба дал Он слышать тебе глас Свой, дабы научить тебя, и на земле показал тебе великий огнь Свой, и ты слышал слова Его из среды огня; 37 и так как Он возлюбил отцов твоих и избрал [вас], потомство их после них, то и вывел тебя Сам великою силою Своею из Египта, 38 чтобы прогнать от лица твоего народы, которые больше и сильнее тебя, [и] ввести тебя [и] дать тебе землю их в удел, как это ныне [видно]. 39 Итак знай ныне и положи на сердце твое, что Господь есть Бог на небе вверху и на земле внизу, [и] нет еще [кроме Его];',
    'Рим.2:14-15': '14 ибо когда язычники, не имеющие закона, по природе законное делают, то, не имея закона, они сами себе закон: 15 они показывают, что дело закона у них написано в сердцах, о чем свидетельствует совесть их и мысли их, то обвиняющие, то оправдывающие одна другую)',
    'Иоан.1:18': '',
    'Иоан.1:18': '',
    'Иоан.1:18': '',
}

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
            popupText.innerHTML = bibleTexts[popupAnchor.innerHTML.replace(/\s/g, '')]
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

const getBibleAddress = (textAddress) => {
    const textAddressNoSpaces = textAddress.replace(/\s/g, '')
    const book = textAddressNoSpaces.split('.')[0] + '.'
    const chapter = textAddressNoSpaces.split('.')[1].split(':')[0]
    const verse = textAddressNoSpaces.split('.')[1].split(':')[1]
    return { book, chapter, verse }
}

const getBibleText = ({ book, chapter, verse }) =>{
    fetch('https://raw.githubusercontent.com/ujinthegrey/rst/main/rst.json')
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data['Books']
            .find(b => b.BookName === book)
            ['Chapters'][chapter - 1]
            ['Verses'][verse - 1]
            ['Text']
        )
    })
}

//getBibleText(5, 1, 1)
console.log(getBibleAddress('Зах. 11:8'))
getBibleText(getBibleAddress('Зах. 11:8'))