import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'favoritePlanets';

class Storage {
  public static async getFavoritePlanets(): Promise<string[]> {
    try {
      const storedFavorites = await AsyncStorage.getItem(FAVORITES_KEY);
      return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
      console.error('Error retrieving favorite planets:', error);
      return [];
    }
  }

  public static async addFavoritePlanet(planetId: string): Promise<void> {
    try {
      const favorites = await this.getFavoritePlanets();
      if (!favorites.includes(planetId)) {
        const updatedFavorites = [...favorites, planetId];
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
      }
    } catch (error) {
      console.error('Error adding favorite planet:', error);
    }
  }

  public static async removeFavoritePlanet(planetId: string): Promise<void> {
    try {
      const favorites = await this.getFavoritePlanets();
      const updatedFavorites = favorites.filter(id => id !== planetId);
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    } catch (error) {
      console.error('Error removing favorite planet:', error);
    }
  }

  public static async isFavoritePlanet(planetId: string): Promise<boolean> {
    const favorites = await this.getFavoritePlanets();
    return favorites.includes(planetId);
  }
}

export default Storage;