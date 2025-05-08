Feature: User registration and login

  Scenario: A user registers and logs in successfully
    Given I am on the registration page
    When I fill in the registration form with valid data
    Then I should see a confirmation message

    Given I am on the login page
    When I log in with the registered user
    Then I should see my username on the homepage
