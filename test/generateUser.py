import json
import random
import time
from datetime import datetime, timedelta

# Constants
branches = [
    'Computer Science', 'Electronics and Communication', 'Information Technology',
    'Mechanical', 'Electrical', 'Civil', 'Production and Industrial Engineering',
    'Mathematics and Computing', 'Industrial Internet of Things', 'Other'
]

locations = [
    {"country": "India", "state": "Haryana", "city": "Kurukshetra"},
    {"country": "USA", "state": "California", "city": "San Francisco"},
    {"country": "Canada", "state": "Ontario", "city": "Toronto"},
    {"country": "Australia", "state": "New South Wales", "city": "Sydney"},
    {"country": "UK", "state": "England", "city": "London"},
    {"country": "Germany", "state": "Bavaria", "city": "Munich"},
    {"country": "France", "state": "Île-de-France", "city": "Paris"},
    {"country": "Japan", "state": "Tokyo", "city": "Tokyo"},
    {"country": "China", "state": "Beijing", "city": "Beijing"},
    {"country": "Brazil", "state": "São Paulo", "city": "São Paulo"}
]

skills_list = ["Python", "JavaScript", "C++", "Java", "HTML", "CSS", "SQL", "Ruby", "Go", "Swift"]
hobbies_list = ["Reading", "Gaming", "Hiking", "Cooking", "Traveling", "Drawing", "Photography"]
certifications_list = ["AWS Certified Solutions Architect", "Certified Kubernetes Administrator", "PMP"]
awards_list = ["Employee of the Month", "Best Project Award", "Excellence in Innovation"]
badges_list = ["Top Performer", "Team Player", "Innovator", "Problem Solver"]

# Helper functions
def generate_username(first_name, last_name, index):
    return f"{first_name.lower()}{last_name.lower()}{index}"

def random_date(start, end):
    return start + timedelta(seconds=random.randint(0, int((end - start).total_seconds())))

def random_items(item_list, max_items):
    return random.sample(item_list, random.randint(1, min(len(item_list), max_items)))

# Base user data
base_user = {
    "username": "udaynarwal",
    "avatar": "http://res.cloudinary.com/dttk927pq/image/upload/v1718633857/atpqyd8ciinqbdsgccle.png",
    "coverImage": "http://res.cloudinary.com/dttk927pq/image/upload/v1718633859/wdzusookus0daswbldum.jpg",
    "first_name": "uday",
    "last_name": "Narwal",
    "joining_batch": "1981",
    "country": "India",
    "state": "Haryana",
    "city": "Kurukshetra",
    "address": "Nothing",
    "branch": "Electronics and Communication",
    "organisation": "Google",
    "email": "udaynarwal1@gmail.com",
    "password": "$2b$10$U9YVdikztv2He8iBrMUoaO8EQUJ6cJZ7LOLXsCMvp5cP9Fqv/Sb5.",
    "phone_number": "123123123",
    "dob": "1990-05-15",
    "is_admin": False,
    "verified": True,
    "valid_user": True,
    "skills": [],
    "hobbies": [],
    "terms_accepted": True,
    "certifications": [],
    "awards": [],
    "badges": [],
    "notificationToken": "",
}

# Generate users
users = []
for i in range(1, 51):
    user = base_user.copy()
    user["username"] = generate_username(user["first_name"], user["last_name"], i)
    user["branch"] = random.choice(branches)
    user["email"] = f"{user['username']}@example.com"
    user["phone_number"] = f"{random.randint(1000000000, 9999999999)}"
    user["dob"] = random_date(datetime(1970, 1, 1), datetime(2000, 1, 1)).isoformat()
    user["joining_batch"] = random_date(datetime(1980, 1, 1), datetime(2020, 1, 1)).year
    user["address"] = f"Random Address {i}"
    # Randomize location
    location = random.choice(locations)
    user["country"] = location["country"]
    user["state"] = location["state"]
    user["city"] = location["city"]
    
    # Randomize skills, hobbies, certifications, awards, and badges
    user["skills"] = random_items(skills_list, 5)
    user["hobbies"] = random_items(hobbies_list, 3)
    user["certifications"] = random_items(certifications_list, 2)
    user["awards"] = random_items(awards_list, 2)
    user["badges"] = random_items(badges_list, 2)
    
    users.append(user)

# Save to JSON file
with open('users2.json', 'w') as f:
    json.dump(users, f, indent=4)

print("Generated 1000 users and saved to users.json")
