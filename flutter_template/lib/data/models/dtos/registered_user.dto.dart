class RegisteredUserDto {
  final String username;
  final String token;

  const RegisteredUserDto({
    required this.username,
    required this.token
  });

  factory RegisteredUserDto.fromJson(dynamic json) {
    return RegisteredUserDto(
        username: json['username'],
        token: json['token']
    );
  }
}