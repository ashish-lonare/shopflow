import React from 'react';
import { Image, Text, View } from 'react-native';
import { useUserInfoCardStyles } from './UserInfoCard.styles';
import { useGetCurrentUserQuery } from '../../../auth/authApi';

const UserInfoCard: React.FC = () => {
  const styles = useUserInfoCardStyles();
  const { data: user, isLoading, error } = useGetCurrentUserQuery();

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error loading user data</Text>
      </View>
    );
  }
  return (
    <View style={styles.card}>
      {user?.image! ? (
        <Image source={{ uri: user.image }} style={styles.avatar} />
      ) : (
        <View style={[styles.avatar, styles.avatarPlaceholder]}>
          <Text style={styles.avatarPlaceholderText}>
            {user?.firstName.charAt(0)?.toUpperCase() || 'U'}
          </Text>
        </View>
      )}

      <View style={styles.infoContainer}>
        <Text style={styles.name}>
          {user?.firstName + ' ' + user?.lastName}
        </Text>
        <Text style={styles.meta}>{user?.email}</Text>
        <Text style={styles.meta}>@{user?.username}</Text>
        {user?.gender && (
          <Text style={styles.meta}>
            {user?.gender.charAt(0).toUpperCase() + user?.gender.slice(1)}
          </Text>
        )}
      </View>
    </View>
  );
};

export default UserInfoCard;
