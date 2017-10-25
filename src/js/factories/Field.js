class Field {

  constructor( id, hasMine ){
    this.id = id;
    this.mine = !!hasMine;
  }

  hasMine() {
    return this.mine;
  }
}