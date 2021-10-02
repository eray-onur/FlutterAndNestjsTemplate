import 'dart:convert';
import 'dart:io';

import 'package:flutter_template/data/constants.dart';
import 'package:http/http.dart' as http;
class AuthProvider {

  Future<dynamic> login(String username, String password) async {
    var response = await http.post(
      Uri(path: "$API_ENDPOINT/authorize"),
      headers: {
        HttpHeaders.contentTypeHeader: 'application/json',
      },
      body: {
        "username": username,
        "password": password
      }
    );
    if(response.statusCode == 200)
      return response.body;

    return null;
  }

  Future<dynamic> register(String email, String username, String password) async {
    var response = await http.post(
      Uri.http("localhost:3000", "/auth/register"),
      body: jsonEncode({
        "email": email,
        "username": username,
        "password": password,
      }),
      headers: {
        HttpHeaders.contentTypeHeader: 'application/json'
      }
    );
    print(response.body);
    return response.statusCode;
  }

}