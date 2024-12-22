
### **Git Add Commands** (To add files to staging area):

1. **`git add --all` or `git add -A`**: Add all files (new, modified, deleted).
2. **`git add .`**: Add all files in the current folder (recommended).
3. **`git add *`**: Add all files except deleted files.
4. **`git add <file>`**: Add a specific file (e.g., `git add test.txt`).
5. **`git add <folder>/<file>`**: Add a specific file in a folder (e.g., `git add folder1/test.txt`).

### **Git Remove Commands** (To remove files from staging area or repository):

1. **`git rm <file>`**: Remove a specific file (e.g., `git rm test.txt`).
2. **`git rm <file> -f`**: Force remove a file, even if it's staged.
3. **`git rm --cached <file>`**: Remove a file from the staging area but keep it in the working directory.
4. **`git rm <folder>`**: Remove a specific folder (e.g., `git rm folder1`).
5. **`git rm -r <folder>`**: Recursively remove a folder and its contents (e.g., `git rm -r folder1`).

---

### **Git Workflow**:

- **Local**: Working Directory → Stage → Local Repository
- **Remote**: The repository on GitHub or other Git servers.

### **Common Linux Commands (for Git and general use)**:

- **`clear`**: Clear the terminal screen.
- **`touch <file>`**: Create an empty file (e.g., `touch text.txt`).
- **`mkdir <folder>`**: Create a folder (e.g., `mkdir folder1`).
- **`rmdir <folder>`**: Remove an empty folder.
- **`pwd`**: Display the current working directory path.
- **`cd <folder>`**: Change to a directory (e.g., `cd folder1`).
- **`cd ../`**: Move back to the parent directory.
- **`nano <file>`**: Open or create a file in the Nano text editor (e.g., `nano text.txt`).
- **`cat <file>`**: Display the contents of a file (e.g., `cat text.txt`).
- **`cat > <file>`**: Edit or create a file (e.g., `cat > text.txt`), press `CTRL+D` to save and exit.

---

### **GitHub Vocabulary**:

- **Working Directory**: The project folder on your local machine. Files here need to be staged using `git add` before they can be committed.
- **Stage**: Temporary storage for changes before committing to the local repository.
- **Local Repository**: The local version of the project where committed changes are tracked. You can push these changes to the remote repository.
- **Remote Repository**: The version of the project hosted on a platform like GitHub.

### **Important Git Commands**:

- **`git clone <repo-url>`**: Clone an existing GitHub repository to your local machine.
- **`git status`**: Check the status of your working directory and staging area (if there are untracked, modified, or staged files).
- **`git commit -m "<message>"`**: Commit changes with a message (e.g., `git commit -m "Initial commit"`).
- **`git push -u origin <branch>`**: Push your changes to a remote repository (e.g., `git push -u origin main`).
- **`git pull`**: Fetch and merge changes from the remote repository to your local repository.
- **`git fetch`**: Fetch changes from the remote repository without merging them.

### **Other Useful Terms**:

- **Fork**: Create a personal copy of a repository, allowing you to make changes without affecting the original repository.
- **.gitignore**: A file that specifies which files or folders Git should ignore (e.g., `*.psd` to ignore Photoshop files).

---

### **Create a New Repository**:

1. **`git init`**: Initialize a new Git repository in the current directory.
2. **`git add .`**: Add all files to the staging area.
3. **`git config user.name "<name>"`**: Set your username (e.g., `git config user.name "msashoyeb"`).
4. **`git config user.email "<email>"`**: Set your email (e.g., `git config user.email "msashoyeb@gmail.com"`).
5. **`git commit -m "initial commit"`**: Commit changes with a message.
6. **`git remote add origin <repo-url>`**: Add a remote repository (e.g., `git remote add origin https://github.com/msashoyeb/my-repo.git`).
7. **`git push -u origin main`**: Push your local changes to the remote repository.