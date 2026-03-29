import { Tabs, useSegments } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const segment = useSegments();
//console.log(segment)
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: { display: segment[1] === "pollas" ? 'none' : 'flex' }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="pollas"
        options={{
          title: 'Pollas',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="horse-variant-fast" size={24} color={color} />,
        }}
      />
       <Tabs.Screen
        name="resultados"
        options={{
          title: 'Resultados',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="printer-pos-check-outline" size={24} color={color} />,
        }}
      />   
      <Tabs.Screen
        name="usuario"
        options={{
          title: 'Usuario',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="crown-circle-outline" size={24} color={color} />,
        }}
      />    
       
    </Tabs>
    
  );
}
