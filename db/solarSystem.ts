import { Planets } from '@/interfaces/solarSystem';

export const planets = {
	[Planets.MERCURY]: {
		description: 'Mercury is the closest planet to the Sun. It has extreme temperature fluctuations and no atmosphere to speak of.',
		image: 'https://www.nasa.gov/wp-content/uploads/2023/03/729223main_728322main_messenger_orbit_image20130218_2_full_full_full.jpg'
	},
	[Planets.VENUS]: {
		description: 'Venus is often called Earth’s twin because of their similar size, but Venus has a toxic atmosphere and surface temperatures hot enough to melt lead.',
		image: 'https://ciencia.nasa.gov/wp-content/uploads/sites/2/2023/06/imagesvenus20191211venus20191211-16_0-jpeg.webp'
	},
	[Planets.EARTH]: {
		description: 'Earth is the only known planet to support life. It has abundant water and a protective atmosphere.',
		image: 'https://spaceplace.nasa.gov/review/all-about-earth/earth3.sp.png'
	},
	[Planets.MARS]: {
		description: 'Mars is known as the Red Planet due to its reddish appearance, caused by iron oxide (rust) on its surface.',
		image: 'https://science.nasa.gov/wp-content/uploads/2024/03/pia04304-mars.jpg?w=1536'
	},
	[Planets.JUPITER]: {
		description: 'Jupiter is the largest planet in our solar system, known for its Great Red Spot, a massive storm that has been raging for centuries.',
		image: 'https://spaceplace.nasa.gov/all-about-jupiter/sp/jupiter_turbulent-atmosphere.sp.jpg'
	},
	[Planets.SATURN]: {
		description: 'Saturn is famous for its stunning ring system, made up of ice and rock particles.',
		image: 'https://science.nasa.gov/wp-content/uploads/2023/06/hubble-saturnspokes-stsci-01gph6dah7k11cg5pcvq4b9fq5-1.png'
	},
	[Planets.URANUS]: {
		description: 'Uranus has a unique tilted rotation axis, with its poles pointing almost directly at the Sun.',
		image: 'https://hips.hearstapps.com/hmg-prod/images/uranus-1585338466.jpg'
	},
	[Planets.NEPTUNE]: {
		description: 'Neptune is known for its striking blue color and is the most distant planet from the Sun.',
		image: 'https://assets.science.nasa.gov/dynamicimage/assets/science/psd/solar/2023/09/p/i/a/0/PIA01492-1.jpg?w=2188&h=2185&fit=clip&crop=faces%2Cfocalpoint'
	}
};