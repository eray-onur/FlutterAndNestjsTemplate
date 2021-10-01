import 'package:bloc/bloc.dart';
import 'package:flutter_template/data/blocs/login/login_states.dart';

import 'login_events.dart';

class LoginBloc extends Bloc<LoginEvent, LoginState> {

  LoginBloc() : super(LoginState());

  LoginState get initialState => UserNotAuthenticatedState();

  @override
  Stream<LoginState> mapEventToState(LoginEvent event) async* {
    yield initialState;
    try {
      if(event is UserAuthenticationEvent) {
        print('Authentication process has been started');
        yield UserAuthenticatingState();
        await Future.delayed(Duration(seconds: 6));
        yield UserAuthenticatedState(bearer: 'secret', expiresAt: DateTime.now());
      }
    } catch (_) {
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