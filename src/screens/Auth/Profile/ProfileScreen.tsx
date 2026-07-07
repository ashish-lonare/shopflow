import { View } from "react-native";
import AppInfoCard from "../../../features/profile/components/AppInfo/AppInfoCard";
import UserInfoCard from "../../../features/profile/components/UserInfo/UserInfoCard";
import { useProfileSreenStyles } from "./ProfileScreen.styles";


const ProfileScreen = () => {
  const styles = useProfileSreenStyles();

  return (
    <View style={styles.container}>
      <UserInfoCard />
      {/* <CurrentThemeCard /> */}
      <AppInfoCard />
    </View>
  );
};

export default ProfileScreen;