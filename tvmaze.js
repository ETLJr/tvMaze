"use strict";

const $showsList = $("#shows-list");
const $episodesArea = $("#episodes-area");
const $searchForm = $("#search-form");
const $term = $("#search-form").val()


/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm() {
  // ADD: Remove placeholder & make request to TVMaze search shows API.
const shows = await axios.get("https://api.tvmaze.com/search/shows?q=:query",{params:{$term}})
console.log(shows)
return {
    id: shows.data.show.id,
    name: shows.data.show.name,
    summary: shows.data.show.summary,
    image: shows.data.show.image.medium ? shows.data.show.image.medium : 'http://tinyurl.com/missing-tv',
}
  
}


/** Given list of shows, create markup for each and to DOM */

function populateShows(shows) {
  $showsList.empty();

  for (let show of shows) {
    const $show = $(
        `<div data-show-id="${shows.data.show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img 
              src= "${shows.data.show.image.medium}"
              alt="${shows.data.show.name}"
              class="w-25 mr-3">
           <div class="media-body">
             <h5 class="text-primary">${shows.data.show.name}</h5>
             <div><small>${shows.data.show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>  
       </div>
      `);

    $showsList.append($show);  }
}


/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const term = $("#searchForm-term").val();
  const shows = await getShowsByTerm(term);

  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

// async function getEpisodesOfShow(id) { }

/** Write a clear docstring for this function... */

// function populateEpisodes(episodes) { }
