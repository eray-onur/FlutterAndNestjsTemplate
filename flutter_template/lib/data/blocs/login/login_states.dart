class LoginState {}

class UserNotAuthenticatedState extends LoginState {}

class UserAuthenticatingState extends LoginState {}

class UserAuthenticatedState extends LoginState {
  String username;
  String token;

  UserAuthenticatedState({required this.username, required this.token});
}

class UserFailedToBeAuthenticatedState extends LoginState {}

class UserNotFoundState extends LoginState {}