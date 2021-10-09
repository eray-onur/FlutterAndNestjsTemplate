class RegisterState {}

class UserNotRegisteredState extends RegisterState {}

class UserIsRegisteringState extends RegisterState {}

class UserRegisteredState extends RegisterState {
  String token;

  UserRegisteredState({required this.token});
}

class UserFailedToBeRegisteredState extends RegisterState {}