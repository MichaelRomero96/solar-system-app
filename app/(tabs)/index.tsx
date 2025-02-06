import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';
import { View } from '@/components/Themed';
import SolarSystemAPI from '@/api/solarSystem';
import { useQuery } from '@tanstack/react-query';
import PlanetListItem from '@/components/PlanetListItem';

export default function TabOneScreen() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['planets'],
    queryFn: SolarSystemAPI.GetPlanets,
  });

  if (isLoading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  const planets = data ?? [];


  return (
    <View style={styles.container}>
      <FlatList
        data={planets}
        numColumns={2}
        contentContainerStyle={{ gap: 5, padding: 10 }}
        columnWrapperStyle={{ gap: 10 }}
        renderItem={({ item }) => <PlanetListItem planet={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
});