import 'package:bloc/bloc.dart';
import 'package:flutter_template/data/blocs/auth/auth_states.dart';
import 'package:flutter_template/data/models/results/data_result.dart';
import 'package:flutter_template/data/repositories/auth_repository.dart';

import '../../constants.dart';
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
      var result = await _authRepository
          .login(event.userName, event.password);
      if (result is DataResult) {

        yield UserAuthenticatedState(
            username: result.data.username,
            token: result.data.token
        );
      } else {
        yield UserFailedToBeAuthenticatedState(reason: result.message);
      }
    }
    else if(event is SignOutEvent) {
      var result = await _authRepository.logout();
      if(result.resultCode == SUCCESSFUL_LOCAL_OPERATION_CODE) {
        yield UserNotAuthenticatedState();
      }
    }
    else if(event is SignUpEvent) {
      yield UserRegisteringState();

      var result = await _authRepository
          .register(event.email, event.userName, event.password);

      if(result is DataResult) {
        yield UserRegisteredState(token: result.data.token);
      } else {
        yield UserFailedToRegisterState(reason: result.message);
      }
    }
    else if(event is AutoSignInEvent) {
      String? foundToken = await _authRepository.findStoredToken();
      if(foundToken != null) {
        yield UserAuthenticatedState(username: '', token: foundToken);
      }
      else yield UserFailedToRegisterState();
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