import * as vscode from "vscode";
import * as cp from "child_process";

function runCommand(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    cp.exec(command, (error, stdout) => {
      if (error) {
        reject(error);
      } else {
        resolve(stdout.trim());
      }
    });
  });
}

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.gitBrancher",
    async () => {
      // Read configuration settings
      const config = vscode.workspace.getConfiguration("gitBrancher");
      const mainBranch = config.get<string>("mainBranch") || "main";
      const remote = config.get<string>("remote") || "origin";

      // Get the current branch name
      const currentBranch = await runCommand("git branch --show-current");

      // Stash any unrelated but uncommitted changes in the current branch
      await runCommand("git stash");

      const newBranchName = await vscode.window.showInputBox({
        prompt: "Enter the new branch name:",
      });
      if (!newBranchName) {
        vscode.window.showErrorMessage("New branch name is required.");
        return;
      }

      const commitMessage = await vscode.window.showInputBox({
        prompt: "Enter commit message:",
      });
      if (!commitMessage) {
        vscode.window.showErrorMessage("Commit message is required.");
        return;
      }

      try {
        // Stash selected changes and switch to main branch
        await runCommand("git stash save --patch");
        await runCommand(`git checkout ${mainBranch}`);
        await runCommand(`git pull ${remote} ${mainBranch}`);
        await runCommand(`git checkout -b ${newBranchName}`);

        // Apply stashed changes
        await runCommand("git stash apply stash@{0}");

        // Commit and push
        await runCommand("git add .");
        await runCommand(`git commit -m "${commitMessage}"`);
        await runCommand(`git push ${remote} ${newBranchName}`);

        // Switch back to the original branch and apply the stash of unrelated but uncommitted changes
        await runCommand(`git checkout ${currentBranch}`);
        await runCommand("git stash apply");

        vscode.window.showInformationMessage(
          "Successfully created new branch and pushed changes."
        );
      } catch (error) {
        vscode.window.showErrorMessage(`An error occurred: ${error}`);
      }
    }
  );

  context.subscriptions.push(disposable);
}
