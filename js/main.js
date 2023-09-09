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

// GitHub API'sı üzerinden README dosyasının içeriğini çekme
fetch(`https://api.github.com/repos/${githubUsername}/${repoName}/readme`)
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
                    //console.log(`README içeriği for ${repoName}:\n`, readmeContent);

                    // README içeriğini kullanarak istediğiniz işlemi yapabilirsiniz
                    // Başlangıç ve bitiş etiketlerini belirtin
                    const startTag = '<!-- <p class="open-website" >';
                    const endTag = '</p> -->';
                    const startTagdate = '<!-- <p class="date-website" >';
                    const endTagdate = '</p> -->';
                    // Metni ayıklayacak düzenli ifadeyi oluşturun
                    const patternName = new RegExp(`${startTag}(.*?)${endTag}`, 's');
                    const patternDate = new RegExp(`${startTagdate}(.*?)${endTagdate}`, 's');
                    const matchname = readmeContent.match(patternName);
                    const matchdate = readmeContent.match(patternDate);
                    // Eğer eşleşme varsa, metni alın
                    if (matchname && matchdate) {
                        const extractedText = matchname[1];
                        const extractedTextDate = matchdate[1];

                        console.log(extractedText);
                        console.log(extractedTextDate);
                        console.log(repoName);

                        
                          
                          // Kullanım örneği:
                          const courseData = {
                            title: extractedText,
                            imageUrl: "https://github.com/kurpeeren/"+repoName+"/blob/main/images/main.png?raw=true",
                            startDate: extractedTextDate
                          };
                          
                          const newCourseItem = createCourseItem(courseData.title, courseData.imageUrl, courseData.startDate,"https://github.com/kurpeeren/"+repoName);

                          const coursesBox = document.querySelector('.ag-courses_box');
                          coursesBox.appendChild(newCourseItem);

                        // İlgili HTML içeriğini hedef elemente yerleştirme
                        const targetElement = document.querySelector('.ag-courses_box');
                        targetElement.innerHTML += courseItemElement.innerHTML;

                        console.log(targetElement.innerHTML);
                    } else {
                        console.log("Belirtilen etiketler arasında metin bulunamadı.");
                    }



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

function createCourseItem(title, imageUrl, startDate ,projecturl) {
    const courseItem = document.createElement('div');
    courseItem.classList.add('ag-courses_item');
  
    const image = document.createElement('img');
    image.classList.add('ag-format-container', 'project-img-component');
    image.src = imageUrl;
    image.alt = '';
  
    const link = document.createElement('a');
    link.href = projecturl;
    link.classList.add('ag-courses-item_link');
  
    const backgroundDiv = document.createElement('div');
    backgroundDiv.classList.add('ag-courses-item_bg');
  
    const titleDiv = document.createElement('div');
    titleDiv.classList.add('ag-courses-item_title');
    titleDiv.textContent = title;
  
    const dateBox = document.createElement('div');
    dateBox.classList.add('ag-courses-item_date-box');
    dateBox.textContent = 'Start: ';
  
    const date = document.createElement('span');
    date.classList.add('ag-courses-item_date');
    date.textContent = startDate;
  
    dateBox.appendChild(date);
    link.appendChild(backgroundDiv);
    link.appendChild(titleDiv);
    link.appendChild(dateBox);
    courseItem.appendChild(image);
    courseItem.appendChild(link);
  
    return courseItem;
  }