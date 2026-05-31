## Pull Options

- **Pull**: Get changes from remote and merge into your branch.

- **Squash**: Combine all incoming commits into one commit. (Rarely used for pull)

- **No Commit**: Apply changes but do not create a commit automatically.

- **No Fast Forward**: Always create a merge commit, even if not needed.

- **Fast Forward Only**: Only pull if it can merge cleanly (no extra commit).

- **Tags**: Also fetch Git tags.

- **Prune**: Remove deleted remote branches from your local list.

- **Auto Load PuTTY Key**: Automatically load SSH key (PuTTY/Plink).

- **Launch Rebase After Fetch**: Use rebase instead of merge (cleaner history, more advanced).

![[git_pull.png]]

## Apply Patch

If you modify a file and want to save the changes without using stash, you can create a patch.

Example:
I improved a file (data grid loader) in the code, but the Project Manager asked me to stop because the client hasn’t paid yet. I could save the changes using stash and switch to another project. However, stash is stored locally, and although I can use it across branches, it may be lost if my computer resets.

If I use a Git patch instead, I can avoid this problem. A patch allows me to save the changes as a `.diff` file. I can then apply this patch at any time, on any branch, or even share it with team members.

Options:
- Use **stash** → saves changes locally.
- Problem: If your system resets, stash may be lost.

Better option:
- Use **Git patch**

With patch:
- Save changes

![[git_apply_patch.png]]

![[git_apply_patch2.png]]
## Tag

A tag marks an important point in Git history.

Uses:
- Mark releases (v1.0, v2.1)
- Save stable versions
- Easy reference instead of long commit ID

In short: Tag helps you find important versions quickly.


#### Create and Push Tag

1. Create tag locally
2. Push tag to remote
3. Verify after push

![[git_create_tag.png|281]]

When pushing, must we check whether ‘Include Tags’ is selected?

![[git_push_tag.png]]
#### Delete Tag

1. Delete tag locally
2. Then delete tag from remote

Go to ‘Browse Refs’ and delete it locally.
![[git_delete_tag.png]]
After deleting locally, then delete the remote.
![[git_delete_tag2.png]]

![[git_delete_tag3.png]]

## Undo Merge

You can undo a merge using parent commits:
- Parent 1
- Parent 2

In tortoise git we have undo merge option, If we select Parent 1, then we can remove Y, Z, M then only keep Parent , vice versa.

In TortoiseGit, there is an ‘Undo Merge’ option. If we select ‘Parent 1’, we can remove Y, Z, and M and keep only the parent 2 Merge M'; vice versa for the other parent.

![[git_undo_merge.png]]

## Amend Last Commit

You can update your last commit (message or files) using amend.

