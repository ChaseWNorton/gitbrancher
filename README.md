# GitFlowline: Automate Your Git Branching and Refactoring

## Description

GitFlowline streamlines your Git workflow by automating the process of stashing selected changes, creating a new branch from the mainline, and committing & pushing the changes to the remote repository—all with a single command.

## Features

- **Selective Stashing**: Pick the lines or blocks of code you want to refactor, right from within VS Code.
- **Automated Branching**: Create a new branch based on your mainline branch with a single command.
- **Quick Push**: Automatically commit your stashed changes and push them to your remote repository.
- **Configurable**: Customize your 'main' branch and 'origin' remote settings from within the VS Code settings pane.

## Installation

1. Open **Visual Studio Code**
2. Go to **Extensions** or press `Ctrl+Shift+X`
3. Search for `GitFlowline`
4. Click **Install**

## How to Use

1. Select the lines or blocks of code you want to stash.
2. Open the command palette `Ctrl+Shift+P` and execute the `GitFlowline: Create Refactor Branch` command.
3. Follow the on-screen prompts to enter a new branch name and a commit message.
4. Your selected changes will be committed to the new branch and pushed to your remote repository, all without disrupting your existing work.

## Configuration

To change the default settings, go to `Settings > Extensions > GitFlowline`:

- `gitRefactor.mainBranch`: Set your mainline branch (default is "main").
- `gitRefactor.remote`: Set your remote repository (default is "origin").

## Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License
