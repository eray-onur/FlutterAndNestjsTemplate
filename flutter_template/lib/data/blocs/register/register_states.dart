class RegisterState {}

class UserNotRegisteredState extends RegisterState {}

class UserIsRegisteringState extends RegisterState {}

class UserRegisteredState extends RegisterState {
  String bearer;
  DateTime? expiresAt;

  UserRegisteredState({required this.bearer, this.expiresAt});
}

class UserFailedToBeRegisteredState extends RegisterState {}