import 'package:bloc/bloc.dart';
import 'package:flutter_template/data/blocs/login/login_states.dart';
import 'package:flutter_template/data/repositories/auth_repository.dart';

import 'login_events.dart';

class LoginBloc extends Bloc<LoginEvent, LoginState> {

  late AuthRepository _authRepository;

  LoginBloc({required AuthRepository authRepository}) :
        _authRepository = authRepository,
        super(LoginState());


  LoginState get initialState => UserNotAuthenticatedState();

  @override
  Stream<LoginState> mapEventToState(LoginEvent event) async* {
    yield initialState;
    try {
      if(event is UserAuthenticationEvent) {
        print('Authentication process has been started');
        yield UserAuthenticatingState();

        var authorizedUser = await _authRepository
            .login(event.userName, event.password);

        if(authorizedUser != null) {
          yield UserAuthenticatedState(
              username: authorizedUser.username,
              token: authorizedUser.token
          );
        } else throw Error();

      }
    } catch (_) {
      yield UserFailedToBeAuthenticatedState();
    }
  }

  @override
  void onTransition(Transition<LoginEvent, LoginState> transition) {
    super.onTransition(transition);
    print(transition);
  }

  @override
  Future<void> close() {
    return super.close();
  }

}