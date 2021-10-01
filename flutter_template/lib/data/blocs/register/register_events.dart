abstract class RegisterEvent {}

class UserRegistrationEvent extends RegisterEvent {
  String email;
  String userName;
  String password;

  UserRegistrationEvent({required this.email, required this.userName, required this.password});
}