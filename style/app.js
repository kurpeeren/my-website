// Değiştirmek istediğiniz yeni renk
var newColor = '#ff0000a4';
var defaultColor = '#61efff';
// .glowing-img#profile elementini seçin
var profileElement = document.querySelector('.glowing-img#profile');
const element = document.querySelector('.glowing-img#profile');

var profileElement = document.querySelector('.glowing-img#profile');
// .glowing-img#profile üzerine geldiğinizde çalışacak olay dinleyicisi ekleyin
profileElement.addEventListener('mouseover', function () {
   // --glow-color değişkenini değiştir
   document.documentElement.style.setProperty('--glow-color', newColor);
   element.style.zIndex = 2;
});
profileElement.addEventListener('mouseout', function () {
   // --glow-color değişkenini varsayılan renge geri döndür
   document.documentElement.style.setProperty('--glow-color', defaultColor);
   element.style.zIndex = 2;
});

// window.onload = function() {
//   var menuButton = document.getElementById("open-menu");
//   menuButton.click();
// };
// Sayfa yüklendiğinde menüyü gizle

function decodeText() {

   const metinListesi = [
      "INDUSTRY 5.0 AND DIGITAL TRANSFORMATION",
      "ROBOTICS AND AUTOMATION APPLICATIONS",
      "INDUSTRIAL DESIGN AND PRODUCT DEVELOPMENT",
      "INDUSTRY 4.0 AND AUTOMATION",
      "ELECTRIC ELECTRONIC ENGINEER",
      "EMBEDDED SYSTEM DESIGN",
      "ENGINEERING SOLUTIONS",
      "SOFTWARE DEVELOPMENT",
      "SIMULATION",
      "3D MODELING"
   ];


   const decodeText = document.querySelector('.decode-text');
   // decodeText içindeki tüm alt öğeleri temizle
   while (decodeText.firstChild) {
      decodeText.removeChild(decodeText.firstChild);
   }
   let oncekiSecilenMetin = ''; // Önceki seçilen metini saklayacak değişken

   // Rastgele bir metin seçene kadar devam edin
   let secilenMetin = '';
   do {
      const rastgeleIndeks = Math.floor(Math.random() * metinListesi.length);
      secilenMetin = metinListesi[rastgeleIndeks];
   } while (secilenMetin === oncekiSecilenMetin); // Eğer seçilen metin öncekiyle aynıysa tekrar seç

   oncekiSecilenMetin = secilenMetin; // Önceki seçilen metini güncelle

   const metin = secilenMetin; // Okunacak metin


   // Her karakter için dön
   for (let i = 0; i < metin.length; i++) {
      const karakter = metin[i];
      if (karakter === ' ') {
         // Boşluk karakteri ise space divi ekle
         const spaceDiv = document.createElement('div');
         spaceDiv.className = 'space';
         decodeText.appendChild(spaceDiv);
      } else {
         // Diğer karakterler için text-animation divi ekle
         const metinDiv = document.createElement('div');
         metinDiv.className = 'text-animation';
         metinDiv.textContent = karakter;
         decodeText.appendChild(metinDiv);
      }
   }
   var text = document.getElementsByClassName('decode-text')[0];
   // debug with
   // console.log(text, text.children.length);

   // assign the placeholder array its places
   var state = [];
   for (var i = 0, j = text.children.length; i < j; i++) {
      text.children[i].classList.remove('state-1', 'state-2', 'state-3');
      state[i] = i;
   }

   // shuffle the array to get new sequences each time
   var shuffled = shuffle(state);

   for (var i = 0, j = shuffled.length; i < j; i++) {
      var child = text.children[shuffled[i]];
      classes = child.classList;

      // fire the first one at random times
      var state1Time = Math.round(Math.random() * (2000 - 300)) + 50;
      if (classes.contains('text-animation')) {
         setTimeout(firstStages.bind(null, child), state1Time);
      }
   }
}

// send the node for later .state changes
function firstStages(child) {
   if (child.classList.contains('state-2')) {
      child.classList.add('state-3');
   } else if (child.classList.contains('state-1')) {
      child.classList.add('state-2')
   } else if (!child.classList.contains('state-1')) {
      child.classList.add('state-1');
      setTimeout(secondStages.bind(null, child), 100);
   }
}

function secondStages(child) {
   if (child.classList.contains('state-1')) {
      child.classList.add('state-2')
      setTimeout(thirdStages.bind(null, child), 100);
   } else if (!child.classList.contains('state-1')) {
      child.classList.add('state-1')
   }
}

function thirdStages(child) {
   if (child.classList.contains('state-2')) {
      child.classList.add('state-3')
   }
}

function shuffle(array) {
   var currentIndex = array.length,
      temporaryValue, randomIndex;

   // While there remain elements to shuffle...
   while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
   }
   return array;
}

// Demo only stuff
decodeText();
// beware: refresh button can overlap this timer and cause state mixups
setInterval(function () {
   decodeText();
}, 8000);

// İlk öğeyi 5 saniye sonra görünür yap
setTimeout(function () {
   var btnElement = document.getElementById("clickitbtn");
   btnElement.style.display = "block";
}, 10000);
