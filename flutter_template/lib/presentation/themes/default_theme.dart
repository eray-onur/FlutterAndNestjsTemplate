import 'package:flutter/material.dart';

mixin DefaultTheme implements ThemeData {
  @override
  Color get primaryColor => Colors.blue;

  @override
  Color get accentColor => Colors.blueAccent;

  @override
  CardTheme get cardTheme => CardTheme(
    color: Colors.white,
    elevation: 6.0,
  );
  @override
  ElevatedButtonThemeData get elevatedButtonTheme => ElevatedButtonThemeData();

  @override
  TextButtonThemeData get textButtonTheme => TextButtonThemeData();
}