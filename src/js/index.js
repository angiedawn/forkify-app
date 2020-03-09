import Search from "./models/Search";
import * as searchView from "./views/searchView";
import { elements } from "./views/base";
import axios from "axios";

async function getResults(query) {
  try {
    const res = await axios(
      `https://forkify-api.herokuapp.com/api/search?&q=${query}`
    );
    const recipes = res.data.recipes;
    console.log(recipes);
  } catch (error) {
    alert(error);
  }
}

/*Global state of the app
 *-Search Object
 *-Current Recipe Object
 *-Shopping List Object
 *-Liked Recipes */

const state = {};

const controlSearch = async () => {
  // 1) Get query from view
  const query = searchView.getInput();

  if (query) {
    // 2) New search object and add to state
    state.search = new Search(query);

    // 3) Prepare UI for results
    searchView.clearInput();

    // 4) Search for recipes
    await state.search.getResults();

    // 5) Render results on UI
    searchView.renderResults(state.serch.result);
  }
};
getResults("pasta");

//https://forkify-api.herokuapp.com/api/search
//https://forkify-api.herokuapp.com/api/search?q=pizza

elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  controlSearch();
});
