import * as model from './model.js';
import { MODAL_CLOSE } from './config.js';
import recipeView from './view/recipeView.js';
import searchView from './view/searchView.js';
import bookmarkView from './view/bookmarkView.js';
import resultView from './view/resultView.js';
import paginationView from './view/paginationView.js';
import addRecipeView from './view/addRecipeView.js';

//use url for files which are non code file
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept;
// }
const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
//defining funtion to render spinner

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);
    if (!id) return;

    recipeView.renderSpinner(); //adding spinner
    // update results view to mark selected search results
    resultView.update(model.getSearchResultsPage());
    //updating bookmark view

    bookmarkView.update(model.state.bookmark);

    //1.  loading recipe
    await model.loadRecipe(id);
    // const { recipe } = model.state;

    //2. rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    // alert(`Error occured ::Controller js ${error}`);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();
    // console.log(resultView);
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchResults(query); //it doesnt give any data it only manipulate state.search

    // resultView.render(model.state.search.results);
    resultView.render(model.getSearchResultsPage(1));

    //render the pagination

    paginationView.render(model.state.search);
  } catch (error) {
    console.log(error);
  }
};

// showRecipe();

// window.addEventListener('hashchange', showRecipe);
// window.addEventListener('load', showRecipe);
//we need to load recepie also when there is no hash change so we call showrecipe event for both load and hashchage.we can call it same time using array of events
// ['hashchange', 'load'].forEach(ev =>
//   window.addEventListener(ev, controlRecipes)
// ); commenting bcz it got other method and shifting this to recipeview.js

const controlPagination = function (goToPage) {
  // console.log('value is ', goToPage);
  // console.log('control pagination is called');
  resultView.render(model.getSearchResultsPage(goToPage));

  //render the pagination

  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //update the recipe serving in state
  model.updateServings(newServings);
  //update the view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlBookmark = function () {
  //1 add n remove bookmarks
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.delBookmark(model.state.recipe.id);
  }
  //2 update recipe views
  recipeView.update(model.state.recipe);
  //3 render bookmarks
  bookmarkView.render(model.state.bookmark);
};
const controlBookmarkLS = function () {
  bookmarkView.render(model.state.bookmark);
};
const controlAddRecipe = async function (newRecipe) {
  // console.log(newRecipe);
  try {
    //show loading spinner
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);

    //render recipe
    recipeView.render(model.state.recipe);

    //success message
    addRecipeView.renderSuccessMessage();

    //render bookmark
    bookmarkView.render(model.state.bookmark);

    //change id in the url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    //close modal window
    setTimeout(function () {
      addRecipeView.toggleclass();
    }, MODAL_CLOSE * 1000);
  } catch (err) {
    console.log(err.message);
    addRecipeView.renderError(err.message);
  }
};
const init = function () {
  bookmarkView.addHandlerRender(controlBookmarkLS);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerBookmark(controlBookmark);

  searchView.addHandlersearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addhandlerUpload(controlAddRecipe);
};

init();

// model.loadSearchResults();
// controlSearchResults();
