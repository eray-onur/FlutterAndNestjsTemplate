import 'dart:convert';

import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:flutter_template/data/models/dtos/authorized_user.dto.dart';
import 'package:flutter_template/data/models/dtos/registered_user.dto.dart';
import 'package:flutter_template/data/models/results/data_result.dart';
import 'package:flutter_template/data/models/results/result.dart';
import 'package:flutter_template/data/providers/auth_provider.dart';
import 'package:flutter_template/data/providers/base/secure_storage_provider.dart';
import 'package:flutter_template/data/util/hash_helper.dart';

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

          _secureStorageProvider.tryInsert('token', authorizedUserDto.token);

          return authorizedUserDto;

      } else throw Exception('Login operation was unsuccessful');
    } catch (ex) {
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
        await _secureStorageProvider.tryInsert('token', registeredUserDto.token);
        return registeredUserDto;
      }
    } catch(ex) {
      print(ex);
    }
    return null;
  }
}