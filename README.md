# Journal App

## Introduction

Journal App is a web application designed to facilitate the upload and management of papers by authors. Built with Laravel, ReactJS, and InertiaJS, Journal App provides a seamless and user-friendly interface for authors to manage their submissions efficiently. It also allows the Editorial Board and Reviewers to manage their associated papers very easily.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies Used](#technologies-used)
- [Screenshots](#screenshots)
- [Contact](#contact)
- [Acknowledgements](#acknowledgements)

## Features

- Easy upload of papers by authors
- Secure authentication and authorization
- Real-time updates and notifications
- User-friendly interface with ReactJS and InertiaJS
- Efficient management of papers

## Requirements

- Laravel
- ReactJS
- InertiaJS
- Composer
- MySQL

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Asif-Iqbal-HSTU/JournalApp
    cd JournalApp
    ```

2. Install backend dependencies:
    ```bash
    composer install
    ```

3. Install frontend dependencies:
    ```bash
    npm install
    npm run dev
    ```

4. Set up environment variables:
    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

5. Configure the `.env` file with your database settings and other environment variables.

6. Run migrations and seed the database:
    ```bash
    php artisan migrate --seed
    ```

7. Start the development server:
    ```bash
    php artisan serve
    ```

## Usage

### Author Module

- **Login**: Teachers can log in securely to the platform.
- **Upload Papers**: Authors can easily upload their papers.
- **Manage Submissions**: Authors can view the status of their submission information.
- **Notifications**: Authors receive real-time notifications for updates.

### Editor Module

- **Submission Management**: Editors can send papers to Reviewers.
- **Take Decisions**: Editors can make decisions about the submissions.

- ### Reviewer Module

- **Submission Management**: Reviewers can provide important comments.

## Technologies Used

- **Backend**: Laravel
- **Frontend**: ReactJS, InertiaJS
- **Database**: MySQL
- **Styling**: Tailwind CSS
- **Authentication**: Laravel Breeze

## Screenshots

### Author Dashboard
![image](https://github.com/Asif-Iqbal-HSTU/JournalApp/assets/40653155/bd984cc0-6a97-47eb-9335-d97dc86898b5)

### Editor Dashboard
![image](https://github.com/Asif-Iqbal-HSTU/JournalApp/assets/40653155/0014a84e-ee55-4379-bd9f-365ba9639dfd)

### Editor Taking Decisions
![image](https://github.com/Asif-Iqbal-HSTU/JournalApp/assets/40653155/8cc2b8d2-11f6-4d25-9857-e83135dd85e8)



## Contact

For any inquiries or feedback, please contact us at:
- Email: asif.iqbal.hstu@gmail.com

## Acknowledgements

- Thanks to the development team for their dedication and hard work.
- Special thanks to the educators who provided valuable feedback during the development process.
