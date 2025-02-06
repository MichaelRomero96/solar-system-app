import { useState, useCallback } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, Pressable, View } from 'react-native';
import SolarSystemAPI from '@/api/solarSystem';
import { useQuery } from '@tanstack/react-query';
import PlanetListItem from '@/components/PlanetListItem';
import Storage from '@/utils/storage';
import { useFocusEffect } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

interface PlanetsViewProps {
  favoritesView?: boolean;
}

export default function PlanetsView({ favoritesView = false }: PlanetsViewProps) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const { data, isLoading, error } = useQuery({
    queryKey: ['planets'],
    queryFn: SolarSystemAPI.GetPlanets,
  });

  useFocusEffect(
    useCallback(() => {
      if (favoritesView) {
        const loadFavorites = async () => {
          const storedFavorites = await Storage.getFavoritePlanets();
          setFavorites(storedFavorites || []);
        };
        loadFavorites();
      }
    }, [favoritesView])
  );

  if (isLoading) return <ActivityIndicator />;
  if (error) return <Text>{error.message}</Text>;

  let planets = data ?? [];

  if (favoritesView) {
    planets = planets.filter((planet) => favorites.includes(planet.id));
  }

  if (searchQuery) {
    planets = planets.filter((planet) =>
      planet.englishName.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  planets = planets.sort((a, b) => {
    if (sortOrder === 'asc') return a.englishName.localeCompare(b.englishName);
    return b.englishName.localeCompare(a.englishName);
  });

  return (
    <View style={styles.container}>
      <View style={styles.searchSortContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search planet..."
          placeholderTextColor="#bbb"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Pressable style={styles.sortButton} onPress={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}>
          <FontAwesome name={sortOrder === 'asc' ? 'sort-alpha-asc' : 'sort-alpha-desc'} size={20} color="white" />
        </Pressable>
      </View>

      {planets.length > 0 ? (
        <FlatList
          data={planets}
          numColumns={2}
          contentContainerStyle={{ gap: 5, padding: 10 }}
          columnWrapperStyle={{ gap: 10 }}
          renderItem={({ item }) => <PlanetListItem planet={item} />}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.emptyText}>
          {favoritesView ? 'No favorite planets found.' : 'No planets match your search.'}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 10,
  },
  searchSortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#222',
    color: 'white',
    padding: 10,
    borderRadius: 10,
    marginRight: 10,
  },
  sortButton: {
    backgroundColor: '#333',
    padding: 10,
    borderRadius: 10,
  },
  emptyText: {
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});