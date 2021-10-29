import 'package:flutter/services.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';

class SecureStorageProvider {

  late FlutterSecureStorage _storage;

  SecureStorageProvider() {
    _storage = FlutterSecureStorage();
  }

  Future<Map<String, String>> getValues() async {
    return await _storage.readAll();
  }

  Future<String?> getValueByKey(String key) async {
     return await _storage.read(key: key);
  }

  Future tryInsert(String key, dynamic value) async {
    try {
      bool exists = await _storage.containsKey(key: key);
      if(exists) {
        await _storage.delete(key: key);
      }
      return await _storage.write(key: key, value: value);
    } catch(ex) {
      if(ex is PlatformException) {
        print('Current platform is not supported.');
      }
    }
  }

  Future deleteValue(String key) async {
    bool hasKey = await _storage.containsKey(key: key);
    if(hasKey) {
      return await _storage.delete(key: key);
    }
  }

}