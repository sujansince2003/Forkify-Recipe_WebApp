import view from './view';
import preview from './preview';
import icons from 'url:../../img/icons.svg';
class resultView extends view {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'Recipe not found🙁 Try searching another one';
  _successMessage = 'Found it xD';

  _generateMarkup() {
    // console.log(this._data);
    return this._data.map(result => preview.render(result, false)).join('');
  }
}
export default new resultView();
