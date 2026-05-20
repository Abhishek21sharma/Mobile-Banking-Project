import 'package:flutter/material.dart';

void main() {
  runApp(const BankingApp());
}

class BankingApp extends StatelessWidget {
  const BankingApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'BanCorp Mobile Banking',
      theme: ThemeData(
        primarySwatch: Colors.indigo,
        useMaterial3: true,
      ),
      home: const LoginScreen(),
    );
  }
}

// --- MOCK DATA SERVICE ---
class DataService {
  static final List<Map<String, dynamic>> accounts = [
    {'id': '1', 'name': 'Current Account', 'balance': 2450.50, 'acct_num': '12345678'},
    {'id': '2', 'name': 'Savings Pot', 'balance': 10500.00, 'acct_num': '87654321'},
  ];

  static bool verifyPin(String pin) {
    // "1234" is the secret test PIN
    return pin == '1234';
  }
}

// --- SCREENS ---

class LoginScreen extends StatefulWidget {
  const LoginScreen({super.key});

  @override
  State<LoginScreen> createState() => _LoginScreenState();
}

class _LoginScreenState extends State<LoginScreen> {
  final TextEditingController _pinController = TextEditingController();
  String? _errorMessage;

  void _login() {
    if (DataService.verifyPin(_pinController.text)) {
      Navigator.of(context).pushReplacement(
        MaterialPageRoute(builder: (context) => const DashboardScreen()),
      );
    } else {
      setState(() {
        _errorMessage = "Invalid PIN. Try 1234.";
      });
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(32.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              const Icon(Icons.account_balance_wallet, size: 64, color: Colors.indigo),
              const SizedBox(height: 24),
              Text('Welcome Back', style: Theme.of(context).textTheme.headlineMedium),
              const SizedBox(height: 32),
              TextField(
                controller: _pinController,
                obscureText: true,
                keyboardType: TextInputType.number,
                maxLength: 4,
                decoration: InputDecoration(
                  labelText: 'Enter PIN',
                  errorText: _errorMessage,
                  border: const OutlineInputBorder(),
                ),
              ),
              const SizedBox(height: 16),
              // INTENTIONAL FLAW: No Key or Semantics added here. 
              // Candidate must add them.
              ElevatedButton(
                onPressed: _login,
                style: ElevatedButton.styleFrom(
                  minimumSize: const Size(double.infinity, 48),
                ),
                child: const Text('Log In'),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class DashboardScreen extends StatelessWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('My Accounts'),
        actions: [
          IconButton(
            icon: const Icon(Icons.logout),
            onPressed: () => Navigator.of(context).pushReplacement(
              MaterialPageRoute(builder: (context) => const LoginScreen()),
            ),
          )
        ],
      ),
      body: ListView.builder(
        padding: const EdgeInsets.all(16),
        itemCount: DataService.accounts.length,
        itemBuilder: (context, index) {
          final acct = DataService.accounts[index];
          return Card(
            margin: const EdgeInsets.only(bottom: 16),
            // INTENTIONAL FLAW: List items are hard to select by specific text
            // without a Key or Semantics index.
            child: ListTile(
              contentPadding: const EdgeInsets.all(16),
              title: Text(acct['name'], style: const TextStyle(fontWeight: FontWeight.bold)),
              subtitle: Text('**** ${acct['acct_num'].toString().substring(4)}'),
              trailing: Text(
                '£${acct['balance'].toStringAsFixed(2)}',
                style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.green),
              ),
            ),
          );
        },
      ),
      floatingActionButton: FloatingActionButton.extended(
        onPressed: () {
          // Placeholder for Payee flow if they want to extend, 
          // but not strictly required for the "Smoke" test.
          ScaffoldMessenger.of(context).showSnackBar(
            const SnackBar(content: Text('Payee feature coming soon!')),
          );
        },
        label: const Text('Transfer'),
        icon: const Icon(Icons.swap_horiz),
      ),
    );
  }
}