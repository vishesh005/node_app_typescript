import 'package:flutter_client_app/network/http_networking_client.dart';

abstract class NetworkingClient {

   Future<NetworkResponse> get(Uri uri, Map<String,String> requestHeaders);
   Future<NetworkResponse> post(Uri uri, Map<String, String> requestHeaders, Map<String,dynamic> requestBody);
   Future<NetworkResponse> delete(Uri uri, Map<String, String> requestHeaders, Map<String,dynamic> requestBody);
   Future<NetworkResponse> patch(Uri uri, Map<String, String> requestHeaders, Map<String,dynamic> requestBody);


   factory NetworkingClient({ClientType type = ClientType.http}) {
     switch(type){
       case ClientType.http:
         return HttpNetworkingClient();
       default:
         return HttpNetworkingClient();
     }
   }


}


abstract class NetworkResponse<Body> {

  int statusCode;
  Map<String,String> responseHeaders;
  Body responseBody;

  NetworkResponse(this.statusCode, this.responseHeaders, this.responseBody);

}

abstract class ResponseBodyConverter<Input> {

   NetworkResponse convert(Input response);

}

enum ClientType {
  http
}

abstract class ErrorParser {
   NetworkError getNetworkError(dynamic error);
}

class NetworkError {
  ErrorType errorType;
  String errorMessage;

  NetworkError(this.errorType, this.errorMessage);

}

enum ErrorType {
  unknown, socket, timeout
}