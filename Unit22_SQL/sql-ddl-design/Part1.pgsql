-- Part One: Medical Center
-- Design the schema for a medical center.

-- A medical center employs several doctors (CREATE TABLE doctors (ID SERIAL PRIMARY KEY, FirstName text, LastName text);)
-- A doctors can see many patients (CREATE TABLE patients (ID SERIAL PRIMARY KEY, FirstName text LastName text); doctors to patients one-to-many relationship)
-- A patient can be seen by many doctors (CREATE TABLE visits (ID SERIAL PRIMARY KEY, Patient_ID Integer REFERENCES patients, Doctor_ID Integer REFERENCES doctors, Diagnosis_ID Integer REFERENCES diagnosis); a patient can be linked to multiple doctors)
-- During a visit, a patient may be diagnosed to have one or more diseases. (CREATE TABLE diagnosis (ID SERIAL PRIMARY KEY, Name text, Description text); patient linked to visit)

CREATE TABLE Doctors (ID SERIAL PRIMARY KEY, FirstName TEXT, LastName TEXT);
CREATE TABLE Patients (ID SERIAL PRIMARY KEY, FirstName TEXT, LastName TEXT);
CREATE TABLE Diagnosis (ID SERIAL PRIMARY KEY, Name TEXT, Description TEXT);
CREATE TABLE Visits (ID SERIAL PRIMARY KEY, Patient_ID INTEGER REFERENCES Patients(ID) ON DELETE SET NULL, Doctor_ID INTEGER REFERENCES Doctors(ID) ON DELETE SET NULL, Diagnosis_ID INTEGER REFERENCES Diagnosis(ID));

-- Part Two: Craigslist
-- Design a schema for Craigslist! Your schema should keep track of the following

-- The region of the craigslist post (San Francisco, Atlanta, Seattle, etc) (CREATE TABLE region (ID SERIAL PRIMARY KEY, Location text))
-- Users and preferred region (CREATE TABLE users (ID SERIAL PRIMARY KEY, preferred_region_id Integer REFERENCES region, username Text, password Text))
-- Posts: contains title, text, the user who has posted, the location of the posting, the region of the posting
-- Categories that each post belongs to

CREATE TABLE Region (ID SERIAL PRIMARY KEY, Location TEXT);
CREATE TABLE Categories (ID SERIAL PRIMARY KEY, Category TEXT);
CREATE TABLE Users (ID SERIAL PRIMARY KEY, Preferred_Region_ID REFERENCES Region(ID), Username TEXT, Password TEXT);
CREATE TABLE Posts (ID SERIAL PRIMARY KEY, PostDate DATE, Post_Location DATE, Title TEXT, Text TEXT, User_ID INTEGER REFERENCES Users(ID) ON DELETE SET NULL, Region_ID INTEGER REFERENCES Region(ID) ON DELETE SET NULL, Category_ID INTEGER REFERENCES Categories(ID) ON DELETE SET NULL);

-- Part Three: Soccer League
-- Design a schema for a simple sports league. Your schema should keep track of

-- All of the teams in the league
-- All of the goals scored by every player for each game
-- All of the players in the league and their corresponding teams
-- All of the referees who have been part of each game
-- All of the matches played between teams
-- All of the start and end dates for season that a league has
-- The standings/rankings of each team in the league (This doesn’t have to be its own table if the data can be captured somehow).

CREATE TABLE Season_Dates (ID SERIAL PRIMARY KEY, Season Year INTEGER, Start_Date DATE, End_Date DATE);
CREATE TABLE Teams (ID SERIAL PRIMARY KEY, Name TEXT, Rank INTEGER);
CREATE TABLE Game (ID SERIAL PRIMARY KEY, Team1_ID REFERENCES Teams(ID), Team2_ID REFERENCES Teams(ID)));
CREATE TABLE Players (ID SERIAL PRIMARY KEY, Team_ID INTEGER REFERENCES Teams(ID));
CREATE TABLE Goals (ID SERIAL PRIMARY KEY, Player_ID INTEGER REFERENCES Players(ID), Game_ID INTEGER REFERENCES Game(ID));
CREATE TABLE Referrees (ID SERIAL PRIMARY KEY, Name TEXT, Game_ID REFERNECES Game(ID));