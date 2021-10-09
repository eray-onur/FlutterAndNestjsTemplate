import 'dart:convert';
import 'dart:io';
import 'package:flutter_template/data/models/results/data_result.dart';
import 'package:flutter_template/data/models/results/result.dart';
import 'package:http/http.dart' as http;

class AuthProvider {

  Future<Result> login(String username, String password) async {
    try {
      var response = await http.post(
          Uri.http("10.0.2.2:3000", "/auth/login"),
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
    return Result(resultCode: HttpStatus.noContent, message: "N/A");
  }

  Future<Result> register(String email, String username, String password) async {
    try {
      var response = await http.post(
          Uri.http("10.0.2.2:3000", "/auth/register"),
          body: jsonEncode({
            "email": email,
            "username": username,
            "password": password,
          }),
          headers: {
            HttpHeaders.contentTypeHeader: 'application/json'
          }
      );
      print('RESULT:');
      print(response.body);
      if(response.statusCode < 400)
        return DataResult(
            resultCode: response.statusCode,
            data: response.body, message: "Returned new user's info."
        );
      else throw Exception(response.body);
    } catch(ex) {
      print(ex);
    }
    return Result(resultCode: HttpStatus.noContent, message: "N/A");
  }


}