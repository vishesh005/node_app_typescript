import 'package:flutter_client_app/screens/home_screen.dart';
import 'package:flutter_client_app/screens/splash_screen.dart';
import 'package:flutter/material.dart';

final buildRoutes = {


  SplashScreen.routePath: (BuildContext context) {
    return const SplashScreen();
  },

  HomeScreen.routePath: (BuildContext context) {
    return const HomeScreen();
  }


};