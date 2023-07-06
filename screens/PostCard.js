import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { RFValue } from "react-native-responsive-fontsize";
import * as SplashScreen from "expo-splash-screen";
import { TouchableOpacity } from "react-native-gesture-handler";
import firebase from "firebase";


SplashScreen.preventAutoHideAsync();

export default class PostCard extends Component {
  constructor(props) {
    super(props);
    this.state = {post_id: this.props.post.key,
      post_data: this.props.post.value,};
  }
  componentDidMount() {
    this.fetchUser();
  }

  async fetchUser() {
    let theme;
    await firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", (snapshot) => {
        theme = snapshot.val().current_theme;
        this.setState({
          light_theme: theme === "light" 
        });
      });
    
  }


  render() {
    let post = this.state.post_data
    let preview_images = {
      image1: require("../assets/image_1.jpg"),
      image2: require("../assets/image_2.jpg"),
      image3: require("../assets/image_3.jpg"),
      image4: require("../assets/image_4.jpg"),
      image5: require("../assets/image_5.jpg"),
    };
    return (
      <TouchableOpacity
        style={styles.container}
        onPress={() => {
          this.props.navigation.navigate("PostScreen", {
            post: post,
          });
        }}
      >
        <View style={this.state.light_theme?styles.cardContainerLight:styles.cardContainer}>
          <Image
            source={preview_images[post.preview_image]}
            style={styles.storyImage}
          ></Image>

          <View style={styles.titleContainer}>
            <Text style={this.state.light_theme?styles.storyTitleTextLight:styles.storyTitleText}>{post.title}</Text>
            <Text style={this.state.light_theme?styles.storyAuthorTextLight:styles.storyAuthorText}>{post.author}</Text>
            <Text style={this.state.light_theme?styles.descriptionTextLight:styles.descriptionText}>
              {post.caption}
            </Text>
          </View>
          <View style={styles.actionContainer}>
            <View style={styles.likeButton}>
              <Ionicons name={"heart"} size={RFValue(30)} color={"white"} />
              <Text style={styles.likeText}>12k</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    margin: RFValue(13),
    backgroundColor: "#202020",
    borderRadius: RFValue(20),
  },
  cardContainerLight: {
    margin: RFValue(13),
    backgroundColor: "white",
    borderRadius: RFValue(20),
  },
  storyImage: {
    resizeMode: "contain",
    width: "95%",
    alignSelf: "center",
    height: RFValue(250),
  },
  titleContainer: {
    paddingLeft: RFValue(20),
    justifyContent: "center",
  },
  storyTitleText: {
    fontSize: RFValue(25),
    fontFamily: "Bubblegum-Sans",
    color: "white",
  },
  storyTitleTextLight: {
    fontSize: RFValue(25),
    fontFamily: "Bubblegum-Sans",
    color: "black",
  },
  storyAuthorText: {
    fontSize: RFValue(18),
    fontFamily: "Bubblegum-Sans",
    color: "white",
  },
  storyAuthorTextLight: {
    fontSize: RFValue(18),
    fontFamily: "Bubblegum-Sans",
    color: "black",
  },
  descriptionText: {
    fontFamily: "Bubblegum-Sans",
    fontSize: 13,
    color: "white",
    paddingTop: RFValue(10),
  },
  descriptionTextLight: {
    fontFamily: "Bubblegum-Sans",
    fontSize: 13,
    color: "black",
    paddingTop: RFValue(10),
  },
  actionContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: RFValue(10),
  },
  likeButton: {
    width: RFValue(160),
    height: RFValue(40),
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#eb3948",
    borderRadius: RFValue(30),
  },
  likeText: {
    color: "white",
    fontFamily: "Bubblegum-Sans",
    fontSize: RFValue(25),
    marginLeft: RFValue(5),
  },
});
