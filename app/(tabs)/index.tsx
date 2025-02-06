import { ActivityIndicator, FlatList, StyleSheet, Text } from 'react-native';
import { View } from '@/components/Themed';
import SolarSystemAPI from '@/api/solarSystem';
import { useQuery } from '@tanstack/react-query';
import PlanetListItem from '@/components/PlanetListItem';
import PlanetsView from '@/components/PlanetsView';

export default function TabOneScreen() {
  return (
    <PlanetsView />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  },
});