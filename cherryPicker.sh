#!/bin/bash

# Define color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Emoji definitions
CHECK_MARK="\xE2\x9C\x94"
CROSS_MARK="\xE2\x9D\x8C"
WARNING="\xE2\x9A\xA0"

# Prompt user for commit hash
echo -e "${YELLOW}Enter the commit hash you want to cherry-pick:${NC}"
read -p "> " commit_hash
if [ -z "$commit_hash" ]; then
    echo -e "${RED}${CROSS_MARK} Error: Commit hash missing.${NC}"
    exit 1
fi

# Fetch changes from upstream
echo -e "${YELLOW}${WARNING} Fetching changes from upstream...${NC}"
git fetch upstream
if [ $? -ne 0 ]; then
    echo -e "${RED}${CROSS_MARK} Failed to fetch changes from upstream.${NC}"
    exit 1
fi

# Create and checkout new branch based on upstream/main
echo -e "${YELLOW}${WARNING} Creating and checking out to new branch...${NC}"
git checkout -b "cherry-$commit_hash" upstream/main
if [ $? -ne 0 ]; then
    echo -e "${RED}${CROSS_MARK} Failed to checkout new branch.${NC}"
    exit 1
fi

# Cherry-pick the commit
echo -e "${YELLOW}${WARNING} Cherry-picking the commit...${NC}"
git cherry-pick $commit_hash
if [ $? -ne 0 ]; then
    echo -e "${RED}${CROSS_MARK} Cherry-pick failed. Please resolve conflicts and then continue.${NC}"
    exit 1
fi

# Confirm before pushing
echo -e "${YELLOW}Are you sure you want to push the cherry-picked commit to upstream/main? (y/n)${NC}"
read -n 1 -r
echo    # Move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
    # Push to upstream main
    echo -e "${YELLOW}${WARNING} Pushing to upstream main...${NC}"
    git push upstream "cherry-$commit_hash":main
    if [ $? -ne 0 ]; then
        echo -e "${RED}${CROSS_MARK} Failed to push to upstream main.${NC}"
        exit 1
    fi
    echo -e "${GREEN}${CHECK_MARK} Push successful!${NC}"
else
    echo -e "${RED}${CROSS_MARK} Push aborted by the user.${NC}"
    exit 1
fi

# Back to origin/main
echo -e "${YELLOW}${WARNING} Switching back to origin/main...${NC}"
git checkout main
if [ $? -ne 0 ]; then
    echo -e "${RED}${CROSS_MARK} Failed to checkout main.${NC}"
    exit 1
fi

# Ask if user wants to delete the new branch
echo -e "${YELLOW}Do you want to delete the new branch 'cherry-$commit_hash'? (y/n)${NC}"
read -n 1 -r
echo    # Move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
    # Delete the temporary branch
    echo -e "${YELLOW}${WARNING} Deleting the temporary branch...${NC}"
    git branch -D "cherry-$commit_hash"
    if [ $? -ne 0 ]; then
        echo -e "${RED}${CROSS_MARK} Failed to delete the temporary branch.${NC}"
        exit 1
    fi
    echo -e "${GREEN}${CHECK_MARK} Branch deleted!${NC}"
else
    echo -e "${GREEN}Temporary branch not deleted.${NC}"
fi