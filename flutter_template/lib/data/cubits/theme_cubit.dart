import 'package:bloc/bloc.dart';
import 'package:flutter/material.dart';
import 'package:flutter_template/presentation/styles/theme.dart';

class ThemeCubit extends Cubit<ThemeData> {

  ThemeData _currentTheme = defaultTheme();

  ThemeCubit(ThemeData currentTheme) : super(currentTheme) {
    _currentTheme = currentTheme;
  }

  toggleTheme() {

    _currentTheme = _currentTheme.brightness == Brightness.light
        ? darkTheme()
        : defaultTheme();

    emit(_currentTheme);
  }

}