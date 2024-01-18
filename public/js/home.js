const main = document.querySelector(".main");

fetch(genre_list_http + new URLSearchParams({
    api_key: api_key
}))
    .then(res => res.json())
    .then(data => {
        data.genres.forEach(genre => {
            fetchMovieListByGenres(genre.id, genre.name);
        });
    });

const fetchMovieListByGenres = (genre_id, genre_name) => {
    fetch(movies_by_genres_http + new URLSearchParams({
        api_key: api_key,
        with_genres: genre_id
    }))
        .then(res => res.json())
        .then(data => {
            makeCategoryElement(`${genre_name}_movies`, data.results);
        })
        .catch(err => console.log(err));
}

const makeCategoryElement = (category, data) => {
    main.innerHTML += `
    <div class="movie-list">
        <button class="pre-btn">
            <img src="img/pre.png" alt="">
        </button>

        <h1 class="movie-category">${category.split("_").join(" ")}</h1>

        <div class="movie-container" id="${category}"></div>

        <button class="nxt-btn">
            <img src="img/nxt.png" alt="">
        </button>
    </div>
    `;

    makeCards(category, data);
}

const makeCards = (category_id, data) => {
    const movieContainer = document.getElementById(category_id);

    data.forEach((movie, id) => {
        if (movie.backdrop_path == null) {
            movie.backdrop_path = movie.poster_path;
            if (movie.backdrop_path == null) {
                return;
            }
        }

        movieContainer.innerHTML += `
        <div class="movie">
            <img src="${img_url + movie.backdrop_path}" alt="${movie.original_title}">
            <p class="movie-title">${movie.original_title}</p>
        </div>
        `;
    });
}