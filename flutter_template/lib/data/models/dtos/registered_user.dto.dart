class RegisteredUserDto {
  String username;
  String? token;

  RegisteredUserDto({
    required this.username,
    this.token
  });

  factory RegisteredUserDto.fromJson(dynamic json) {
    return RegisteredUserDto(
        username: json['username'],
        token: json['token']
    );
  }
}