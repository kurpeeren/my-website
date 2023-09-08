/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const sideNav = document.body.querySelector('#sideNav');
    if (sideNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#sideNav',
            rootMargin: '0px 0px -40%',
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

const githubUsername = 'kurpeeren'; // GitHub kullanıcı adı
const repoName = 'kurpeeren'; // Depo adı
const apiToken = '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'; // GitHub API anahtarı

// GitHub API'sı üzerinden README dosyasının içeriğini çekme
fetch(`https://api.github.com/repos/${githubUsername}/${repoName}/readme`, {
    headers: {
        Authorization: `token ${apiToken}`,
    },
})
    .then((response) => response.json())
    .then((data) => {
        const readmeContent = atob(data.content); // Base64 kodlanmış içeriği çözümle
        // README içeriğini kullanarak istediğiniz işlemi yapabilirsiniz
        // Başlangıç ve bitiş etiketlerini belirtin
        const startTag = '<div class="logos">';
        const endTag = '</div>';

        // Metni ayıklayacak düzenli ifadeyi oluşturun
        const pattern = new RegExp(`${startTag}(.*?)${endTag}`, 's');
        const match = readmeContent.match(pattern);

        // Eğer eşleşme varsa, metni alın
        if (match) {
            const extractedText = match[1];
            console.log(extractedText);

            // README içeriğini HTML olarak işleme
            const parser = new DOMParser();
            const readmeHTML = parser.parseFromString(extractedText, 'text/html');

            // "Languages and Tools" başlığını içeren bölümü seçme
            const languagesAndToolsSection = readmeHTML.querySelector('.logolist');

            // İlgili HTML içeriğini hedef elemente yerleştirme
            const targetElement = document.querySelector('.github-programingandtools');
            targetElement.innerHTML = languagesAndToolsSection.innerHTML;

            console.log(targetElement.innerHTML);
        } else {
            console.log("Belirtilen etiketler arasında metin bulunamadı.");
        }
    })
    .catch((error) => {
        console.error('GitHub API hatası:', error);
    });



// GitHub API'sı üzerinden kullanıcının tüm repolarını çekme
fetch(`https://api.github.com/users/${githubUsername}/repos`)
  .then((response) => response.json())
  .then((data) => {
    // Tüm repoların isimlerini alın
    const repoNames = data.map((repo) => repo.name);
    
    // Repoları konsola yazdırın
    console.log('Kullanıcının repoları:', repoNames);

    repoNames.forEach((repoName) => {
        // GitHub API'si üzerinden README dosyasının içeriğini çekme
        fetch(`https://api.github.com/repos/${githubUsername}/${repoName}/readme`)
          .then((response) => response.json())
          .then((data) => {
            const readmeContent = atob(data.content); // Base64 kodlanmış içeriği çözümle
            console.log(`README içeriği for ${repoName}:\n`, readmeContent);



          })
          .catch((error) => {
            console.error(`GitHub API hatası for ${repoName}:`, error);

            
          });
      });

  })
  .catch((error) => {
    console.error('GitHub API hatası:', error);
  });

  // Her bir repo için README dosyasını çekme işlemi
