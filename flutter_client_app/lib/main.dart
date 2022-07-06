import 'package:flutter/material.dart';
import 'package:flutter_client_app/route_mapping.dart';

void main() {
  runApp(const NoteDemoApp());
}

class NoteDemoApp extends StatelessWidget {
  const NoteDemoApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
       routes: buildRoutes,
    );
  }
}

