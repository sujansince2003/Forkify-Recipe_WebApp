class searchView {
  _parentelement = document.querySelector('.search');
  getQuery() {
    const query = this._parentelement
      .querySelector('.search__field')
      .value.toLowerCase();
    this._clearview();
    return query;
  }
  _clearview() {
    this._parentelement.querySelector('.search__field').value = '';
  }
  addHandlersearch(handler) {
    this._parentelement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}

export default new searchView();
