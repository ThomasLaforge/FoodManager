import { Tabs } from "expo-router";
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "react-native";

export default function RootLayoutNav() {
  const insets = useSafeAreaInsets();
  return (
    // SafeAreaProvider is not functioning...
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
              title: 'Scan',
              tabBarIcon: ({ color }) => <MaterialCommunityIcons name="barcode-scan" size={24} color="black" />,
            }}
            />
      </Tabs>
    </View>
  );
}