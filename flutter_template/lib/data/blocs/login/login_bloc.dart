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
        bool response = await _authRepository
            .login(event.userName, event.password);
        if(response)
          yield UserAuthenticatedState(bearer: 'secret', expiresAt: DateTime.now());
        else throw Error();
      }
    } catch (_) {
      print(_);
      yield UserFailedToBeAuthenticatedState();
    }
  }

  @override
  void onTransition(Transition<LoginEvent, LoginState> transition) {
    // TODO: implement onTransition
    super.onTransition(transition);
    print(transition);
  }

  @override
  Future<void> close() {
    return super.close();
  }

}