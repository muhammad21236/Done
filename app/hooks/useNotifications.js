import { useEffect } from "react";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import expoPushTokensApi from "../api/expoPushTokens";

export default useNotifications = (notificationListener) => {
  useEffect(() => {
    const getPushToken = async () => {
      try {
        // Request permission
        const { status } = await Notifications.requestPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission not granted!");
          return;
        }

        // Get Expo push token with projectId
        const { data: token } = await Notifications.getExpoPushTokenAsync({
          projectId: "fd94fc4f-769a-4fb0-ad4a-ba0af0ba8248",
        });

        expoPushTokensApi.register(token);
      } catch (error) {
        console.log("Error getting a push token:", error);
      }
    };
    if (notificationListener)
      Notifications.addPushTokenListener(notificationListener);

    getPushToken();
  }, []);
};
