import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Link, useRouter, Stack, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
const EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
import { TouchableOpacity, View } from 'react-native';
import { ClerkProvider, useAuth } from '@clerk/clerk-expo';
import * as SecureStore from 'expo-secure-store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const tokenCache = {
  async getToken(key: string) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (err) {
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};


export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const InitialLayout = () => {

  const {isLoaded, isSignedIn} = useAuth();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {

    if(!isLoaded || !loaded ) return;

    const inAuthGroup = segments[0] === 'auth'
    console.log('isSignedIn', isSignedIn);

    if(isSignedIn && !inAuthGroup){
      router.replace('/home')
    }else if (!isSignedIn) {
      router.replace('/')
    }

  }, [isSignedIn])

  
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  }); 
  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }   

  return <Stack>

  <Stack.Screen name='index' options={{headerShown: false}}/>
  <Stack.Screen 
    name='signup'
    options={{
      title: '',
      headerBackTitle: "",
      headerShadowVisible: false,
      headerStyle: {backgroundColor: Colors.background},
      headerLeft: () => (
        <TouchableOpacity onPress={router.back} >
          <Ionicons name='arrow-back' size={30} color={Colors.dark}/>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <Link href={'/help'} asChild>
        <TouchableOpacity>
          <Ionicons name='help-circle-outline' size={30} color={Colors.dark}/>
        </TouchableOpacity>
        </Link>
      )
    }}
  />
  <Stack.Screen 
    name='login'
    options={{
      title: '',
      headerBackTitle: "",
      headerShadowVisible: false,
      headerStyle: {backgroundColor: Colors.background},
      headerLeft: () => (
        <TouchableOpacity onPress={router.back} >
          <Ionicons name='arrow-back' size={30} color={Colors.dark}/>
        </TouchableOpacity>
      )
    }}
  />
  <Stack.Screen
    name='help'
    options={{
      title: 'Help',
      presentation: 'modal'
    }}
  />
  <Stack.Screen
    name='(auth)/(tabs)'
    options={{
     headerShown: false
    }}
  />
  <Stack.Screen
        name="(auth)/crypto/[id]"
        options={{
          title: '',
          headerLeft: () => (
            <TouchableOpacity onPress={router.back}>
              <Ionicons name="arrow-back" size={34} color={Colors.dark} />
            </TouchableOpacity>
          ),
          headerLargeTitle: true,
          headerTransparent: true,
          headerRight: () => (
            <View style={{ flexDirection: 'row', gap: 10 }}>
              <TouchableOpacity>
                <Ionicons name="notifications-outline" color={Colors.dark} size={30} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Ionicons name="star-outline" color={Colors.dark} size={30} />
              </TouchableOpacity>
            </View>
          ),
        }}
      />


</Stack>
}

const RootLayoutNav = () => {

  return <>
  <ClerkProvider publishableKey={EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!} tokenCache={tokenCache} >
    <QueryClientProvider client={queryClient}>
    <GestureHandlerRootView>
      <StatusBar style='light'/>
      <InitialLayout/>
      </GestureHandlerRootView>
    </QueryClientProvider>
    </ClerkProvider>

  </>
}

export default RootLayoutNav