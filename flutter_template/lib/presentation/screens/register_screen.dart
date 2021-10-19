import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_template/data/blocs/auth/auth_bloc.dart';
import 'package:flutter_template/data/blocs/auth/auth_events.dart';
import 'package:flutter_template/data/blocs/auth/auth_states.dart';
import 'package:flutter_template/data/repositories/auth_repository.dart';

class RegisterScreen extends StatefulWidget {
  static const route = '/register';
  const RegisterScreen({Key? key}) : super(key: key);

  @override
  _RegisterScreenState createState() => _RegisterScreenState();
}

class _RegisterScreenState extends State<RegisterScreen> {
  late AuthRepository authRepository;
  late AuthBloc registerBloc;
  final TextEditingController _usernameController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();

  late String userName;
  late String email;
  late String password;

  @override
  void initState() {
    super.initState();
    _emailController.addListener(_setEmail);
    _usernameController.addListener(_setUserName);
    _passwordController.addListener(_setPassword);
  }

  @override
  Widget build(BuildContext context) {
    return RepositoryProvider(
      create: (context) => AuthRepository(),
      child: BlocProvider(
        create: (context) => AuthBloc(authRepository: context.read<AuthRepository>()),
        child: BlocConsumer<AuthBloc, AuthState>(
          listener: (context, state) {
            if(state is UserRegisteredState) {
              Navigator.of(context).pushNamedAndRemoveUntil('/home', (Route<dynamic> route) => false);
              print('Token is: ');
              print(state.token);
            }
          },
          builder: (context, state) {
            registerBloc = BlocProvider.of<AuthBloc>(context);
            return SafeArea(
              child: Scaffold(
                  resizeToAvoidBottomInset: false,
                  body: Container(
                    constraints: BoxConstraints.expand(),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                      crossAxisAlignment: CrossAxisAlignment.center,
                      children: [
                        _buildRegisterHeader(context),
                        _buildRegisterForm(context),
                        _buildRegisterFooter(context)
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

  void _setEmail() {
    setState(() {
      email = _emailController.text;
    });
  }

  Widget _buildRegisterHeader(BuildContext context) {
    return Flexible(
        flex: 1,
        child: Text('Sign Up', style: Theme.of(context).textTheme.headline6)
    );
  }

  Widget _buildRegisterForm(BuildContext context) {
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
                        controller: _emailController,
                        keyboardType: TextInputType.emailAddress,
                        decoration: InputDecoration(
                            hintText: "Email Address"
                        ),
                      ),
                    ),
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

  Widget _buildRegisterFooter(BuildContext context) {
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
            child: Text("Already have an account? Just sign in!"),
            onPressed: (registerBloc.state is UserRegisteringState)
                ? null
                : () => _navigateToLogin(context),
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
              visible: (registerBloc.state is UserRegisteringState),
              child: CircularProgressIndicator(
                color: Colors.white,
                strokeWidth: 3,
              ),
            ),
          ),
          Align(
              alignment: Alignment.center,
              child: Text('Register')
          )
        ],
      ),
      onPressed: (registerBloc.state is UserRegisteringState)
          ? null
          : () => _startRegistration(context),
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
  void _startRegistration(BuildContext context) {
    var userName = _usernameController.value.text;
    var password = _passwordController.value.text;
    registerBloc.add(
        SignUpEvent (
        email: email,
        userName: userName,
        password: password
      )
    );
  }

  void _navigateToLogin(BuildContext context) {
    Navigator.of(context).pushNamed('/auth');
  }
}
