describe( 'Field', () => {
  let field;

  beforeEach( () => {
    field = new Field( 1 );
  });


  describe( 'initialise', () => {
    it( 'sets mine to false', () => {
      expect( field.mine ).toEqual( false );
    });

    it( 'sets mine to true', () => {
      field = new Field( 1, true );

      expect( field.mine ).toEqual( true );
    });
    
    it( 'sets the given id of the field', () => {
      expect( field.id ).toEqual( 1 );
    });
  });

});