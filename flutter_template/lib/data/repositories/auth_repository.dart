import 'dart:convert';

import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:flutter_template/data/models/dtos/created_user.dto.dart';
import 'package:flutter_template/data/models/results/data_result.dart';
import 'package:flutter_template/data/models/results/result.dart';
import 'package:flutter_template/data/providers/auth_provider.dart';
import 'package:flutter_template/data/util/hash_helper.dart';

class AuthRepository {

  AuthProvider authProvider = AuthProvider();

  Future login(String username, String password) async {
    var hashedPassword = HashHelper.hashPassword(password);
    try {
      var result = await this.authProvider.login(username, hashedPassword);

      if(result is DataResult) {
          final storage = FlutterSecureStorage();
          await storage.write(key: 'tkn', value: result.data);
      } else throw Exception('Login operation was unsuccessful');

    } catch (ex) {
      print(ex);
    }
  }

  Future<CreatedUserDto?> register(String email, String username, String password) async {
    var hashedPassword = HashHelper.hashPassword(password);
    try {
      var result = await this.authProvider.register(email, username, hashedPassword);
      if(result is DataResult) {
        return result.data;
      }
    } catch(ex) {
      print(ex);
    }
    return null;
  }
}