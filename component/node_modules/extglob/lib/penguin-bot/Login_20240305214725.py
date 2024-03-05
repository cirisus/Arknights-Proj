import os
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

def login_to_wikidot():
    username = os.environ['WIKIDOT_PENGUIN_BOT']
    password = os.environ['WIKIDOT_PENGUIN_TOKEN']

    driver = webdriver.Edge()

    driver.get('http://www.wikidot.com/default--flow/login__LoginPopupScreen')

    username_field = driver.find_element_by_name('login')
    password_field = driver.find_element_by_name('password')
    username_field.clear()
    password_field.clear()
    username_field.send_keys(username)
    password_field.send_keys(password)

    password_field.send_keys(Keys.RETURN)

    driver.implicitly_wait(10)

    return driver

driver = login_to_wikidot()