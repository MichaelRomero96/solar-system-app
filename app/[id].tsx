import { useState, useRef, useEffect } from 'react';
import { ScrollView, Dimensions, View, Image, Animated, Pressable, ActivityIndicator, Text } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { FontAwesome } from '@expo/vector-icons';
import SolarSystemAPI from '@/api/solarSystem';
import PixabayAPI from '@/api/pixabay';
import { planets } from '@/db/solarSystem';
import React from 'react'

const { width } = Dimensions.get('window');

const PlanetDetails = () => {
  const { id } = useLocalSearchParams();

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

  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

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

            <Text style={{ fontSize: 26, color: '#fff', fontWeight: 'bold', marginBottom: 10 }}>{planetQuery.data?.englishName}</Text>
            <Text style={{ fontSize: 16, color: '#fff' }}>{planets[planetQuery.data?.englishName || 'Earth'].description}</Text>

            <View style={{ marginVertical: 20 }}>
              <Pressable style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                <FontAwesome name="heart" size={18} color="white" />
                <Text style={{ color: '#fff', fontSize: 14 }}>Add to favorites</Text>
              </Pressable>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

export default PlanetDetails;