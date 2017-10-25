class GameEngine {

  constructor() {
    this.setFieldSize( 10, 10 );
    this.totalMines = 10;

    this.fields = [];
  }

  /**
   * @return {int}
   */
  get totalFields() {
    return this.fieldsY * this.fieldsX;
  }

  /**
   * @return {int}
   */
  get mines() {
    return this.totalMines;
  }

  /**
   * @param {int} mines
   */
  set mines( mines ){
    this.totalMines = parseInt( mines );
  }

  /**
   * @param {int} x
   * @param {int} y
   */
  setFieldSize( x, y ){
    this.fieldsX = x;
    this.fieldsY = y;
  }

  getAdjacentFields( id ){
    let adjacentFields = {};
    adjacentFields.n =  id < this.fieldsX ? undefined : id - this.fieldsX;
    adjacentFields.e =  id % (this.fieldsX -1) ? undefined : id + 1;
    adjacentFields.s =  id >= (this.totalMines - this.fieldsX) ? undefined : id + this.fieldsX; // if ids start from 1?
    adjacentFields.w =  undefined;

    adjacentFields.ne = undefined;
    adjacentFields.sw = undefined;
    adjacentFields.se = undefined;
    adjacentFields.nw = undefined;
  }

  _buildFields() {
    this.fields = [];
    const mineLocations = this._pickMineLocations();

    while( this.fields.length < this.totalFields ){
      const fieldLocation = this.fields.length;
      const hasMine = mineLocations.indexOf( fieldLocation ) !== -1;

      this.fields.push( new Field( fieldLocation, hasMine ) );
    }

    return this.fields;
  }

  /**
   * @return {Array}
   * @private
   */
  _pickMineLocations() {
    let values = [], i = this.totalFields;

    while( i >= 1 ){
      values.push( i-- );
    }

    let locations = [];
    let maxIndex = this.totalFields;

    for( i = 1; i <= this.mines; i++ ) {
      maxIndex--;

      let index = Math.floor( maxIndex * Math.random() );
      locations.push( values[ index ] );
      values[ index ] = values[ maxIndex ];
    }

    return locations.map( ( location ) => location - 1);
  }
}