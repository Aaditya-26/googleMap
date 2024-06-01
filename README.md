# googleMap

This project aims to develop a web application using Django and Python that implements CRUD APIs along with user authentication (login and signup). Additionally, it includes a map feature with a search functionality, where users can search for specific locations and view them on the map.

## Local Environment Setup
#### Create a virtual environment:
```bash
# Using virtualenv
virtualenv virtualenv

# Using Python 3.8
python3.8 -m venv virtualenv
```
#### Activate the virtual environment:
```bash 
source virtualenv/bin/activate
```
#### Clone the repository and install the required packages:
```bash
pip install -r requirements.txt
```
## Running the Project
#### Collect Static (Optional)
```bash
Note: Only necessary when debug is False (in production mode).
python manage.py collectstatic
```
#### Create Initial Database:
```bash
python manage.py migrate
```
#### Run Server:
```bash
python manage.py runserver
```
## Support the Project
If you find this project useful, show your support by starring it! 🌟
