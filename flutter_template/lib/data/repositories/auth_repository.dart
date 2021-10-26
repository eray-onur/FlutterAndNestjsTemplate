import 'dart:convert';

import 'package:flutter_template/data/models/dtos/authorized_user.dto.dart';
import 'package:flutter_template/data/models/dtos/registered_user.dto.dart';
import 'package:flutter_template/data/models/results/data_result.dart';
import 'package:flutter_template/data/models/results/result.dart';
import 'package:flutter_template/data/providers/auth_provider.dart';
import 'package:flutter_template/data/providers/secure_storage_provider.dart';

class AuthRepository {

  AuthProvider _authProvider = AuthProvider();
  SecureStorageProvider _secureStorageProvider = SecureStorageProvider();

  Future<Result> login(String username, String password) async {
      var response = await _authProvider.login(username, password);

      if(response.statusCode != 500) {

          var authorizedUserDto = AuthorizedUserDto.fromJson(
            jsonDecode(response.body)
          );

          await _secureStorageProvider.tryInsert('username', authorizedUserDto.username);
          await _secureStorageProvider.tryInsert('access_token', authorizedUserDto.token);


          return DataResult(
            data: authorizedUserDto,
            resultCode: response.statusCode,
            message: 'Operation successful',
          );

      }

      return Result(
          resultCode: response.statusCode,
          message: response.body
      );
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

  Future<Result> register(String email, String username, String password) async {
    var response = await _authProvider.register(email, username, password);
    print('STATUS CODE IS:');
    print(response.statusCode);
    if(response.statusCode != 500) {
      var registeredUserDto = RegisteredUserDto.fromJson(
          jsonDecode(response.body)
      );
      await _secureStorageProvider.tryInsert(
          'username', registeredUserDto.token);
      await _secureStorageProvider.tryInsert(
          'access_token', registeredUserDto.token);

      return DataResult(
        resultCode: response.statusCode,
        message: 'Operation successful',
        data: registeredUserDto,
      );
    } else return Result(
        resultCode: response.statusCode,
        message: response.body
    );
  }

  Future<String?> findStoredToken() async {
    return await _secureStorageProvider.getValueByKey("access_token");
  }


}