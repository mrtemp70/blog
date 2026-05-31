·         **Some git command:**

|   |   |
|---|---|
|**Command**|**Description**|
|git init|Initialize a new git repository in the current directory.|
|git clone <repository-url>|Clone a remote repository to your local machine.|
|git add <file>|Stage changes in a file for the next commit.|
|git commit -m "commit message"|Commit staged changes with a descriptive message.|
|||
|git status|Show the status of your working directory and staged changes.|
|git log|Display a log of commit history.|
|git diff|Show the differences between the working directory and the last commit.|
|git pull|Fetch and integrate changes from a remote repository into your branch.|
|git push <remote> <branch>|Push local changes to a remote repository.|
|git branch|List all branches in the repository.|
|git checkout <branch>|Switch to a different branch.|
|git merge <branch>|Merge changes from one branch into the current branch.|
|git remote -v|Display a list of remote repositories and their urls.|
|git fetch|Download objects and refs from a remote repository.|
|git reset --hard <commit>|Reset the working directory to a specific commit and discard changes.|
|git stash|Temporarily save changes that are not ready to be committed.|
|git tag <tag-name>|Create a new tag for a specific commit.|
|git config --global user.name "your name"|Set your name for commit authorship.|
|git config --global user.email "you@example.com"|Set your email for commit authorship.|

·         **Five git command to add git**

|   |   |
|---|---|
|**Command**|**Description**|
|git add --all or git add -a|Adds all changes, including new files, modifications, and deletions.|
|git add .|Adds all changes in the current directory (including subdirectories).|
|git add *|Adds all changes in the current directory, excluding deletions.|
|git add <filename>|Adds specific file <filename> to the staging area for the next commit.|
|git add <folder>/<filename>|Adds a specific file <filename> in <folder> to the staging area.|

·         **Four  type of git remove command:**

|   |   |
|---|---|
|**Command**|**Description**|
|git rm test.txt|Removes the file named test.txt from the working directory and stages the deletion for the next commit.|
|git rm test.txt -f|Forces the removal of test.txt even if it's modified and stages the deletion for the next commit.|
|git rm --cached test.txt|Removes test.txt from the index or the staging area but retains the file in the working directory.|
|git rm folder1|Removes the entire folder1 directory and its contents from the working directory and stages the deletion.|
|git rm -r folder1|Recursively removes the folder1 directory and its contents from the working directory, stages the deletion.|

·         **Some command for windows and linux CMD:**

|   |   |
|---|---|
|**Command**|**Description**|
|clear|Clears the terminal screen.|
|touch text.txt|Creates a new empty file named text.txt.|
|mkdir folder1|Creates a new directory named folder1.|
|rmdir folder1|Deletes an empty directory named folder1.|
|pwd|Displays the current working directory (current path).|
|cd folder1|Changes the current directory to folder1.|
|cd ../|Moves up one directory level from the current directory.|
|nano text.txt|Opens the text.txt file for editing. If the file doesn't exist, it creates a new one.|
|cat text.txt|Displays the contents of the text.txt file.|
|cat > text.txt|Creates or overwrites the text.txt file with the text you enter. Press Ctrl+D to finish.|

·         **Git vocabulary command:**

|   |   |
|---|---|
|**Term**|**Description**|
|Working Directory|The local project folder where you make changes. Files here can be staged for commit using git add.|
|Stage|An intermediate area where changes are prepared for commit. Files here can be committed using git commit.|
|Local Repository|The local version of the repository that tracks changes. Commits from the stage are saved here.|
|Git Clone|Command used to copy an existing GitHub repository to your local machine.|
|Git Status|Command to check if there are any changes in the working directory that are not yet committed.|
|Untrack|Refers to newly created files in the working directory that are not yet staged for commit.|
|Fork|A copy of a repository that allows you to make changes without affecting the original repository.|
|.gitignore|A file used to specify files or patterns that Git should ignore when checking for changes.|

·         **Merge in tortoise git:**

Ans: Switch to main > git sync (pull) >Switch another branch (where we need to merge) > select merge > select main from currenct branch    

·         **Conflict solve tortoise git:**

Ans: Select click file > Explore to > keep head or branch

·         **Revert specific commot in tortoise git:**

Ans : Select show log > select commit > Reset > Select last one hard reset