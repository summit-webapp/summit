# SUMMIT

Welcome to the Summit open-source repository! This repository contains the source code and assets for our awesome project. To get started, you'll need to fork and clone this repository to your local system. This README will guide you through the process.

## Forking the Repository

**Fork the Repository**: In the top right corner of the repository page, click the "Fork" button. This will create a copy of the repository in your GitHub account.

 GitHub will take a moment to create the fork. Once it's done, you'll be redirected to your forked repository.

## Cloning the Repository to Your Local System

Now that you have forked the repository, you'll need to clone it to your local machine so you can work on it.

## Cloning and Installing Theme Repository

Before you begin working on this project, ensure you clone and install the theme repository. This repository contains the core functionalities of the E-commerce Application, while cloning the theme repository focuses on the UI/UX aspect of the application.

Follow these steps to clone theme repository:
1. Open your web browser and go to [https://github.com/orgs/summit-webapp-themes/repositories](https://github.com/orgs/summit-webapp-themes/repositories).
2. Browse through the list of repositories and select the theme repository that corresponds to your project's requirements.
3. Click on the selected theme repository to access its page.
4. Create a fork of theme repository (In case you want to report an issue or request a change).
5. Copy the URL provided under the "Code" tab. It should look something like: `https://github.com/summit-webapp-themes/theme-repo.git`.
6. Now, return to your local machine where you've forked the Summit open-source repository.
7. Open a terminal or command prompt.
8. Navigate to the themes directory inside the summit folder. Use the `cd` command to change directories. For example: `cd themes`.
9.  Once you're inside the project directory, run the following command to clone the theme repository:

   ```shell
   git clone https://github.com/summit-webapp-themes/theme-repo.git
10. Navigate to the directory where you want to store the theme repository.
   ```
    cd theme-repo
11. Take checkout of main branch
    ```shell
    git checkout main
12. After checking out from main branch, you need to install the theme by running the following command.
     ```shell
     /bin/bash install-theme.sh
13. After following the above steps, navigate back to summit repository
    ```shell
    cd ../../
14. Install all the dependencies first. Enter this command to install the dependencies
    ```shell
    npm install
15. Now you're good to run the application. Run the following command
    ```shell
    npm run dev
