import 'package:bloc/bloc.dart';
import 'package:flutter_template/data/blocs/login/auth_states.dart';
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
    try {
      if(event is SignInEvent) {
        print('Authentication process has been started');
        yield UserAuthenticatingState();

        var authorizedUser = await _authRepository
            .login(event.userName, event.password);

        if (authorizedUser != null) {
          yield UserAuthenticatedState(
              username: authorizedUser.username,
              token: authorizedUser.token
          );
        } else
          throw Error();
      }
      else if(event is SignOutEvent) {

      }
    } catch (_) {
      yield UserFailedToBeAuthenticatedState();
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