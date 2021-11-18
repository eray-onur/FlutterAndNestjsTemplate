import 'package:bloc/bloc.dart';
import 'package:flutter_template/data/blocs/auth/auth_states.dart';
import 'package:flutter_template/data/models/results/data_result.dart';
import 'package:flutter_template/data/repositories/auth_repository.dart';

import '../../constants.dart';
import 'auth_events.dart';

class AuthBloc extends Bloc<AuthEvent, AuthState> {

  AuthState get initialState => UserNotAuthenticatedState();

  final AuthRepository authRepository;
  AuthBloc({required this.authRepository}) : super(AuthState()) {
    on<SignInEvent>(_onSignIn);
    on<SignOutEvent>(_onSignOut);
    on<SignUpEvent>(_onSignUp);
    on<AutoSignInEvent>(_onAutoSignIn);
  }

  @override
  void onChange(Change<AuthState> change) {
    super.onChange(change);
  }


  _onSignIn(SignInEvent event, Emitter<AuthState> emit) async {

    emit(UserAuthenticatingState());

    var result = await authRepository
        .login(event.userName, event.password);

    if (result is DataResult) {
      emit(
        UserAuthenticatedState(
            username: result.data.username,
            token: result.data.token
        ),
      );
    } else {
      emit(UserFailedToBeAuthenticatedState(reason: result.message));
    }
  }

  _onSignOut(SignOutEvent event, Emitter<AuthState> emit) async {
    var result = await authRepository.logout();

    if(result.resultCode == SUCCESSFUL_LOCAL_OPERATION_CODE) {
      emit(UserNotAuthenticatedState());
    }
  }

  _onSignUp(SignUpEvent event, Emitter<AuthState> emit) async {

    emit(UserRegisteringState());

    var result = await authRepository
        .register(event.email, event.userName, event.password);

    if(result is DataResult) {
      emit(UserRegisteredState(token: result.data.token));
    } else {
      emit(UserFailedToRegisterState(reason: result.message));
    }
  }

  _onAutoSignIn(AutoSignInEvent event, Emitter<AuthState> emit) async {
    String? foundToken = await authRepository.findStoredToken();

    if(foundToken != null) {
      emit(UserAuthenticatedState(username: '', token: foundToken));
    }
    else {
      emit(UserFailedToRegisterState());
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