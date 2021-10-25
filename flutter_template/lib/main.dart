import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_template/data/cubits/theme_cubit.dart';
import 'package:flutter_template/presentation/screens/home_screen.dart';
import 'package:flutter_template/presentation/screens/login_screen.dart';
import 'package:flutter_template/presentation/screens/register_screen.dart';
import 'package:flutter_template/presentation/styles/theme.dart';

void main() {
  runApp(TemplateApp());
}

class TemplateApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => ThemeCubit(defaultTheme()),
      child: BlocBuilder<ThemeCubit, ThemeData>(
        builder: (context, currentTheme) {
          return MaterialApp(
            debugShowCheckedModeBanner: false,
            title: 'Night War',
            theme: currentTheme,
            routes: {
              '/': (context) => LoginScreen(),
              LoginScreen.route: (context) => LoginScreen(),
              RegisterScreen.route: (context) => RegisterScreen(),
              HomeScreen.route: (context) => HomeScreen()
            },
            initialRoute: '/',
          );
        },
      )
    );
  }
}