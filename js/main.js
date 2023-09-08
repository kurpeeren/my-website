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
            try {

                // README içeriğini HTML olarak işleme
                const parser = new DOMParser();
                const readmeHTML = parser.parseFromString(extractedText, 'text/html');

                // "Languages and Tools" başlığını içeren bölümü seçme
                const languagesAndToolsSection = readmeHTML.querySelector('.logolist');

                // İlgili HTML içeriğini hedef elemente yerleştirme
                const targetElement = document.querySelector('.github-programingandtools');
                targetElement.innerHTML = languagesAndToolsSection.innerHTML;

                console.log(targetElement.innerHTML);


            } catch (error) {
                console.error('README dosyası işleme hatası:', error);
            }
        } else {
            console.log("Belirtilen etiketler arasında metin bulunamadı.");
        }
    })
    .catch((error) => {
        console.error('GitHub API hatası:', error);
    });


