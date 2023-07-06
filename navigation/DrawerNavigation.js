import React, { Component } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./stack";
import Profile from "../screens/profile";
import Sair from "../screens/logout";
import firebase from "firebase";

import CustomSidebarMenu from "../screens/customSideBarMenu"

const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      light_theme: true,
    };
  }

  componentDidMount() {
    let theme;
    firebase
      .database()
      .ref("/users/" + firebase.auth().currentUser.uid)
      .on("value", function (snapshot) {
        theme = snapshot.val().current_theme;
      });
    this.setState({ light_theme: theme === "light" ? true : false });
  }

  render() {
    let props = this.props;
    return (
      <Drawer.Navigator
        screenOptions={{
          drawerActiveTintColor: "#e91e63",
          drawerInactiveTintColor: this.state.light_theme ? "black" : "white",
          drawerItemStyle: { marginVertical: 5 },
        }}
        drawerContent={(props) => <CustomSidebarMenu {...props} />}
      >
        <Drawer.Screen
          name="home"
          component={StackNavigator}
          options={{ unmountOnBlur: true }}
        />
        <Drawer.Screen
          name="profile"
          component={Profile}
          options={{ unmountOnBlur: true }}
        />
        <Drawer.Screen
          name="logout"
          component={Sair}
          options={{ unmountOnBlur: true }}
        />
      </Drawer.Navigator>
    );
  }
}
