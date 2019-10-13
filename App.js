/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Dimensions,
  FlatList
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const photos = [
  { id: '1', user: { name: "Tiago Rosa da costa" } },
  { id: '2', user: { name: "Tiago R. da costa 2" } }
];
const App = () => {
  const width = Dimensions.get("screen").width;
  return (
    <FlatList style={styles.container}
      data={photos}
      keyExtractor={item => item.id}
      renderItem={({ item }) =>
        <View>
          <View style={styles.photoHeader}>
            <Image source={require("./resources/img/photo.jpeg")}
              style={styles.photoProfile} />
            <Text>{item.user.name}</Text>
          </View>
          <Image source={require("./resources/img/photo.jpeg")}
            style={{ "width": width, "height": width }}
          />
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20
  },
  photoHeader: {
    margin: 10,
    flexDirection: "row",
    alignItems: "center"
  },
  photoProfile: { 
    borderRadius: 20,
    width: 40,
    height: 40,
    marginRight: 10 
  }
});

export default App;
