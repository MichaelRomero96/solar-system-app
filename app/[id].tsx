import { useState, useRef, useEffect } from 'react';
import { ScrollView, Dimensions, View, Image, Animated, Pressable, ActivityIndicator, Text } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { FontAwesome } from '@expo/vector-icons';
import SolarSystemAPI from '@/api/solarSystem';
import PixabayAPI from '@/api/pixabay';
import { planets } from '@/db/solarSystem';
import Storage from '@/utils/storage';
import React from 'react';

const { width } = Dimensions.get('window');

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

  // Auto-scroll effect
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

  // Check if the planet is a favorite on mount
  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (id) {
        const favoriteStatus = await Storage.isFavoritePlanet(id as string);
        setIsFavorite(favoriteStatus);
      }
    };
    checkFavoriteStatus();
  }, [id]);

  // Toggle favorite status
  const toggleFavorite = async () => {
    if (isFavorite) {
      await Storage.removeFavoritePlanet(id as string);
    } else {
      await Storage.addFavoritePlanet(id as string);
    }
    setIsFavorite(!isFavorite);
  };

  return (
    <View>
      <Stack.Screen options={{ title: planetQuery.data?.englishName || 'Planet' }} />
      
      {planetQuery.isLoading || imagesQuery.isLoading ? (
        <ActivityIndicator size="large" />
      ) : planetQuery.error ? (
        <Text>Error fetching planet data.</Text>
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
            style={{ width, height: 300 }}
          >
            {imageSources.map((img, index) => (
              <Image
                key={index}
                source={{ uri: img }}
                style={{ width, height: 300, resizeMode: 'cover' }}
              />
            ))}
          </ScrollView>

          {/* Dots indicator */}
          <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 10, alignItems: 'center' }}>
            {imageSources.map((_, index) => (
              <View
                key={index}
                style={{
                  width: currentIndex === index ? 12 : 8,
                  height: currentIndex === index ? 12 : 8,
                  borderRadius: 6,
                  backgroundColor: currentIndex === index ? '#333' : '#bbb',
                  marginHorizontal: 4,
                }}
              />
            ))}
          </View>

          <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 26, color: '#fff', fontWeight: 'bold', marginBottom: 10 }}>
              {planetQuery.data?.englishName}
            </Text>
            <Text style={{ fontSize: 16, color: '#fff' }}>
              {planets[planetQuery.data?.englishName || 'Earth'].description}
            </Text>

            {/* Favorites Button */}
            <View style={{ marginVertical: 20 }}>
              <Pressable onPress={toggleFavorite} style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <FontAwesome name={isFavorite ? "heart" : "heart-o"} size={18} color="white" />
                <Text style={{ color: '#fff', fontSize: 14 }}>
                  {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                </Text>
              </Pressable>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default PlanetDetails;