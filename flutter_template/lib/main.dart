import 'package:flutter/material.dart';
import 'package:flutter_template/presentation/screens/home_screen.dart';
import 'package:flutter_template/presentation/screens/login_screen.dart';
import 'package:flutter_template/presentation/screens/register_screen.dart';

void main() {
  runApp(TemplateApp());
}

class TemplateApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Night War',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      routes: {
        '/': (context) => LoginScreen(),
        LoginScreen.route: (context) => LoginScreen(),
        RegisterScreen.route: (context) => RegisterScreen(),
        HomeScreen.route: (context) => HomeScreen()
      },
      initialRoute: '/',
    );
  }
}