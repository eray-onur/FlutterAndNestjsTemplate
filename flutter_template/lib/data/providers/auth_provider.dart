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

  Future<Result> login(String username, String password) async {
    late http.Response response;
    try {
      response = await http.post(
          Uri.http(LOCAL_TESTAPI_ENDPOINT, "/auth/login"),
          headers: {
            HttpHeaders.contentTypeHeader: 'application/json',
          },
          body: jsonEncode({
            "username": username,
            "password": password
          })
      );
      if(response.statusCode < 400)
        return DataResult(
            resultCode: response.statusCode,
            data: response.body, message: 'Returned data'
        );
      else throw Exception(response);
    } catch(err) {
      print(err);
    }
    return Result(resultCode: response.statusCode, message: response.body);
  }

  Future<Result> register(String email, String username, String password) async {
    late http.Response response;
    try {
      response = await http.post(
          Uri.http(LOCAL_TESTAPI_ENDPOINT, "/auth/register"),
          body: jsonEncode({
            "email": email,
            "username": username,
            "password": password,
          }),
          headers: {
            HttpHeaders.contentTypeHeader: 'application/json'
          }
      );
      if(response.statusCode < 400) {
        return DataResult(
            resultCode: response.statusCode,
            data: response.body, message: "Returned new user's info."
        );
      }

      else throw Exception(response.body);
    } catch(ex) {
      print(ex);
    }
    return Result(resultCode: response.statusCode, message: response.body);
  }
}