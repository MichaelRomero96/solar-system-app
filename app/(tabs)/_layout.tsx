import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors['dark'].tint,
        tabBarStyle: { backgroundColor: '#000' }
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Planets',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'My Favorite Planets',
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
        }}
      />
    </Tabs>
  );
}