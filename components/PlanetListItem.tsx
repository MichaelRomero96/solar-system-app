import { planets } from '@/db/solarSystem';
import { IPlanet } from '@/interfaces/solarSystem';
import { Link } from 'expo-router';
import { FC } from 'react';
import { Text, Image, Pressable } from 'react-native';

interface Props {
  planet: IPlanet
}

const PlanetListItem: FC<Props> = ({ planet }) => {
  return (
    <Link href={`/${planet.id}`} asChild>
      <Pressable style={{ flex: 1, borderRadius: 10, borderColor: '#fff', borderWidth: 1, padding: 20 }}>
        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 17, textAlign: 'center' }}>{planet.englishName}</Text>
        <Image
          source={{
            uri: planets[planet.englishName].image,
          }}
          style={{ width: '100%', aspectRatio: 4 / 4, padding: 5 }}
        />
      </Pressable>
    </Link>
  );
};

export default PlanetListItem;