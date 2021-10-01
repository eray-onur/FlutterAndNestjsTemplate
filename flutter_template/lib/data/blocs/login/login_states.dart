class LoginState {}

class UserNotAuthenticatedState extends LoginState {}

class UserAuthenticatingState extends LoginState {}

class UserAuthenticatedState extends LoginState {
  String bearer;
  DateTime expiresAt;

  UserAuthenticatedState({required this.bearer, required this.expiresAt});
}

class UserFailedToBeAuthenticatedState extends LoginState {}

class UserNotFoundState extends LoginState {}