class AuthorizedUserDto {
  final String username;
  final String token;

  const AuthorizedUserDto({
    required this.username,
    required this.token
  });

  factory AuthorizedUserDto.fromJson(dynamic json) {
    return AuthorizedUserDto(username: json['username'], token: json['token']);
  }

}