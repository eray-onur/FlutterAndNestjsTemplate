import 'dart:convert';

import 'package:crypto/crypto.dart';

class HashHelper {
  static String hashPassword(String passwordText) {
    List<int> pwBytes = utf8.encode(passwordText);
    Digest pwDigest = sha256.convert(pwBytes);
    return pwDigest.bytes
        .map((b) => b.toRadixString(16).padLeft(2, '0'))
        .join();
  }
}