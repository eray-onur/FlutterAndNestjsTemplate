abstract class LoginEvent {}

class UserAuthenticationEvent extends LoginEvent {
  String userName;
  String password;

  UserAuthenticationEvent({required this.userName, required this.password});
}