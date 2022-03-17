-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS butterflies;
-- DROP TABLE IF EXISTS cats;
-- DROP TABLE IF EXISTS chickens;
-- DROP TABLE IF EXISTS rocks;
-- DROP TABLE IF EXISTS flowers;

--  CREATE TABLE cats (
--      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--      name TEXT NOT NULL,
--      age INT NOT NULL CHECK (age > 0),
--      favorite_toy TEXT
--  )

 CREATE TABLE butterflies (
     id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
     name TEXT NOT NULL,
     type TEXT NOT NULL
 );

--  CREATE TABLE chickens (
--      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--      name TEXT NOT NULL,
--      color TEXT NOT NULL
--  )

--  CREATE TABLE rocks (
--      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--      name TEXT NOT NULL,
--      type TEXT NOT NULL
--  )

--  CREATE TABLE flowers (
--      id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--      name TEXT NOT NULL,
--      type TEXT NOT NULL
--  )

--  INSERT INTO 
--     cats (name, age, favorite_toy)
--  VALUES
--     ('steven', 2, 'ball of yarn')
--     ('calico', 7, 'human feet')

 INSERT INTO 
    butterflies (name, type)
 VALUES
    ('tiger swallowtail', 'papilio glaucus'),
    ('monarch', 'danaus plexippus');

--  INSERT INTO 
--     chickens (name, color)
--  VALUES
--     ('silkie', 'white')
--     ('ameraucana', 'black-speckled')

--  INSERT INTO 
--     rocks (name, type)
--  VALUES
--     ('limestone', 'sedimentary')
--     ('gniess', 'granite')

--  INSERT INTO 
--     flowers (name, type)
--  VALUES
--     ('calla lily', 'araceae')
--     ('sunflower', 'heliantheae')