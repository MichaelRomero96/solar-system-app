import { useState, useRef, useEffect } from 'react';
import { ScrollView, Dimensions, View, Image, Animated, Pressable, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { FontAwesome } from '@expo/vector-icons';
import SolarSystemAPI from '@/api/solarSystem';
import PixabayAPI from '@/api/pixabay';
import { planets } from '@/db/solarSystem';
import Storage from '@/utils/storage';
import React from 'react';

const { width, height } = Dimensions.get('window');

const PlanetDetails = () => {
  const { id } = useLocalSearchParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const planetQuery = useQuery({
    queryKey: ['planets', id],
    queryFn: () => SolarSystemAPI.GetPlanetById(id as string),
    enabled: !!id
  });

  const imagesQuery = useQuery({
    queryKey: [`planets-images-${id}`],
    queryFn: () => PixabayAPI.GetImagesByKeyword(`${id}+planet`),
    enabled: !!id,
  });

  const imageSources = imagesQuery.data?.length
    ? [planets[planetQuery.data?.englishName || 'Earth'].image, ...imagesQuery.data]
    : [planets[planetQuery.data?.englishName || 'Earth'].image];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % imageSources.length;
        scrollViewRef.current?.scrollTo({ x: nextIndex * width, animated: true });
        return nextIndex;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [imageSources.length]);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (id) {
        const favoriteStatus = await Storage.isFavoritePlanet(id as string);
        setIsFavorite(favoriteStatus);
      }
    };
    checkFavoriteStatus();
  }, [id]);

  const toggleFavorite = async () => {
    if (isFavorite) {
      await Storage.removeFavoritePlanet(id as string);
    } else {
      await Storage.addFavoritePlanet(id as string);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: planetQuery.data?.englishName || 'Planet' }} />

      {planetQuery.isLoading || imagesQuery.isLoading ? (
        <ActivityIndicator size="large" />
      ) : planetQuery.error ? (
        <Text style={{ color: '#fff'}}>Error fetching planet data.</Text>
      ) : (
        <>
          <ScrollView
            ref={scrollViewRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false }
            )}
            scrollEventThrottle={16}
            style={{ width, height: height * 0.4 }}
          >
            {imageSources.map((img, index) => (
              <Image
                key={index}
                source={{ uri: img }}
                style={{ width, height: height * 0.4, resizeMode: 'cover' }}
              />
            ))}
          </ScrollView>

          <View style={styles.indicatorContainer}>
            {imageSources.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicatorDot,
                  { backgroundColor: currentIndex === index ? '#fff' : '#555' },
                ]}
              />
            ))}
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>{planetQuery.data?.englishName}</Text>
            <Text style={styles.description}>
              {planets[planetQuery.data?.englishName || 'Earth'].description}
            </Text>

            <View style={{ marginVertical: 20 }}>
              <Pressable onPress={toggleFavorite} style={styles.favoriteButton}>
                <FontAwesome name={isFavorite ? "heart" : "heart-o"} size={18} color="white" />
                <Text style={styles.favoriteText}>
                  {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                </Text>
              </Pressable>
            </View>

            <View style={styles.card}>
              <Text style={styles.cardTitle}>Planet Data</Text>

              <DataRow label="Mass" value={`${planetQuery.data?.mass?.massValue} × 10^${planetQuery.data?.mass?.massExponent} kg`} />
              <DataRow label="Volume" value={`${planetQuery.data?.vol?.volValue} × 10^${planetQuery.data?.vol?.volExponent} km³`} />
              <DataRow label="Gravity" value={`${planetQuery.data?.gravity} m/s²`} />
              <DataRow label="Density" value={`${planetQuery.data?.density} g/cm³`} />
              <DataRow label="Escape Velocity" value={`${planetQuery.data?.escape} m/s`} />
              <DataRow label="Mean Radius" value={`${planetQuery.data?.meanRadius} km`} />
              <DataRow label="Orbital Period" value={`${planetQuery.data?.sideralOrbit} days`} />

              {planetQuery.data && planetQuery.data?.moons?.length > 0 && (
                <View style={styles.moonsContainer}>
                  <Text style={styles.moonsLabel}>Moons:</Text>
                  <ScrollView horizontal style={styles.moonsScrollView}>
                    <Text style={styles.moonsText}>
                      {planetQuery.data.moons.map(moon => moon.moon).join(', ')}
                    </Text>
                  </ScrollView>
                </View>
              )}
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const DataRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.dataRow}>
    <Text style={styles.dataLabel}>{label}:</Text>
    <Text style={styles.dataValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  content: { padding: 20 },
  title: { fontSize: 26, color: '#fff', fontWeight: 'bold', marginBottom: 10 },
  description: { fontSize: 16, color: '#fff' },
  favoriteButton: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  favoriteText: { color: '#fff', fontSize: 14 },
  card: { borderWidth: 1, borderColor: '#888', borderRadius: 10, padding: 15, backgroundColor: '#111' },
  cardTitle: { fontSize: 18, color: '#fff', fontWeight: 'bold', marginBottom: 10 },
  dataRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5 },
  dataLabel: { color: '#bbb', fontSize: 14 },
  dataValue: { color: '#fff', fontSize: 14 },
  indicatorContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 },
  indicatorDot: { width: 8, height: 8, borderRadius: 4, marginHorizontal: 4 },
  moonsContainer: { marginTop: 10 },
  moonsLabel: { color: '#bbb', fontSize: 14, marginBottom: 5 },
  moonsScrollView: { maxHeight: 50 },
  moonsText: { color: '#fff', fontSize: 14 },
});

export default PlanetDetails;