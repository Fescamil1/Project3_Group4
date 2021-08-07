--Create Database 
--CREATE DATABASE weathermap
--    WITH 
--    OWNER = postgres
--    ENCODING = 'UTF8'
--    CONNECTION LIMIT = -1;


-- Create table for Project3 Weather Events
-- Before creating any tables, drop the tables if the already exsists
Drop TABLE weatherhist;

--create table for the data
CREATE TABLE weatherhist(
	EventId varchar PRIMARY KEY NOT NULL,
	Type varchar NOT NULL,
	Severity varchar NOT NULL, 
	StartTime date NOT NULL, 
	EndTime date NOT NULL, 
	TimeZone varchar NOT NULL,
	Lat decimal  NOT NULL, 
	Lng decimal NOT NULL, 
	City varchar NOT NULL, 
	State varchar NOT NULL,
	Duration decimal NOT NULL
);