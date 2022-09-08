![alt text](https://www.lucciolalegnami.it/static/media/logo.0687be86f1bd7b82551c.png)
# Lucciola Legnami
<strong>Lucciola Legnami</strong> is a small lumber store situated in Capranica (VT) - Italy.
This repository contains the (partial) code of the website.

## Technologies Used
This website contains both <strong>frontend</strong> and <strong>backend</strong>. The main technologies and languages used to build it are the following:
<ul>
  <li>Frontend:</li>
  <ul>
    <li>Javascript (ReactJS);</li>
    <li>HTML;</li>
    <li>SCSS;</li>
  </ul>
  <li>Backend:</li>
  <ul>
    <li>PHP: used to build APIs;</li>
    <li>SQL (MySQL);</li>
  </ul>
</ul>

## Features
There are two types of users: <strong>customers</strong> and <strong>admins</strong>.<br>
<strong>Customers</strong> are able to:
<ul>
  <li>View the product list: Each products contains various information and photos;</li>
  <li>Contact the company: Using various means of communications such as WhatsApp or the telephone number;</li>
  <li>Ask for an online quote: Using a dedicated form. Whenever a customer asks for a quote, admins receive an email with the request. They can send a response directly (using any email provider) or through the administration page;</li>
  <li>Know more about the company;</li>
  <li>View the company news: If there is some news (e.g. the store is temporarily closed), a popup will be shown on the website. Read news won't be shown again (cookies keep track of the read news);</li>
</ul>

<strong>Admins</strong> are able to:
<ul>
  <li>Answer to online quotes: Admins can answer directly from the website. There is a dedicated section in the administration page which allows to view all the received quotes and search for specific ones (it is possible to filter quotes using a searching box or showing only "answered" or "unanswered" quotes). The admin can create two types of answers: Simplified (text only with one section) or Structured (various sections for transport notes, additional notes and a product list composed by product description, price and quantity). If the answer is sent from the administration page, an email template is used. For each quotes it is also possible to:</li>
  <ul>
    <li>View sender information: Name, Surname, Email, Telephone, Request, etc..;</li>
    <li>Change the response state: Make an answered quote unanswered (and vice versa);</li>
    <li>View the response;</li>
  </ul>
  <li>View payment methods: There is a dedicated section for payment methods. Each methods can be shared to the customers (through a "navigation" button);</li>
  <li>Ask for an online quote: Using a dedicated form;</li>
  <li>Manage the company news: It is possible view all the active news, add a new one (a title, a description and an expiry date are required) and delete an existing one;</li>
</ul>
In order to log into the administration page, the user must enter username and password. For security reasons, it is not possible to create a new admin directly from the website.<br><br>

<strong>Possible future features:</strong><br>
Some features to add in the future might be:
<ul>
  <li>Order creation (for customers) and management (for admins);</li>
  <li>Multi language support (at least Italian and English);</li>
</ul>