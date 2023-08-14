# Forkify - A Recipe Finding Web app
#### Date of completion: 13 Aug 2023
<div id="top"></div>

![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![Sass](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![JS](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
![Babel](https://img.shields.io/badge/Babel-F9DC3e?style=for-the-badge&logo=babel&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://forkify-suzancodes.netlify.app/">
    <img src="./src/img/favicon.png" alt="Logo" height="80"  >
  </a>
  <h1 align="center">Forkify</h1>

  <p align="center">
    <a href="https://modern-forkify.vercel.app/">View Demo</a>
    ·

  </p>
</div>



## Description
This was the final project as part of a Udemy course - [The Complete JavaScript Course 2023](https://www.udemy.com/course/the-complete-javascript-course/).
Forkify is a recipe finding web application which uses data from the [Forkify](https://forkify-api.herokuapp.com/v2) API. While it is a fairly basic web application, it can be used as a guide to cook one's favorite dish. Beyond accessing recipes from different sources online, it also provides information on the number and amount of ingredients needed to build a specific dish according to the number of people to serve.




### Features

| User Stories                                                               | Features                                                                                                                                                                              |
| -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Search for recipes                                                         | <ul><li>functionality: input field to send request to API with searched keywords<li>Display results with pagination<li>Display recipe with cooking time, serving and ingredients</ul> |
| Update the number of servings                                              | <ul><li>Change serving functionality: update all ingredients according ro current number of servings</ul>                                                                             |
| Bookmark recipes                                                           | <ul><li>Bookmarking functionality: display list of all bookmarked recipes</ul>                                                                                                        |
| Create recipes                                                             | <ul><li>Users can upload their own recipes</li><li>User recipes will automatically be bookmarked<li>User can only see their own recipes, not recipes from other users</ul>            |
| Access to bookmarks and recipes when leaving the app and coming back later | <ul><li>Store bookmark data in the browser using "local storage"</ul>                                                                                                                 |

<p align="right">(<a href="#top">back to top</a>)</p>

## Features in points
- Based on MVC Architecture
- User can search over 1,000,000 recipes.
- Pagination feature
- Powered by the Forkify API V2.
- Displays the ingredients required to prepare a dish.
- Allows user to choose serving size and accordingly adjusts ingredients.
- Displays recipe images.
- Directs user to source site for detailed recipe procedure.
- Recipes can be bookmarked/unbookmarked
- User can add their own recipe



  ### Built With

- HTML
- CSS
- SASS
- JavaScript
- Parcel
- Babel
- Forkify API
- Libraries
  - fractional

---
### Flowchart

<img src='forkify-flowchart-part-1.png' alt='flowchart' >
<img src='forkify-flowchart-part-2.png' alt='flowchart' >
<img src='forkify-flowchart-part-3.png' alt='flowchart' >

### Architecture

<img src='./src/img/forkify-architecture-recipe-loading.png' alt='architecture' >

<p align="right">(<a href="#top">back to top</a>)</p>

---

## Installation
Run the following commands in your command line:
```bash
git clone https://github.com/sujansince2003/Forkify-Recipe_WebApp.git

npm install

npm run start
```

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b newFeature`)
3. Commit your Changes (`git commit -m 'Added new Feature'`)
4. Push to the Branch (`git push origin newFeature`)
5. Open a Pull Request


  

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

- [Jonas schmedtmann](https://github.com/jonasschmedtmann)
