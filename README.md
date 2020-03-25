## Introduction

This is a simple photo viewer app built using the Django REST framework and React.js

## Requirements
* Python3
* Pipenv


## Getting started
1. Clone the project to your machine ```[git clone https://github.com/admarko/PhotoViewer]```
2. Navigate into the directory ```[cd PhotoViewer]```

- run `python manage.py runserver`
- in a new terminal tab, `cd` into `/frontend` and run `npm start`
- navigate to http://localhost:3000/

## Built With:
This project was bult using:
* [React](https://reactjs.org)
* [Python](https://www.python.org/)
* [Django](http://djangoproject.org/)
Along with some other tools for development:
- [pre-commit](https://pre-commit.com/) hooks (for python: [black](https://github.com/psf/black), [flake8](https://flake8.pycqa.org/en/latest/), and [isort](https://github.com/asottile/seed-isort-config))
- [Sider](https://sider.review/dashboard) (online code linter that integrats with github for javascript and css: [eslint](https://eslint.org/) and [stylelint](https://stylelint.io/))
- [Refined GitHub](https://github.com/sindresorhus/refined-github) (Chrome extension for additional git shortcuts)

## Other:

This project consists of 1 management command used to reset the DB if you want to replace your own photos using this gallery. To do so, you just need to:
1. Add a .csv of the urls of the images into the `backend/` directory. And then
2. (From inside the virtual environment) run `python manage.py reset_db [your_csv_filename.csv]`

Note: This will clear the current DB and replace it with your own. The script would need to be modified if you wanted to just add in more photos. Also, the script expects the url of your photos to be structured as such:
```
https://picsum.photos/id/{id}/{width}/{height}
```
The script would need to be modified to handle photos inputted any different way.

TODO:
- turn off api view in settings
- All css/layout
- change all 404 pages
- add filtering on images
- single select photo
- venv/requirements thing (then readme)
