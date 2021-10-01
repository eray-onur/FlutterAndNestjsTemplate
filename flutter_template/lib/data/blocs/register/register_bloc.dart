import 'package:bloc/bloc.dart';
import 'package:flutter_template/data/blocs/register/register_events.dart';
import 'package:flutter_template/data/blocs/register/register_states.dart';
import 'package:flutter_template/data/repositories/auth_repository.dart';

class RegisterBloc extends Bloc<RegisterEvent, RegisterState> {

  late AuthRepository _authRepository;

  RegisterBloc({required AuthRepository authRepository}) :
        _authRepository = authRepository,
        super(RegisterState());

  RegisterState get initialState => UserNotRegisteredState();

  @override
  void onTransition(Transition<RegisterEvent, RegisterState> transition) {
    // TODO: implement onTransition
    super.onTransition(transition);
    print(transition);
  }

  @override
  Stream<RegisterState> mapEventToState(RegisterEvent event) async* {
    yield initialState;
    try {
      if(event is UserRegistrationEvent) {
        print('Authentication process has been started');
        yield UserIsRegisteringState();
        await _authRepository.register(event.email, event.userName, event.password);
        yield UserRegisteredState(bearer: 'anan', expiresAt: DateTime.now());
    }
    } catch (_) {
    yield UserFailedToBeRegisteredState();
    }
  }

}