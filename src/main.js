const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    },
});

//Utils
function createMovies(movies, container) {
    container.innerHTML = '';


    movies.forEach(movie => {
        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie-container');
        movieContainer.addEventListener('click', () => {
            location.hash = '#movie=' + movie.id;
        });
        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path, );
        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
    });

}

function createCategories(categories, container) {
    container.innerHTML = "";

    categories.forEach(category => {
        const categoryContainer = document.createElement('div')
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3');
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id' + category.id);
        categoryTitle.addEventListener('click', () => {
            location.hash = `#category=${category.id}-${category.name}`;
        });
        const categoryTitleText = document.createTextNode(category.name);

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        container.appendChild(categoryContainer);
    });
}

//calls to API
async function getTrendingMoviesPreview(){
    const { data } = await api('trending/movie/day');
    const movies = data.results;
    createMovies(movies, trendingMoviesPreviewList);
}

async function getActionMoviesPreview() {
    const { data } = await api('discover/movie', {
        params: {
            with_genres: '28', 
        }
    });
    const actionMovies = data.results;
    createMovies(actionMovies, actionMoviesPreviewList);
  }

async function getAdventureMoviesPreview() {
    const { data } = await api('discover/movie', {
        params: {
            with_genres: '12', 
        }
    });
    const adventureMovies = data.results;
    createMovies(adventureMovies, adventureMoviesPreviewList);
  }

async function getAnimationMoviesPreview() {
    const { data } = await api('discover/movie', {
        params: {
            with_genres: '16', 
        }
    });
    const animationMovies = data.results;
    createMovies(animationMovies, animationMoviesPreviewList);
  }

async function getComedyMoviesPreview() {
    const { data } = await api('discover/movie', {
        params: {
            with_genres: '35', 
        }
    });
    const comedyMovies = data.results;
    createMovies(comedyMovies, comedyMoviesPreviewList);
  }

async function getCrimeMoviesPreview() {
    const { data } = await api('discover/movie', {
        params: {
            with_genres: '80', 
        }
    });
    const crimeMovies = data.results;
    createMovies(crimeMovies, crimeMoviesPreviewList);
  }
  
async function getDramaMoviesPreview() {
    const { data } = await api('discover/movie', {
        params: {
            with_genres: '99', 
        }
    });
    const dramaMovies = data.results;
    createMovies(dramaMovies, dramaMoviesPreviewList);
  }
  
async function getFamilyMoviesPreview() {
    const { data } = await api('discover/movie', {
        params: {
            with_genres: '18', 
        }
    });
    const familyMovies = data.results;
    createMovies(familyMovies, familyMoviesPreviewList);
  }

  async function getHistoryMoviesPreview() {
    const { data } = await api('discover/movie', {
        params: {
            with_genres: '10751', 
        }
    });
    const historyMovies = data.results;
    createMovies(historyMovies, historyMoviesPreviewList);
  }

async function getCategoriesPreview(){
    const { data } = await api('genre/movie/list');
    const categories = data.genres;
    createCategories(categories, categoriesPreviewList);
    
}

async function getMoviesByCategory(id){
    const { data } = await api('discover/movie', {
        params: {
            with_genres: id,
        }
    });
    const movies = data.results;
    createMovies(movies, genericSection);
}
async function getMoviesBySearch(query){
    const { data } = await api('search/movie', {
        params: {
            query,
        }
    });
    const movies = data.results;
    createMovies(movies, genericSection);

}

async function getTrendingMovies(){
    const { data } = await api('trending/movie/day');
    const movies = data.results;
    createMovies(movies, genericSection); 
}

async function getMovieById(id){
    const { data: movie } = await api('movie/' + id);
    const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path;
    console.log(movieImgUrl)
    headerSection.style.background = `
    linear-gradient(180deg, rgba(0, 0, 0, 0.79) 100%, rgba(0, 0, 0, 0) 29.17%),
    url(${movieImgUrl})`;
    movieDetailTitle.textContent = movie.title;
    movieDetailReleaseDate.textContent = movie.release_date;
    movieDetailDescription.textContent = movie.overview;
    movieDetailScore.textContent = movie.vote_average;
    createCategories(movie.genres, movieDetailCategoriesList);
    getRelatedMoviesId(id);
}

async function getRelatedMoviesId(id) {
    const { data } = await api(`movie/${id}/recommendations`);
    const relatedMovies = data.results;
    createMovies(relatedMovies, relatedMoviesContainer);
}