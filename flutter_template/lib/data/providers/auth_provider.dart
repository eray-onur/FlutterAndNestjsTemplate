import 'package:flutter_template/data/constants.dart';
import 'package:http/http.dart' as http;
class AuthProvider {

  Future<dynamic> login(String username, String password) async {
    var response = await http.post(
      Uri(path: "$API_ENDPOINT/authorize"),
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
      Uri(path: "$API_ENDPOINT/register"),
      body: {
        "email": email,
        "username": username,
        "password": password,
      }
    );
    return response.statusCode;
  }

}