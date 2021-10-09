class AuthorizedUserDto {
  final String username;
  final String token;

  const AuthorizedUserDto({
    required this.username,
    required this.token
  });
}