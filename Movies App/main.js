const apiKey=`api_key=da863dd8a3cfea94e902cd5e9f20af61`
const abiBase = `https://api.themoviedb.org/3`
const Api = abiBase+ `/discover/movie?sort_by=popularity.desc&` + apiKey; 
img_url = 'https://image.tmdb.org/t/p/w500';
searchUrl = abiBase + `/search/movie?` + apiKey;
main = document.getElementById('main');
form = document.getElementById('form');
search = document.getElementById('search');
function getMovies(url){
    fetch(url).then(res => res.json()).then(data =>{
        showMovies(data.results);
    })
}

getMovies(Api);

function showMovies(data){
    main.innerHTML= "";
    console.log(data)
    data.forEach(movie => {
    const {title, poster_path, vote_average, overview}= movie;
        main.innerHTML += `
        <div class="movie">
            <img src="${img_url + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
            </div>
        </div>
        `
    })
}


function getColor(average){
    if(average>=8){
        return 'green'
    }else if(average>=5){
        return 'orange'
    }else 
        return 'red'
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    searchItem = search.value;
    if(searchItem){
        getMovies(searchUrl+'&query='+ searchItem)
    }
})