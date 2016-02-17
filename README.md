# REPLACE_PROJECT_NAME

> REPLACE_TODO_DESCRIPTION

---------------------------------------
----- REMOVE THIS AFTER USE -----------
---------------------------------------

# TODO HERE

## Replace README vars

To use this commands first replace this all occurences of bellow strings. Use Alt + F3 to make this easier:

- `__MY-CLI-TOOL__`               // example: _get-images_
- `__GITHUB_USER__`               // example: _azukiapp_
- `__PROJECT_DESCRIPTION__`       // example: _Cli tool to download images_
- `__BIN_DEFAULT_DESCRIPTION__`   // example: _Download images for me_
- `__THE_AUTHOR__`                // example: _saitodisse@gmail.com_

## Unzip and initialize git

```sh
wget https://github.com/azukiapp/azk-cli-boilerplate/archive/master.zip
unzip master.zip
mv azk-cli-boilerplate-master __MY-CLI-TOOL__
rm master.zip
cd __MY-CLI-TOOL__
git init
git add . -A
git commit -m"[Project] Initial version from boilerplate"

```

## Replaces in files/code

#### Replacing string in code

- Execute this on your new project folder:

```sh
# replace main bin filename
find . -name 'REPLACE_PROJECT_NAME.js' -type f -exec bash -c 'mv "$1" "${1/REPLACE_PROJECT_NAME.js/__MY-CLI-TOOL__.js}"' -- {} \;
git add . -A

# replace other strings inside files
find . -type f -not -path "./node_modules/*" -not -path "./.git/*" -not -path "./lib/*" -exec sed -i 's/REPLACE_PROJECT_GITHUB_URI/https:\/\/github.com\/__GITHUB_USER__\/__MY-CLI-TOOL__/g' {} +
find . -type f -not -path "./node_modules/*" -not -path "./.git/*" -not -path "./lib/*" -exec sed -i 's/REPLACE_PROJECT_NAME/__MY-CLI-TOOL__/g' {} +
find . -type f -not -path "./node_modules/*" -not -path "./.git/*" -not -path "./lib/*" -exec sed -i 's/REPLACE_TODO_DESCRIPTION/__PROJECT_DESCRIPTION__/g' {} +
find . -type f -not -path "./node_modules/*" -not -path "./.git/*" -not -path "./lib/*" -exec sed -i 's/REPLACE_TODO_BIN_DESCRIPTION/__BIN_DEFAULT_DESCRIPTION__/g' {} +
find . -type f -not -path "./node_modules/*" -not -path "./.git/*" -not -path "./lib/*" -exec sed -i 's/REPLACE_TODO_AUTHOR/__THE_AUTHOR__/g' {} +
```

- Search all other `TODO` in code and replace with correct values
- Update `CHANGELOG`.md
- Update `LICENSE` file

## Check if its still working

```sh
npm install
npm test
node ./bin/__MY-CLI-TOOL__.js -h

```

## Github

Create `__MY-CLI-TOOL__` on Github and include remote

```sh
git remote add origin git@github.com:__GITHUB_USER__/__MY-CLI-TOOL__.git
git push origin master -u

```

- Now you can **delete** this section from README ;)

---------------------------------------
----- (END) REMOVE THIS AFTER USE -----
---------------------------------------

### Install

```sh
npm install REPLACE_PROJECT_NAME -g

```

### Run

```sh
REPLACE_PROJECT_NAME             # REPLACE_TODO_DESCRIPTION

```

### Test and run locally

```sh
npm install
npm test
node ./bin/REPLACE_PROJECT_NAME.js -h

```

