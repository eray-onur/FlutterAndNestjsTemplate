import 'package:http/http.dart' as http;

import '../secure_storage_service.dart';

class AuthorizationClient extends http.BaseClient {

  var secureStorageProvider = SecureStorageService();

  @override
  Future<http.StreamedResponse> send(http.BaseRequest request) async {

    request.headers.putIfAbsent('Content-Type', () => 'application/json');

    var accessToken = await secureStorageProvider.getValueByKey('access_token');
    if(accessToken != null || accessToken != '') {
      request.headers.putIfAbsent('Authorization', () => 'Bearer $accessToken');
    }
    return request.send();
  }

}