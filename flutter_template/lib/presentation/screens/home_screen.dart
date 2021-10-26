import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:flutter_template/data/blocs/auth/auth_bloc.dart';
import 'package:flutter_template/data/blocs/auth/auth_events.dart';
import 'package:flutter_template/data/blocs/auth/auth_states.dart';
import 'package:flutter_template/data/constants.dart';
import 'package:flutter_template/data/cubits/theme_cubit.dart';
import 'package:flutter_template/data/providers/base/authorization_client.dart';
import 'package:flutter_template/data/repositories/auth_repository.dart';
import 'package:flutter_template/presentation/screens/login_screen.dart';
import 'package:http/http.dart' as http;


class HomeScreen extends StatelessWidget {

  static const route = '/home';

  @override
  Widget build(BuildContext context) {
    return RepositoryProvider(
        create: (context) => AuthRepository(),
        child: BlocProvider(
            create: (context) => AuthBloc(authRepository: context.read<AuthRepository>()),
            child: BlocConsumer<AuthBloc, AuthState>(
              listener: (context, state) {
                if(state is UserNotAuthenticatedState) {
                  Navigator.of(context).pushNamedAndRemoveUntil(
                      LoginScreen.route, (Route<dynamic> route) => false);
                  }
                },
              builder: (context, state) => _pageRoot(context),
            )
        )
    );
  }

  Widget _pageRoot(BuildContext context) {
    return SafeArea(
      child: Scaffold(
        appBar: AppBar(
            title: Text('Home'),
            centerTitle: true
        ),
        body: Container(
          constraints: BoxConstraints.expand(),
          child: Column(
            children: [
              Text('This is the homepage.'),
              ElevatedButton(
                onPressed: (){
                  _logout(context);
                },
                child: Text('Logout'),
              ),
              ElevatedButton(
                child: Text('Send Dummy Data'),
                onPressed: () async {
                  var cli = AuthorizationClient();
                  final request = await cli.get(
                      Uri.http(LOCAL_TESTAPI_ENDPOINT, '/dummy/dummyGet')
                  );
                  print(request.body);
                },
              ),
              ElevatedButton(
                child: Text('Switch Theme'),
                onPressed: () {
                  context.read<ThemeCubit>().toggleTheme();
                },
              )
            ],
          ),
        ),
      ),
    );
  }

  _logout(BuildContext context) {
    BlocProvider.of<AuthBloc>(context).add(SignOutEvent());
  }
}
