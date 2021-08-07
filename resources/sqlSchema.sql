create TABLE weatherhist(
	EventId PRIMARY KEY NOT NULL,
	Type varchar NOT NULL,
	Severity varchar NOT NULL, 
	StartTime date NOT NULL, 
	EndTime date NOT NULL, 
	TimeZone varchar NOT NULL,
	LocationLat decimal  NOT NULL, 
	LocationLng decimal NOT NULL, 
	City varchar NOT NULL, 
	State varchar NOT NULL,
	Duration decimal NOT NULL
);