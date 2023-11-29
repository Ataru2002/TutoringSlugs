Feature: Testing the API endpoints for CSE 115A Project - Tutoring Slugs

Background:
    * def baseUrl = "http://localhost:8080/"

Scenario: GET course/get
    Given url baseUrl
    And path "course/get"
    When method GET
    Then status 200

Scenario: POST course/tutor
    * def payload = 
    """
    {
        "hello": "world",
        "foo": "bar"
    }
    """
    Given url baseUrl
    And path "course/tutor"
    And request payload
    When method POST
    Then status 200

Scenario: POST auth/login
    * def payload = 
    """
    {
        "hello": "world",
        "foo": "bar"
    }
    """
    Given url baseUrl
    And path "auth/login"
    And request payload
    When method POST
    Then status 200
    
