import 'package:flutter_template/data/providers/secure_storage_provider.dart';
import 'package:http/http.dart' as http;

class AuthorizationClient extends http.BaseClient {

  var secureStorageProvider = SecureStorageProvider();

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