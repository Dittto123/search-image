const accessKey = '6yoIB2zAZDj5OEXy5u1PZGNvI6bvTbq85JPz1bQLTJo'
const formElement = document.querySelector('form')
const inputEl = document.getElementById('search-input')
const searchResult = document.querySelector('.search-results')
const showMore = document.getElementById('show-more-button')

let inputData = ""
let page = 1

async function searchImages(){
    inputData = inputEl.value
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url)
    const data = await response.json()
    const results = data.results

    if(page === 1){
        searchResult.value = " ";
    }

    results.map((result) => {
        searchResult.value = ""
        const imageWrapper = document.createElement('div')
        imageWrapper.classList.add('search-result')
        const image = document.createElement('img')
        image.src = result.urls.small
        image.alt = result.alt_description
        const imageLink = document.createElement("a")
        image.href = result.html
        imageLink.target = "_blank"
        imageLink.textContent = result.alt_description
        

        imageWrapper.appendChild(image)
        imageWrapper.appendChild(imageLink)
        searchResult.appendChild(imageWrapper)
    })

    page++
    if(page > 1){
        showMore.style.display = 'block'
    }

}

formElement.addEventListener('submit', (event) => {
    event.preventDefault()
    page = 1
    searchImages()
})
showMore.addEventListener('click', () =>{
    searchImages()
})