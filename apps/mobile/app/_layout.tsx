import { Tabs } from "expo-router";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TamaguiProvider, createTamagui, View } from '@tamagui/core'
import { config } from '@tamagui/config/v3'

// you usually export this from a tamagui.config.ts file
const tamaguiConfig = createTamagui(config)

// make TypeScript type everything based on your config
type Conf = typeof tamaguiConfig
declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}
export default function RootLayoutNav() {
  const insets = useSafeAreaInsets();
  return (
    // SafeAreaProvider is not functioning...
    <TamaguiProvider config={tamaguiConfig}>
      <View style={{ 
        paddingTop: insets.top,
        paddingLeft: insets.left, 
        paddingRight: insets.right, 
        paddingBottom: insets.bottom,
        flex: 1
      }}>
          <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
              name="index"
              options={{
                title: 'Stock',
                tabBarIcon: ({ color }) => <MaterialCommunityIcons name="fridge" size={24} color="black" />,
              }}
              />
            <Tabs.Screen
              name="scanner"
              options={{
                unmountOnBlur: true,
                title: 'Scan',
                tabBarIcon: ({ color }) => <MaterialCommunityIcons name="barcode-scan" size={24} color="black" />,
              }}
            />
            {/* Tab to hide */}
            <Tabs.Screen
              name="product/[productId]"
              options={{ href: null }}
            />
        </Tabs>
      </View>
    </TamaguiProvider>
  );
}