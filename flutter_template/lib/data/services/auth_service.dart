import 'dart:async';
import 'dart:convert';
import 'dart:io';
import 'package:flutter_template/data/constants.dart';
import 'package:http/http.dart' as http;

class AuthService {

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
      ).timeout(Duration(seconds: MAX_TIMEOUT_DURATION));

      return Future.value(response);

    } on TimeoutException catch(_) {
      return http.Response(jsonEncode({'message': 'Server does not respond.'}), 408);
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
      ).timeout(Duration(seconds: MAX_TIMEOUT_DURATION));

      return Future.value(response);
    }
    on TimeoutException catch(_) {
      return http.Response(jsonEncode({'message': 'Server does not respond.'}), 408);
    }
  }
}