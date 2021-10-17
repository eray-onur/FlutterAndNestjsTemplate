class AuthState {}

// User is not authenticated.
class UserNotAuthenticatedState extends AuthState {}

// User is still being authenticated.
class UserAuthenticatingState extends AuthState {}

// User is authenticated to be a registered user.
class UserAuthenticatedState extends AuthState {
  String username;
  String token;

  UserAuthenticatedState({required this.username, required this.token});
}

// When service does not authenticate the user.
class UserFailedToBeAuthenticatedState extends AuthState {}

// User created an account successfully.
class UserNotRegisteredState extends AuthState {}

// User is still waiting for account creation.
class UserRegisteringState extends AuthState {}

// Service failed to create new account for user for any reason.
class UserFailedToRegisterState extends AuthState {}
