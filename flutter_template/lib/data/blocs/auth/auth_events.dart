abstract class AuthEvent {}

// Login
class SignInEvent extends AuthEvent {
  String userName;
  String password;

  SignInEvent({required this.userName, required this.password});
}

class AutoSignInEvent extends AuthEvent {}

//Logout
class SignOutEvent extends AuthEvent {}

// Register
class SignUpEvent extends AuthEvent {
  String email;
  String userName;
  String password;

  SignUpEvent({required this.email, required this.userName, required this.password});
}