## Introduction

This is a simple photo viewer app built using the Django REST framework and React.js

## Requirements
* Python3
* Pipenv (`pip install pipenv` if you do not have)


## Build and Start the Application
1. Clone the project to your machine: `git clone https://github.com/admarko/PhotoViewer`
2. Navigate into the directory: `cd PhotoViewer`
3. Source the virtual environment: `pipenv shell` (You will need to have `pipenv` installed by this point)
4. Install the dependencies: `pipenv install`
5. Run the migrations: `python manage.py migrate`
6. Start up the server: `python manage.py runserver`

At this point, you can navigate to http://localhost:8000/api/photos to see the API that the frontend will access.

7. Keeping that terminal tab running, open a new terminal tab and go into the `frontend/` directory: `cd [path_to_dir]/frontend/`
8. Install the dependencies: `npm install`
9. Lastly, start the app: `npm start`

In your web browser, go to http://localhost:3000 and enjoy! :)

## Built With:
This project was built using:
* [TypeScript](https://www.typescriptlang.org/) with [React](https://reactjs.org), and
* [Python](https://www.python.org/) with [Django](http://djangoproject.org/)

Along with some other tools:

- [pre-commit](https://pre-commit.com/) hooks (for python: [black](https://github.com/psf/black), [flake8](https://flake8.pycqa.org/en/latest/), and [isort](https://github.com/asottile/seed-isort-config))
- [Sider](https://sider.review/dashboard) (online code linter that integrats with github for javascript and css: [eslint](https://eslint.org/) and [stylelint](https://stylelint.io/))
- [Refined GitHub](https://github.com/sindresorhus/refined-github) (Chrome extension for additional git shortcuts)
- [React Photo Gallery](https://neptunian.github.io/react-photo-gallery/#) to handle the grid-like responsive layout. This tool uses the [Knuth and Plass line breaking algorithm](http://blog.vjeux.com/2014/image/google-plus-layout-find-best-breaks.html) to best determine how the photos should be laid out.

## Other:

This project consists of 1 management command used to reset the DB if you want to replace your own photos using this gallery. To do so, you just need to:
1. Add a .csv of the urls of the images into the `backend/` directory. And then
2. (From inside the virtual environment) run `python manage.py reset_db [your_csv_filename.csv]`

Note: This will clear the current DB and replace it with your own. The script would need to be modified if you wanted to just add in more photos. Also, the script expects the url of your photos to be structured exactly as such:
```
https://picsum.photos/id/{id}/{width}/{height}
```
The script would need to be modified to handle photos inputted any different way.

### Django Admin credentials
Fill in the blanks...
- un: my_name.lowercase()
- pw: P**sw**d1*3[Bang]


#### TODO:

- additional features such as request caching, image manipulation, error handling, and user authentication
