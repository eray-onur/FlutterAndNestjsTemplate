import 'package:bloc/bloc.dart';
import 'package:flutter_template/data/blocs/auth/auth_states.dart';
import 'package:flutter_template/data/repositories/auth_repository.dart';

import 'auth_events.dart';

class AuthBloc extends Bloc<AuthEvent, AuthState> {

  late AuthRepository _authRepository;

  AuthBloc({required AuthRepository authRepository}) :
        _authRepository = authRepository,
        super(AuthState());


  AuthState get initialState => UserNotAuthenticatedState();

  @override
  Stream<AuthState> mapEventToState(AuthEvent event) async* {
    yield initialState;

    if(event is SignInEvent) {
      print('Authentication process has been started');
      yield UserAuthenticatingState();

      var authorizedUser = await _authRepository
          .login(event.userName, event.password);

      if (authorizedUser != null) {
        print('AUTH');

        yield UserAuthenticatedState(
            username: authorizedUser.username,
            token: authorizedUser.token
        );
      } else {
        print('NOT AUTH');
        yield UserFailedToBeAuthenticatedState();
      }
    }
    else if(event is SignOutEvent) {
      await _authRepository.logout();
      yield UserNotAuthenticatedState();
    }
    else if(event is SignUpEvent) {
      var registeredUser = await _authRepository
          .register(event.email, event.userName, event.password);

      print(registeredUser?.username);

      if(registeredUser != null) {
        yield UserRegisteredState(token: registeredUser.token);
      } else {
        yield UserFailedToRegisterState();
      }
    }
    else if(event is AutoSignInEvent) {
      String? foundToken = await _authRepository.findStoredToken();
      if(foundToken != null) {
        // Validate via found token. Work in progress.
      }
    }

  }

  @override
  void onTransition(Transition<AuthEvent, AuthState> transition) {
    super.onTransition(transition);
    print(transition);
  }

  @override
  Future<void> close() {
    return super.close();
  }

}