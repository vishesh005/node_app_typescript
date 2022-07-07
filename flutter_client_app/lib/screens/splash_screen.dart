import 'package:flutter/material.dart';
import 'package:flutter_client_app/screens/home_screen.dart';

class SplashScreen extends StatefulWidget {

 static const String routePath = "/";

  const SplashScreen({Key? key}) : super(key: key);

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {

  @override
  void initState() {
   Future.delayed(const Duration(seconds: 2), (){
     Navigator.of(context)
         .pushReplacementNamed(HomeScreen.routePath);
   });
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
       body: Center(),
    );
  }
}
