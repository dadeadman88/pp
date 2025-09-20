import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS, IMAGES, screenHeight, screenWidth } from '../../constants';
import { Typography } from '../../components/atoms';
import { navigate } from '../../navigation/RootNavigation';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerContainer: {
    backgroundColor: '#E7F6F8',
    height: screenHeight(42),
    borderBottomStartRadius: 40,
    borderBottomEndRadius: 40,
    paddingHorizontal: 20,
  },
  bannerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  // TopPhotographerCard
  topUserCard: {
    backgroundColor: '#fff',
    width: screenWidth(60),
    maxWidth: 250,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
    paddingBottom: 10
  },
  topUserAvatar: {
    borderWidth: 2,
    borderColor: '#fff',
    width: 80,
    height: 80,
    borderRadius: 40,
    position: 'absolute',
    top: '32%',
    alignSelf: 'center',
  },
  dualImage: {
    flex: 1,
    height: screenWidth(55 / 2),
    resizeMode: 'cover',
    borderRadius: 10,
    backgroundColor: "#00000022"
  },
});

const TopUserCard = ({ item }: any) => {
  const galleryImages = item.gallery.map((i: any) => ({ uri: i.source_url }))

  return (
    <TouchableOpacity style={styles.topUserCard} onPress={() => navigate(`UserProfile`, { data: item })}>
      <View style={{ flex: 1, flexDirection: 'row', gap: 8, padding: 10 }}>
        {galleryImages[0] ? <Image source={galleryImages[0]} style={styles.dualImage} /> : <View style={styles.dualImage} />}
        {galleryImages[1] ? <Image source={galleryImages[1]} style={styles.dualImage} /> : <View style={styles.dualImage} />}
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <Typography
          children={item.name}
          size={18}
          align="center"
          numberOfLines={1}
          style={{ marginTop: 20 }}
        />
        <Typography
          children={item.addresses[0]?.address || 'N/A'}
          size={14}
          align="center"
          color={COLORS.darkGray}
          numberOfLines={1}
        />
      </View>
      <Image source={item.image ? { uri: item.image_url } : IMAGES.avatar} style={styles.topUserAvatar} />
    </TouchableOpacity>
  );
};

export default TopUserCard;
