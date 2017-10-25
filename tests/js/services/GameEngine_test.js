describe( 'GameEngine', () => {
  let gameEngine;

  beforeEach( () => {
    gameEngine = new GameEngine();
  });

  describe( 'initialise', () => {
    it( 'sets default field size', () => {
      expect( gameEngine.fieldsX ).toEqual( 10 );
      expect( gameEngine.fieldsY ).toEqual( 10 );
    });
    
    it( 'sets fields as an empty array', () => {
      expect( gameEngine.fields ).toEqual( [] );
    });

    it( 'sets the totalMines to default of 10', () => {
      expect( gameEngine.totalMines ).toEqual( 10 );
    });
  });

  describe( 'get totalFields', () => {
    it( 'returns the total number of fields in the field', () => {
      expect( gameEngine.totalFields ).toEqual( 100 );
    });
  });
  
  describe( 'set mines', () => {
    it( 'sets the given number of mines', () => {
      gameEngine.mines = 100;
      
      expect( gameEngine.totalMines ).toEqual( 100 );
    });
    
    it( 'sets the given number of mines as an integer', () => {
      gameEngine.mines = 20.5;
      
      expect( gameEngine.totalMines ).toEqual( 20 );
    });
  });

  describe( 'get mines', () => {
    it( 'returns the value of totalMines', () => {
      expect( gameEngine.mines ).toEqual( gameEngine.totalMines );
    });
  });
  
  describe( '_pickMineLocations', () => {
    beforeEach( () => {
      gameEngine.setFieldSize( 1, 5 );
    });

    it( 'picks given number of mines', () => {
      gameEngine.mines = 2;
      let result = gameEngine._pickMineLocations();

      expect( result.length ).toEqual( 2 );
    });

    it( 'picks numbers within the field size', () => {
      gameEngine.mines = 5;
      let result = gameEngine._pickMineLocations();

      angular.forEach( result, ( location ) => expect( location >= 0 && location < 5 ).toEqual( true ) );
    });

    it( 'generates unique mine locations', () => {
      gameEngine.mines = 5;
      let result = gameEngine._pickMineLocations();

      angular.forEach( result, ( location ) => {
        let noFound = result.reduce( ( found, loc ) => loc === location ? ++found : found, 0 );

        expect( noFound ).toEqual( 1 );
      });
    });
  });

  describe( '_buildFields', () => {
    beforeEach( () => {
      gameEngine.setFieldSize( 5, 5 );
    });

    it( 'returns an array of Fields', () => {
      let result = gameEngine._buildFields();

      let allFields = result.reduce( ( test, field ) => test && field instanceof Field, true );

      expect( allFields ).toEqual( true );
    });

    it( 'sets given number of fields to be mines', () => {
      let result = gameEngine._buildFields();

      let numberOfMines = result.reduce( ( totalMines, field ) => field.hasMine() ? ++totalMines : totalMines, 0 );

      expect( numberOfMines ).toEqual( gameEngine.totalMines );
    });

    it( 'gives each field a unique id', () => {
      let usedIds = [];
      let result = gameEngine._buildFields();

      let allUnique = result.reduce( ( unique, field ) => {
        unique = unique && usedIds.indexOf(field.id) === -1;

        usedIds.push( field.id );

        return unique;
      }, true );

      expect( allUnique ).toEqual( true );
    });
  });
});