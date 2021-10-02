import 'package:flutter/material.dart';

class HomeScreen extends StatelessWidget {
  static const route = '/home';
  const HomeScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        body: Container(
          child: Column(
            children: [
              Text('This is the homepage.')
            ],
          ),
        ),
      ),
    );
  }
}
