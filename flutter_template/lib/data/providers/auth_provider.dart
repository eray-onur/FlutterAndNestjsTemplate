import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'package:flutter_template/data/constants.dart';
import 'package:flutter_template/data/models/results/data_result.dart';
import 'package:flutter_template/data/models/results/result.dart';
import 'package:http/http.dart' as http;

class AuthProvider {

  Future<Result> validateToken(String token) async {
    late http.Response response;
    try {
      response = await http.post(
        Uri.http("10.0.2.2:3000", "/dummy/dummyGet")
      );
    } catch(ex) {
      print(ex.runtimeType);
    }
    return Result(resultCode: response.statusCode, message: response.body);
  }

  Future<http.Response> login(String username, String password) async {
    try {
      http.Response response = await http.post(
          Uri.http(LOCAL_TESTAPI_ENDPOINT, "/auth/login"),
          headers: {
            HttpHeaders.contentTypeHeader: 'application/json',
          },
          body: jsonEncode({
            "username": username,
            "password": password
          })
      ).timeout(Duration(seconds: 12));

      return Future.value(response);

    } on TimeoutException catch(ex) {
      print('EXCEPTION');
      print(ex);
      return http.Response('Timeout exception', 500);
    }
  }

  Future<http.Response> register(String email, String username, String password) async {
    try {
      http.Response response = await http.post(
          Uri.http(LOCAL_TESTAPI_ENDPOINT, "/auth/register"),
          body: jsonEncode({
            "email": email,
            "username": username,
            "password": password,
          }),
          headers: {
            HttpHeaders.contentTypeHeader: 'application/json'
          }
      ).timeout(Duration(seconds: 12));

      return Future.value(response);
    }
    on TimeoutException catch(ex) {
      print('EXCEPTION');
      print(ex);
      return http.Response('Timeout exception', 500);
    }
  }
}