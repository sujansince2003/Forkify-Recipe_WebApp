'use strict';
import { async, aysnc } from 'regenerator-runtime';
import { API_URL } from './config.js';
// import { getJSON, sendJSON } from './helpers.js';
import { AJAX } from './helpers.js';

import { SER_RES_PerPage, APIkey } from './config.js';
// import { SEARCH_API } from './config.js';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultPerPage: SER_RES_PerPage,
  },
  bookmark: [],
};
const createRecipeObject = function (data) {
  const { recipe } = data.data; //destructing
  return {
    //redefining the objects
    id: recipe.id,
    title: recipe.title,
    ingredients: recipe.ingredients,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    publisher: recipe.publisher,
    ...(recipe.key && { key: recipe.key }),
  };
};
export const loadRecipe = async function (id) {
  //loading recipe
  try {
    const data = await AJAX(`${API_URL}${id}?key=${APIkey}`);
    state.recipe = createRecipeObject(data);

    if (state.bookmark.some(book => book.id === id)) {
      state.recipe.bookmarked = true;
    } else {
      state.recipe.bookmarked = false;
    }
    // console.log(state.recipe);
  } catch (err) {
    // console.log(`ERROR OCCURED FROM MODEL.JS ::${err}`);
    throw err;
  }
};

//using state.recipe so that we can update data inside state object

//implementing search functionality
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const searchdata = await AJAX(`${API_URL}?search=${query}&key=${APIkey}`);

    // console.log(searchdata);
    // console.log(searchdata.data);
    state.search.results = searchdata.data.recipes.map(rec => {
      return {
        id: rec.id,
        title: rec.title,
        publisher: rec.publisher,
        image: rec.image_url,
        ...(rec.key && { key: rec.key }),
      };
    });
    state.search.page = 1;
    // console.log(state.search.results);
  } catch (err) {
    throw err;
  }
};

export const getSearchResultsPage = function (page = state.search.page) {
  state.search.page = page;
  let start = (page - 1) * state.search.resultPerPage;
  let end = page * state.search.resultPerPage; //page=1 xa vaney 1*10=10 but slice doesnot inlcude last exact value 10 xa vaney 9 samma linxa
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
  //   console.log(state.recipe.ingredients);
};
const persistBookmark = function () {
  localStorage.setItem('bookmark', JSON.stringify(state.bookmark));
};

//bookmarking functionality starts
//the below function will receive a recipe to bookmark
export const addBookmark = function (recipe) {
  //addinf recipe to bookmark array
  state.bookmark.push(recipe);
  //recipe which is bookmarked should be marked
  if (recipe.id === state.recipe.id) {
    state.recipe.bookmarked = true;
  }
  persistBookmark();
};

export const delBookmark = function (id) {
  const index = state.bookmark.findIndex(el => el.id == id);
  state.bookmark.splice(index, 1);

  if (id === state.recipe.id) {
    state.recipe.bookmarked = false;
  }
  persistBookmark();
};

const init = function () {
  const storage = localStorage.getItem('bookmark');
  //   console.log(storage);
  if (storage) {
    state.bookmark = JSON.parse(storage);
  }
};
init();

const clearBookmarks = function () {
  localStorage.clear('bookmark');
};
//call this function without or before init()

//calling apikey to show added recipe
export const uploadRecipe = async function (newRecipe) {
  //   console.log(newRecipe);
  //   console.log(Object.entries(newRecipe));
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());
        if (ingArr.length !== 3) {
          throw new Error('Wrong Ingredient Format ! follow the format please');
        }
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
        console.log(ingredients);
      });
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    // console.log(recipe);
    const data = await AJAX(`${API_URL}?key=${APIkey}`, recipe);

    state.recipe = createRecipeObject(data);
    console.log(state.recipe);
    addBookmark(state.recipe);
  } catch (err) {
    throw err;
  }
  //now it is ready to be uploaded now creating object format in which it accept
};
