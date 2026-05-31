import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { useAppInfoCardStyles } from './AppInfoCard.styles';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { toggleTheme } from '../../../theme/themeSlice';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

const AppInfoCard: React.FC = () => {
  const styles = useAppInfoCardStyles();
  const dispatch = useAppDispatch();

  const mode = useAppSelector(state => state.theme.mode);

  const isDarkMode = mode === 'dark';

  const appVersion = '1.0.0';

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>

        {/* Theme Toggle */}
        <View style={styles.settingItem}>
          <Icons name="palette" size={20} color={styles.iconColor.color} />
          <Text style={styles.settingLabel}>Change Theme</Text>
          <Switch
            value={isDarkMode}
            onValueChange={() => {
              dispatch(toggleTheme());
            }}
            trackColor={{ false: '#767577', true: '#81c784' }}
            thumbColor={styles.thumbColor.color}
          />
        </View>

        {/* Wishlist */}
        <TouchableOpacity style={styles.settingItem}>
          <Icons name="heart" size={20} color={styles.iconColor.color} />
          <Text style={styles.settingLabel}>Wishlist</Text>
          <Icons
            name="chevron-right"
            size={20}
            color={styles.iconColor.color}
          />
        </TouchableOpacity>

        {/* App Version */}
        <View style={[styles.settingItem, styles.bottomSettingItem]}>
          <Text style={styles.settingLabel}>App Version</Text>
          <Text style={styles.versionText}>{appVersion}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default AppInfoCard;
