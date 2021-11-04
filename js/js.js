/*
let fixeddiv=document.querySelectorAll(".header");
window.addEventListener("scroll",()=>{
    window.scrollY > 100 ? fixeddiv.classList.add('active') : fixeddiv.classList.remove('active');
})








*/
let exploreBtn = document.querySelector('.title .btn'),
    HadithSection = document.querySelector('.hadith');
exploreBtn.addEventListener('click',()=>{
    HadithSection.scrollIntoView({
        behavior : "smooth"
    })
})

let hadithcontainer=document.querySelector('.hadithcontainer'),
next=document.querySelector('.buton .next'),
prev=document.querySelector('.buton .prev'),
number=document.querySelector('.buton .number');
let hadithIndex=0;
hadithchanger();
function hadithchanger()
{
    fetch("https://api.hadith.sutanlab.id/books/muslim?range=1-300")
    .then(response => response.json())
    .then(data =>{
        let Hadiths = data.data.hadiths;
        changehadith();

        next.addEventListener('click',()=>{
            hadithIndex ==299 ? hadithIndex =0 : hadithIndex++; 
            changehadith();

        })

        prev.addEventListener('click',()=>{
            hadithIndex ==0 ? hadithIndex =299 : hadithIndex--; 
            changehadith();

        })


        function changehadith ()
        {
            hadithcontainer.innerText =Hadiths[hadithIndex].arab;
            number.innerText=`300  -   ${hadithIndex+1}`
    
        }


    }
        )
}

let sections=document.querySelectorAll("section"),
links=document.querySelectorAll(".header ul li");
links.forEach(link => {  
link.addEventListener('click',()=>{
    document.querySelector('.header ul li.active').classList.remove('active');
    link.classList.add('active');
    let target = link.dataset.filter;
    sections.forEach(section=>{
        if(section.classList.contains(target))
        {
            section.scrollIntoView({
                behavior :"smooth"
            })
        }
    })

})
})

//Surah Api
let SurahsContainer= document.querySelector('.surahcontainer');
getSurahs()
function getSurahs()
{
    //fetch Surahs meta data {Name of SuraHS}
    fetch("http://api.alquran.cloud/v1/meta")
    .then(response => response.json())
    .then(data=>{
        let surahs = data.data.surahs.references;
        let numberOfSurahs = 114;
        SurahsContainer.innerHTML+= "";

        for (let i = 0; i < numberOfSurahs ; i++) {
            
            SurahsContainer.innerHTML += 
                `
                    <div class="surah">
                        <p>${surahs[i].name}</p>
                        <p>${surahs[i].englishName}</p>
                    </div>
                `
        }


        let SurahsTitels = document.querySelectorAll('.surah');
        let popup = document.querySelector('.surah-popup'),
            AyatContainer = document.querySelector('.ayat');
        SurahsTitels.forEach((title,index)=>{
            title.addEventListener('click',()=>{
                fetch(`http://api.alquran.cloud/v1/surah/${index + 1}`)
                .then(response => response.json())
                .then(data=>{
                    AyatContainer.innerHTML = "";
                    let Ayat = data.data.ayahs;
                    Ayat.forEach(aya=>{
                        popup.classList.add('active');
                        AyatContainer.innerHTML += `
                            <p>(${aya.numberInSurah}) - ${aya.text}</p>
                        `

                    })
                })
            })
        })
    })
}

let closed=document.querySelector(".closed");
closed.onclick = () =>{
    document.querySelector('.surah-popup').classList.remove("active")
}