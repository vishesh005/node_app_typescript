import 'dart:async';
import 'dart:convert';
import 'dart:io';

import 'package:flutter_client_app/network/networking_client.dart';
import 'package:http/http.dart' as client;

class HttpNetworkingClient implements NetworkingClient {
  @override
  Future<NetworkResponse> get(
      Uri uri, Map<String, String> requestHeaders) async {
    try {
      final _response = await client.get(uri, headers: requestHeaders);
      return JSONResponseConverter().convert(_response);
    } catch (error) {
      throw HttpErrorParser().getNetworkError(error);
    }
  }

  @override
  Future<NetworkResponse> delete(Uri uri, Map<String, String> requestHeaders,
      Map<String, dynamic> requestBody) async {
    try {
      final _response =
          await client.delete(uri, headers: requestHeaders, body: requestBody);
      return JSONResponseConverter().convert(_response);
    } catch (error) {
      throw HttpErrorParser().getNetworkError(error);
    }
  }

  @override
  Future<NetworkResponse> patch(Uri uri, Map<String, String> requestHeaders,
      Map<String, dynamic> requestBody) async {
    try {
      final _response =
          await client.patch(uri, headers: requestHeaders, body: requestBody);
      return JSONResponseConverter().convert(_response);
    } catch (error) {
      throw HttpErrorParser().getNetworkError(error);
    }
  }

  @override
  Future<NetworkResponse> post(Uri uri, Map<String, String> requestHeaders,
      Map<String, dynamic> requestBody) async {
    try {
      final _response =
          await client.post(uri, headers: requestHeaders, body: requestBody);
      return JSONResponseConverter().convert(_response);
    } catch (error) {
      throw HttpErrorParser().getNetworkError(error);
    }
  }
}

class JSONResponseConverter extends ResponseBodyConverter<client.Response> {
  @override
  NetworkResponse convert(client.Response response) {
    final jsonBody = jsonDecode(response.body);
    return JSONResponse(response.statusCode, response.headers, jsonBody);
  }
}

class JSONResponse extends NetworkResponse<Map<String, dynamic>> {
  JSONResponse(int statusCode, Map<String, String> responseHeaders,
      Map<String, dynamic> responseBody)
      : super(statusCode, responseHeaders, responseBody);
}

class HttpErrorParser implements ErrorParser {
  @override
  NetworkError getNetworkError(error) {
     if(error is SocketException){
        return NetworkError(ErrorType.socket, error.message);
     }
     else if(error is TimeoutException){
       return NetworkError(ErrorType.timeout, error.message ?? "");
     }
     else{
       return NetworkError(ErrorType.unknown, error.toString());
     }
  }
}
