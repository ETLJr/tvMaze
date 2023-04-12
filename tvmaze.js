"use strict";

const $showsList = $("#shows-list");
const $episodesArea = $("#episodes-area");
const $searchForm = $("#search-form");


/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

 async function getShowsByTerm($term) {
    // ADD: Remove placeholder & make request to TVMaze search shows API.
  const results = await axios.get(`https://api.tvmaze.com/search/shows?q=${$term}`);
  console.log(results)
  const shows = results.data;
  const showObjects = shows.map((show) => {
     
    return {
      id: show.show.id,
      name: show.show.name,
      summary: show.show.summary,
      image: show.show.image ? show.show.image : {medium:"http://tinyurl.com/missing-tv"},
    }
  });
  return showObjects;
  }
  
  
  /** Given list of shows, create markup for each and to DOM */
  
  function populateShows(shows) {
    $showsList.empty();
  
      for (let show of shows) {
    const $show = $(
        `<div data-show-id="${show.id}" id="${show.id}"  class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img 
              src= "${show.image.medium}"
              alt="${show.name}"
              class="card-img-top">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-dark btn-sm Show-getEpisodes data-show-id="${show.id} btn-for-${show.id}">
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

async function searchForShowAndDisplay($term) {
  const shows = await getShowsByTerm($term);

  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  const $term = $("#search-query").val()
  await searchForShowAndDisplay($term);
});


/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */
 
 async function getEpisodesOfShow(id) {
    const episodesResults = await axios.get(`https://api.tvmaze.com/shows/${id}/episodes`);
    console.log(episodesResults)
    episodes = episodesResults.data
     const episodeObject = episodes.map((episode) => {
        return {
            id: episode.id,
            name: episode.name,    
            season: episode.season,
            number: episode.number,
        }
        })
     return episodeObject
    }
/** Write a clear docstring for this function... */

function populateEpisodes(episodes) { 
    const $episodeList = $("#episodes-list")

    for ( let episode of episodes){
        const $li = $(
         `<li>${episode.name}. Season ${episode.season}, Episode Num.${episode.number}</li>`);
         $episodeList.append($li);
         }
         $("#episode-area").show()
}

$showsList.on("click", async function(e){
const $showID = $(e.target.data("show-id"));
const episodes= await getEpisodesOfShow($showID);
populateEpisodes(episodes)
})