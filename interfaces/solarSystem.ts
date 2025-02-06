export enum Planets {
	MERCURY = 'Mercury',
	VENUS = 'Venus',
	EARTH = 'Earth',
	MARS = 'Mars',
	JUPITER = 'Jupiter',
	SATURN = 'Saturn',
	URANUS = 'Uranus',
	NEPTUNE = 'Neptune',
}

export interface IPlanet {
	id: string;
	name: string;
	englishName: Planets;
	isPlanet: boolean;
	moons: Moon[];
	semimajorAxis: number;
	perihelion: number;
	aphelion: number;
	eccentricity: number;
	inclination: number;
	mass: Mass;
	vol: Vol;
	density: number;
	gravity: number;
	escape: number;
	meanRadius: number;
	equaRadius: number;
	polarRadius: number;
	flattening: number;
	dimension: string;
	sideralOrbit: number;
	sideralRotation: number;
	aroundPlanet: null;
	discoveredBy: string;
	discoveryDate: string;
	alternativeName: string;
	axialTilt: number;
	avgTemp: number;
	mainAnomaly: number;
	argPeriapsis: number;
	longAscNode: number;
	bodyType: string;
	rel: string;
}

export interface Mass {
	massValue: number;
	massExponent: number;
}

export interface Moon {
	moon: string;
	rel: string;
}

export interface Vol {
	volValue: number;
	volExponent: number;
}