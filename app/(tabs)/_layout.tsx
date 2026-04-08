import { Tabs, useSegments } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useUserInfo } from '@/hooks/userContext';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isAdmin } = useUserInfo();
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
          href: isAdmin ? null : '/pollas',
          title: 'Pollas',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="horse-variant-fast" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="puntos"
        options={{
          href: isAdmin ? null : '/(tabs)/puntos/resultados',
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

      <Tabs.Screen
        name="admin"
        options={{
          href: !isAdmin ? null : '/admin',
          title: 'Admin',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="hammer-screwdriver" size={24} color={color} />,
        }}
      />


    </Tabs>

  );
}
