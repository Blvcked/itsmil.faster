#!/bin/bash

# Prompt user for commit hash
read -p "Enter the commit hash you want to cherry-pick: " commit_hash
if [ -z "$commit_hash" ]; then
    echo "Error: Commit hash missing."
    exit 1
fi

# Fetch changes from upstream
echo "Fetching changes from upstream..."
git fetch upstream
if [ $? -ne 0 ]; then
    echo "Failed to fetch changes from upstream."
    exit 1
fi

# Create and checkout new branch based on upstream/main
echo "Creating and checking out to new branch..."
git checkout -b "cherry-$commit_hash" upstream/main
if [ $? -ne 0 ]; then
    echo "Failed to checkout new branch."
    exit 1
fi

# Cherry-pick the commit
echo "Cherry-picking the commit..."
git cherry-pick $commit_hash
if [ $? -ne 0 ]; then
    echo "Cherry-pick failed. Please resolve conflicts and then continue."
    exit 1
fi

# Confirm before pushing
read -p "Are you sure you want to push the cherry-picked commit to upstream/main? (y/n) " -n 1 -r
echo    # Move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
    # Push to upstream main
    echo "Pushing to upstream main..."
    git push upstream "cherry-$commit_hash":main
    if [ $? -ne 0 ]; then
        echo "Failed to push to upstream main."
        exit 1
    fi
else
    echo "Push aborted by the user."
    exit 1
fi

# Back to origin/main
echo "Switching back to origin/main..."
git checkout main
if [ $? -ne 0 ]; then
    echo "Failed to checkout main."
    exit 1
fi

# Ask if user wants to delete the new branch
read -p "Do you want to delete the new branch 'cherry-$commit_hash'? (y/n) " -n 1 -r
echo    # Move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
    # Delete the temporary branch
    echo "Deleting the temporary branch..."
    git branch -D "cherry-$commit_hash"
    if [ $? -ne 0 ]; then
        echo "Failed to delete the temporary branch."
        exit 1
    fi
else
    echo "Temporary branch not deleted."
fi
