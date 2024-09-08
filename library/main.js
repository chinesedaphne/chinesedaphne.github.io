let lastClickTime = 0;
let clickCount = 0;
let the_sayac = 0;
let texts = [];

window.onload = function() {
    let languageCode = (navigator.language || navigator.userLanguage).split('-')[0];
    changelanguage(languageCode);
    updatetexts();
}

function checktherunners() {
    if (localStorage.getItem("score") == null) {
        localStorage.setItem("score", encrypt(0));
    }
    if (localStorage.getItem("click_power_level") == null) {
        localStorage.setItem("click_power_level", encrypt(1));
    }
    if (localStorage.getItem("auto_clicker_level") == null) {
        localStorage.setItem("auto_clicker_level", encrypt(1));
    }
    if (localStorage.getItem("click_per_seconds_level") == null) {
        localStorage.setItem("click_per_seconds_level", encrypt(2));
    }
}

function a() {
    setInterval(function() { 
        let a = parseInt(decrypt(localStorage.getItem("auto_clicker_level")));
        let score = parseInt(decrypt(localStorage.getItem("score")));
        localStorage.setItem("score", encrypt(score + a));
        updatetexts();
    }, 1000);
}

let inv = setInterval(function() {
    if (parseInt(decrypt(localStorage.getItem("auto_clicker_level"))) >= 2) {
        a();
        clearInterval(inv);
    }
}, 100);

checktherunners();

const main_get = document.getElementById("main-picture");
const whyareyousoserious = document.getElementById("thisisthenumber");
const ability_price_html = document.getElementsByClassName("ability_price");

const click_power = document.getElementById("click_power");
const auto_clicker = document.getElementById("auto_clicker");
const click_per_seconds = document.getElementById("click_per_seconds");
const level_counter = document.getElementsByClassName("level-counter");
const content_inside = document.getElementsByClassName("content-inside");

content_inside[0].addEventListener("click", function() { calculate_points(1); });
content_inside[1].addEventListener("click", function() { calculate_points(2); });
content_inside[2].addEventListener("click", function() { calculate_points(3); });

main_get.addEventListener("click", function() {
    the_sayac = parseInt(decrypt(localStorage.getItem("score")));
    let the_timer = decrypt(localStorage.getItem("click_per_seconds_level"));
    const currentTime = Date.now();
    
    if (currentTime - lastClickTime < 1000) {
        clickCount++;
        if (clickCount > the_timer) {
            alert(texts.ability_seconds_error.replace("{needed}", the_timer));
            return;
        }
    } else {
        clickCount = 1;
        lastClickTime = currentTime;
    }

    the_sayac = the_sayac + parseInt(decrypt(localStorage.getItem("click_power_level")));
    localStorage.setItem("score", encrypt(the_sayac));
    updatetexts();
});
function hello() {
    const sound = new Howl({
        src: ['media/this_is_a_important_sound.mp3'],
    });

    sound.on('loaderror', function() {
        console.log('Load error occurred.');
    });

    sound.on('playerror', function() {
        console.log('Play error occurred.');
        sound.play();
    });

    sound.play();
}



function updatetexts() {
    whyareyousoserious.innerText = decrypt(localStorage.getItem("score"));
    level_counter[0].innerText = decrypt(localStorage.getItem("click_power_level"));

    if (parseInt(decrypt(localStorage.getItem("auto_clicker_level"))) > 1) {
        level_counter[1].innerText = parseInt(decrypt(localStorage.getItem("auto_clicker_level")));
    } else {
        level_counter[1].innerText = parseInt(decrypt(localStorage.getItem("auto_clicker_level")) - 1);
    }

    level_counter[2].innerText = decrypt(localStorage.getItem("click_per_seconds_level"));
    ability_price_html[0].innerText = texts.ability_price.replace("{dudes}", (parseInt(decrypt(localStorage.getItem("click_power_level"))) * 200));
    ability_price_html[1].innerText = texts.ability_price.replace("{dudes}", (parseInt(decrypt(localStorage.getItem("auto_clicker_level"))) * 300));
    ability_price_html[2].innerText = texts.ability_price.replace("{dudes}", (parseInt(decrypt(localStorage.getItem("click_per_seconds_level"))) * 100));

    click_per_seconds.innerText = texts['ability1'];
    auto_clicker.innerText = texts['ability2'];
    click_per_seconds.innerText = texts['ability3'];
}

function changelanguage(language) {
    texts = LanguageRepo[language];
    updatetexts();
}

function calculate_points(which_one) {
    let which_item = "";
    let multipler = 0;

    switch (which_one) {
        case 1:
            which_item = "click_power_level";
            multipler = 200;
            break;
        case 2:
            which_item = "auto_clicker_level";
            multipler = 300;
            break;
        case 3:
            which_item = "click_per_seconds_level";
            multipler = 100;
            break;
        default:
            break;
    }

    let a = parseInt(decrypt(localStorage.getItem(which_item)));
    let pointsforthis = decrypt(localStorage.getItem("score"));
    let allthe = pointsforthis - (a * multipler);

    if (allthe >= 0) {
        localStorage.setItem("score", encrypt(Math.abs(allthe)));
        localStorage.setItem(which_item, encrypt(a + 1));
        updatetexts();
    } else {
        alert(texts.ability_price_dont_error.replace("{points}", -allthe));
    }
}
document.addEventListener('DOMContentLoaded', function () {
    const floaterButton = document.getElementById('floater-button');
    const floaterContainer = document.getElementById('floater-container');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.querySelector('#floater-container .close-btn');

    floaterButton.addEventListener('click', () => {
        floaterContainer.classList.add('active');
        overlay.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        floaterContainer.classList.remove('active');
        overlay.classList.remove('active');
    });

    overlay.addEventListener('click', () => {
        floaterContainer.classList.remove('active');
        overlay.classList.remove('active');
    });
});