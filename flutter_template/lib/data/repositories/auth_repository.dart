import 'dart:convert';
import 'dart:io';


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
      var message = jsonDecode(response.body)['message'];
      print(response.statusCode);

      if(response.statusCode == HttpStatus.created) {
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
          message: message
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
    var message = jsonDecode(response.body)['message'];
    print(response.statusCode);

    if(response.statusCode == HttpStatus.created) {
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
    } else {
      print(message);
      return Result(
          resultCode: response.statusCode,
          message: message
      );
    }
  }

  Future<String?> findStoredToken() async {
    return await _secureStorageProvider.getValueByKey("access_token");
  }


}