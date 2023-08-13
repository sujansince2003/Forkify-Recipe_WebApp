import view from './view';
import icons from 'url:../../img/icons.svg';
import preview from './preview';
class bookmarkView extends view {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No Bookmarks';
  _successMessage = '';
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    // console.log(this._data);
    return this._data.map(bookmark => preview.render(bookmark, false)).join('');
  }
}
export default new bookmarkView();
