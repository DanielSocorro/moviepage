searchFormBtn.addEventListener('click', ()=> {
    location.hash = '#search=' + searchFormInput.value;
})
trendingBtn.addEventListener('click', ()=> {
    location.hash = '#trends';
})
arrowBtn.addEventListener('click', ()=> {
    if(document.domain !== 'localhost'){
        location.hash = '#home';
    } else {
        history.back();
    }
})

window.addEventListener('DOMContentLoaded', navigator, false);
window.addEventListener('hashchange', navigator, false);

function navigator() {
    console.log({ location });

    if (location.hash.startsWith('#trends')) {
        trendsPage();
    } else if (location.hash.startsWith('#search=')){
        searchPage();
    } else if (location.hash.startsWith('#movie=')){
        movieDetailsPage();
    } else if (location.hash.startsWith('#category=')){
        categoriesPage();
    } else {
        homePage();
    }

    window.scrollTo(0, 0);
    
}

function homePage() {

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.add('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.remove('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');
    actionPreviewSection.classList.remove('inactive');
    adventurePreviewSection.classList.remove('inactive');
    animationPreviewSection.classList.remove('inactive');
    comedyPreviewSection.classList.remove('inactive');
    crimePreviewSection.classList.remove('inactive');
    dramaPreviewSection.classList.remove('inactive');
    familyPreviewSection.classList.remove('inactive');
    historyPreviewSection.classList.remove('inactive');
    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    getTrendingMoviesPreview();
    getActionMoviesPreview();
    getAdventureMoviesPreview();
    getAnimationMoviesPreview();
    getComedyMoviesPreview();
    getCrimeMoviesPreview();
    getDramaMoviesPreview();
    getFamilyMoviesPreview();
    getHistoryMoviesPreview();
    getCategoriesPreview();
}

function categoriesPage() {
    console.log('Categories!!')

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');
    trendingPreviewSection.classList.add('inactive');
    actionPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    
    // ['#category', 'id-name']
   const [_, categoryData] = location.hash.split('=');
   const [categoryId, categoryName] = categoryData.split('-');

   headerCategoryTitle.innerHTML = categoryName;

    getMoviesByCategory(categoryId);
}
function movieDetailsPage() {
    console.log('Movie!!')
  
    headerSection.classList.add('header-container--long');
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.add('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.add('inactive');
    trendingPreviewSection.classList.add('inactive');
    actionPreviewSection.classList.add('inactive');
    adventurePreviewSection.classList.add('inactive');
    animationPreviewSection.classList.add('inactive');
    comedyPreviewSection.classList.add('inactive');
    crimePreviewSection.classList.add('inactive');
    dramaPreviewSection.classList.add('inactive');
    familyPreviewSection.classList.add('inactive');
    historyPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');

 
   const [_, movieId] = location.hash.split('=');
   getMovieById(movieId);
}
function searchPage() {
    console.log('Search!!')

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.add('inactive');
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    actionPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');

 
   const [_, query] = location.hash.split('=');
   getMoviesBySearch(query);
}

function trendsPage() {
    
    console.log('TRENDS!!')

    headerSection.classList.remove('header-container--long');
    headerSection.style.background = '';
    arrowBtn.classList.remove('inactive');
    arrowBtn.classList.remove('header-arrow--white');
    headerTitle.classList.add('inactive');
    headerCategoryTitle.classList.remove('inactive');
    searchForm.classList.add('inactive');
    trendingPreviewSection.classList.add('inactive');
    actionPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive');
    movieDetailSection.classList.add('inactive');
    
    headerCategoryTitle.innerHTML = 'Trending';

    getTrendingMovies();
}