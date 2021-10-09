import 'package:flutter_template/data/models/results/result.dart';

class DataResult extends Result {
  int resultCode;
  dynamic data;
  String message;

  DataResult({this.data, required this.resultCode, required this.message}) :
        super(resultCode: resultCode, message: message);

}