import 'dart:convert';
import 'dart:io';
import 'package:flutter_template/data/models/dtos/authorized_user.dto.dart';
import 'package:flutter_template/data/models/dtos/registered_user.dto.dart';
import 'package:flutter_template/data/models/results/data_result.dart';
import 'package:flutter_template/data/models/results/result.dart';
import 'package:flutter_template/data/services/auth_service.dart';
import 'package:flutter_template/data/services/secure_storage_service.dart';

import '../constants.dart';

class AuthRepository {

  AuthService _authService = AuthService();
  SecureStorageService _secureStorageService = SecureStorageService();

  Future<Result> login(String username, String password) async {
      var response = await _authService.login(username, password);
      var message = jsonDecode(response.body)['message'];

      if(response.statusCode == HttpStatus.created) {
        var authorizedUserDto = AuthorizedUserDto.fromJson(
            jsonDecode(response.body)
        );

        await _secureStorageService.tryInsert('username', authorizedUserDto.username);
        await _secureStorageService.tryInsert('access_token', authorizedUserDto.token);


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

  Future<Result> logout() async {
    try {
      _secureStorageService.deleteValue('username');
      _secureStorageService.deleteValue('access_token');
    } catch(ex) {
      print('An exception came up during logout.');
      return Result(resultCode: FAILED_LOCAL_OPERATION_CODE, message: 'Failed to clean user credentials.');
    }
    return Result(resultCode: SUCCESSFUL_LOCAL_OPERATION_CODE, message: 'Successfully logged out.');
  }

  Future<Result> register(String email, String username, String password) async {
    var response = await _authService.register(email, username, password);
    var message = jsonDecode(response.body)['message'];

    if(response.statusCode == HttpStatus.created) {
      var registeredUserDto = RegisteredUserDto.fromJson(
          jsonDecode(response.body)
      );
      await _secureStorageService.tryInsert(
          'username', registeredUserDto.token);
      await _secureStorageService.tryInsert(
          'access_token', registeredUserDto.token);

      return DataResult(
        resultCode: response.statusCode,
        message: 'Operation successful',
        data: registeredUserDto,
      );
    } else {
      return Result(
          resultCode: response.statusCode,
          message: message
      );
    }
  }

  Future<String?> findStoredToken() async {
    return await _secureStorageService.getValueByKey("access_token");
  }


}