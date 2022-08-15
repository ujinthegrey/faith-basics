//---BIBLE TEXTS --------------
const bibleTexts = {
    'Рим. 1:18-21': 'Ибо открывается гнев Божий с неба на всякое нечестие и неправду человеков, подавляющих истину неправдою. 19 Ибо, что можно знать о Боге, явно для них, потому что Бог явил им. 20 Ибо невидимое Его, вечная сила Его и Божество, от создания мира через рассматривание творений видимы, так что они безответны. 21 Но как они, познав Бога, не прославили Его, как Бога, и не возблагодарили, но осуетились в умствованиях своих, и омрачилось несмысленное их сердце;',
    'Втор. 4:32-39': '1 Павел, раб Иисуса Христа, призванный Апостол, избранный к благовестию Божию, 2 которое Бог прежде обещал через пророков Своих, в святых писаниях, 3 о Сыне Своем, Который родился от семени Давидова по плоти 4 и открылся Сыном Божиим в силе, по духу святыни, через воскресение из мертвых, о Иисусе Христе Господе нашем, 5 через Которого мы получили благодать и апостольство, чтобы во имя Его покорять вере все народы, 6 между которыми находитесь и вы, призванные Иисусом Христом, - 7 всем находящимся в Риме возлюбленным Божиим, призванным святым: благодать вам и мир от Бога отца нашего и Господа Иисуса Христа. 8 Прежде всего благодарю Бога моего через Иисуса Христа за всех вас, что вера ваша возвещается во всем мире. 9 Свидетель мне Бог, Которому служу духом моим в благовествовании Сына Его, что непрестанно воспоминаю о вас, 10 всегда прося в молитвах моих, чтобы воля Божия когда-нибудь благопоспешила мне придти к вам, 11 ибо я весьма желаю увидеть вас, чтобы преподать вам некое дарование духовное к утверждению вашему,12 то есть утешиться с вами верою общею, вашею и моею.',

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
console.log(popupTitle);
const popupText = document.querySelector('.popup__text')
const popupAnchors = document.querySelectorAll('._popup-anchor')
if (popupAnchors.length) {
    for (let popupAnchor of popupAnchors) {
        popupAnchor.addEventListener('click', function (e) {
            e.preventDefault()
            popupTitle.innerHTML = popupAnchor.innerHTML
            popupText.innerHTML = bibleTexts[popupAnchor.innerHTML]
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