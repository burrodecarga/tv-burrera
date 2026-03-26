import { useColorScheme } from '@/hooks/use-color-scheme';
import { AuthProvider } from '@/hooks/userContext';
import PollasProvider from '@/provider/PollasProvider';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Root as PopupRootProvider } from '@sekizlipenguen/react-native-popup-confirm-toast';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

 

  return (
    <PopupRootProvider>
    <AuthProvider>
      <PollasProvider>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
                <Stack.Screen name="auth/register/index" options={{ headerShown: false }} />
                <Stack.Screen name="auth/login/index" options={{ headerShown: false }} />
              </Stack>
              <StatusBar style="auto" />
            </ThemeProvider>
          </GestureHandlerRootView>    
      </PollasProvider>
    </AuthProvider>
    </PopupRootProvider>
  );
}
