// In your navigation configuration file
import ViewImageScreen from "../Screens/ViewImageScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator>
      {/* Other screens */}
      <Stack.Screen 
        name="ViewImage" 
        component={ViewImageScreen} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}