import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_template/data/blocs/login/login_bloc.dart';
import 'package:flutter_template/data/blocs/login/login_events.dart';
import 'package:flutter_template/data/blocs/login/login_states.dart';
import 'package:flutter_template/data/repositories/auth_repository.dart';

class LoginScreen extends StatefulWidget {
  static const route = '/login';
  const LoginScreen({Key? key}) : super(key: key);

  @override
  _LoginScreenState createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  late LoginBloc loginBloc;
  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  late String userName;
  late String password;

  @override
  void initState() {
    super.initState();
    _usernameController.addListener(_setUserName);
    _passwordController.addListener(_setPassword);
  }

  @override
  Widget build(BuildContext context) {
    return RepositoryProvider(
      create: (context) => AuthRepository(),
      child: BlocProvider(
        create: (context) => LoginBloc(authRepository: context.read<AuthRepository>()),
        child: BlocConsumer<LoginBloc, LoginState>(
          listener: (context, state) => _authenticate(context,state),
          builder: (context, state) {
            loginBloc = BlocProvider.of<LoginBloc>(context);
            return SafeArea(
              child: Scaffold(
                  resizeToAvoidBottomInset: false,
                  body: Container(
                    constraints: BoxConstraints.expand(),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        _buildLoginHeader(context),
                        _buildLoginForm(context),
                        _buildLoginFooter(context)
                      ],
                    ),
                  )
              ),
            );
          },
        ),
      ),
    );
  }

  void _setUserName() {
    setState(() {
      userName = _usernameController.text;
    });
  }

  void _setPassword() {
    setState(() {
      password = _passwordController.text;
    });
  }

  Widget _buildLoginHeader(BuildContext context) {
    return Flexible(
        flex: 1,
        child: Text('Sign In', style: Theme.of(context).textTheme.headline6)
    );
  }

  Widget _buildLoginForm(BuildContext context) {
    return Flexible(
      flex: 2,
      child: SizedBox(
        width: 300,
        child: Card(
          elevation: 8.0,
          child: Stack(
            clipBehavior: Clip.none,
            children: [
              Column(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: [
                  Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: TextFormField(
                      textInputAction: TextInputAction.next,
                      controller: _usernameController,
                      keyboardType: TextInputType.name,
                      decoration: InputDecoration(
                          hintText: "Username"
                      ),
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.all(16.0),
                    child: TextFormField(
                      controller: _passwordController,
                      obscureText: true,
                      keyboardType: TextInputType.visiblePassword,
                      decoration: InputDecoration(
                          hintText: "Password"
                      ),
                    ),
                  ),
                ],
              ),
              Positioned(
                child: Container(
                  decoration: BoxDecoration(
                    shape: BoxShape.circle,
                    color: Theme.of(context).primaryColor,
                  ),
                  width: 48,
                  height: 48,
                  child: Icon(Icons.lock, color: Theme.of(context).primaryTextTheme.bodyText1!.color,),
                ),
                top: -15.0,
                left: -15.0,
              ),
            ]
          ),
        ),
      ),
    );
  }

  Widget _buildLoginFooter(BuildContext context) {
    return Flexible(
      flex: 1,
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
            SizedBox(
              width: 270,
              height: 50,
              child: _buildSubmitButton(context),
            ),

            TextButton(
              child: Text("Don't have an account? Create one!"),
              onPressed: (loginBloc.state is UserAuthenticatingState)
                  ? null
                  : () => _navigateToRegister(context),
            ),
        ],
      ),
    );
  }

  Widget _buildSubmitButton(BuildContext context) {
    return ElevatedButton(
      child: Stack(
        children: [
          Align(
            alignment: Alignment.centerLeft,
            child: Visibility(
              visible: (loginBloc.state is UserAuthenticatingState),
              child: CircularProgressIndicator(
                color: Colors.white,
                strokeWidth: 3,
              ),
            ),
          ),
          Align(
              alignment: Alignment.center,
              child: Text('Login')
          )
        ],
      ),
      onPressed: (loginBloc.state is UserAuthenticatingState)
          ? null
          : () => _startAuthentication(context),
    );
  }

  @override
  void dispose() {
    // TODO: implement dispose
    print('Login form controllers are being disposed.');
    _usernameController.dispose();
    _passwordController.dispose();
    super.dispose();
  }

  // Validates the input and triggers the authentication process.
  void _startAuthentication(BuildContext context) {
    var userName = _usernameController.value.text;
    var password = _passwordController.value.text;
    print(loginBloc.state.runtimeType);
    loginBloc.add(UserAuthenticationEvent(
        userName: userName,
        password: password
    ));
    print(loginBloc.state.runtimeType);
  }

  void _authenticate(BuildContext context, LoginState state) {
    if(state is UserAuthenticatedState) {
      Navigator.of(context).pushNamedAndRemoveUntil('/home', (Route<dynamic> route) => false);
    }
  }

  void _navigateToRegister(BuildContext context) {
    Navigator.of(context).pushNamed('/register');
  }
}
