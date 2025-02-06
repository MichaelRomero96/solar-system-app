import { IPlanet, Planets } from "@/interfaces/solarSystem";

enum FilterMethods {
	EQ = 'eq',
	LIKE = 'cs',
	END_WIDTH = 'ew',
	LESS_THAN = 'lt',
	LESS_OR_EQUAL_THAN = 'le',
	GREATER_OR_EQUAL_THAN = 'ge',
	GREATER_THAN = 'gt',
	BETWEEN = 'bt'
};

enum filterKeys {
	IS_PLANET = 'isPlanet'
};

interface FilterOptions {
	filterKey: filterKeys,
	filterMethod: FilterMethods,
	filterValue: FilterValue
};

type FilterValue = string | boolean;

class SolarSystemAPI {
	private static baseURL = 'https://api.le-systeme-solaire.net/rest/bodies';

	private static applyFilter(options: FilterOptions) {
		return `${this.baseURL}/?filter[]=${options.filterKey},${options.filterMethod},${options.filterValue}`
	};

	private static SortPlanets(planets: IPlanet[]) {
		const planetOrder = Object.values(Planets);
		return planets.sort((a, b) => {
			return planetOrder.indexOf(a.englishName) - planetOrder.indexOf(b.englishName);
		});
	}

	public static async GetPlanets(): Promise<IPlanet[]> {
		const url = SolarSystemAPI.applyFilter({
			filterKey: filterKeys.IS_PLANET,
			filterMethod: FilterMethods.EQ,
			filterValue: true
		});
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error('Failed to fetch Planets')
		}
		const data = await res.json();
		const sortedPlanets = SolarSystemAPI.SortPlanets(data.bodies);
		return sortedPlanets;
	};

	public static async GetPlanetById(id: string): Promise<IPlanet> {
		const url = `${this.baseURL}/${id}`;
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error('Failed to fetch the planet')
		}
		const data = await res.json();
		return data;
	};
};

export default SolarSystemAPI;