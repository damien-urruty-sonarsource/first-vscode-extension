// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');
const path = require('path');
const lsclient = require('vscode-languageclient');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

let client;

function serverOptions(context) {
	// The server is implemented in node
	const serverModule = context.asAbsolutePath(
		path.join('src', 'server', 'server.js')
	);
	// The debug options for the server
	// --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
	const debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };

	// If the extension is launched in debug mode then the debug server options are used
	// Otherwise the run options are used
	const opts = {
		run: { module: serverModule, transport: lsclient.TransportKind.ipc },
		debug: {
			module: serverModule,
			transport: lsclient.TransportKind.ipc,
			options: debugOptions
		}
	};
	return opts;
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "hello-world" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('hello-world.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		var _ = require('lodash');
		const capitalized = _.map(['world'], s => s.toUpperCase());
		vscode.window.showInformationMessage(`Hello World from ${capitalized}!`);
	});

	context.subscriptions.push(disposable);


	// Options to control the language client
	let clientOptions = {
		// Register the server for plain text documents
		documentSelector: [{ scheme: 'file', language: 'plaintext' }],
		synchronize: {
			// Notify the server about file changes to '.clientrc files contained in the workspace
			fileEvents: vscode.workspace.createFileSystemWatcher('**/.clientrc')
		}
	};

	// Create the language client and start the client.
	client = new lsclient.LanguageClient(
		'languageServerExample',
		'Language Server Hello World',
		serverOptions(context),
		clientOptions
	);

	// Start the client. This will also launch the server
	client.start();
}

function deactivate() {
	if (!client) {
		return undefined;
	}
	return client.stop();
}


module.exports = {
	activate,
	deactivate
}
