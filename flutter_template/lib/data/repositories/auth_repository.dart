import 'package:flutter_template/data/providers/auth_provider.dart';

class AuthRepository {

  AuthProvider authProvider = AuthProvider();

  Future<dynamic> login(String username, String password) async {
    return await this.authProvider.login(username, password);
  }

  Future<dynamic> register(String email, String username, String password) async {
    return await this.authProvider.register(email, username, password);
  }
}