import 'dart:convert';

import 'package:flutter_template/data/models/dtos/authorized_user.dto.dart';
import 'package:flutter_template/data/models/dtos/registered_user.dto.dart';
import 'package:flutter_template/data/models/results/data_result.dart';
import 'package:flutter_template/data/providers/auth_provider.dart';
import 'package:flutter_template/data/providers/secure_storage_provider.dart';

class AuthRepository {

  AuthProvider _authProvider = AuthProvider();
  SecureStorageProvider _secureStorageProvider = SecureStorageProvider();

  Future<AuthorizedUserDto?> login(String username, String password) async {
    try {
      var result = await _authProvider.login(username, password);

      if(result is DataResult) {

          var authorizedUserDto = AuthorizedUserDto.fromJson(
            jsonDecode(result.data)
          );

          _secureStorageProvider.tryInsert('username', authorizedUserDto.username);
          _secureStorageProvider.tryInsert('access_token', authorizedUserDto.token);

          return authorizedUserDto;

      }
    } catch (ex) {
      print(ex);
    }
  }

  Future logout() async {
    try {
      _secureStorageProvider.deleteValue('username');
      _secureStorageProvider.deleteValue('access_token');
    } catch(ex) {
      print('An exception came up during logout.');
      print(ex);
    }
  }

  Future<RegisteredUserDto?> register(String email, String username, String password) async {
    try {
      var result = await _authProvider.register(email, username, password);

      if(result is DataResult) {
        var registeredUserDto = RegisteredUserDto.fromJson(
          jsonDecode(result.data)
        );

        await _secureStorageProvider.tryInsert('username', registeredUserDto.token);
        await _secureStorageProvider.tryInsert('access_token', registeredUserDto.token);

        return registeredUserDto;
      }
    } catch(ex) {
      print(ex);
    }
    return null;
  }

  Future<String?> findStoredToken() async {
    return await _secureStorageProvider.getValueByKey("access_token");
  }

  Future validateStoredUser() async {

  }
}