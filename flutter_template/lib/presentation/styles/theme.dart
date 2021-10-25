import 'package:flutter/material.dart';

ThemeData defaultTheme() {
  return ThemeData.light().copyWith(
    brightness: Brightness.light,
    appBarTheme: AppBarTheme(
      color: Colors.amber,
    ),
    backgroundColor: Colors.amber,
    colorScheme: ColorScheme.fromSwatch().copyWith(
        primary: Colors.amberAccent,
        secondary: Colors.amber
    ),
    textTheme: TextTheme(
      bodyText1: TextStyle(
          color: Colors.black
      ),
      bodyText2: TextStyle(
          color: Colors.black
      ),
      // For form input colors.
      subtitle1: TextStyle(
          color: Colors.black
      ),
    ),
  );
}

ThemeData darkTheme() {
  return ThemeData.dark().copyWith(
    brightness: Brightness.dark,
  );
}
