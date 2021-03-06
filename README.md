# Employee Time Tracker

An application that allows employees to clock in. The administrator can manage employees and edit clockin times and dates. The application also easily calculates hour totals for a time period.

## Built With

* AngularJS
* PostgreSQL
* Node.js
* Express
* Moment.js
* AngularJS Material

## Getting Started

Fork and clone this repository, and set up a database called "time_tracker". Create the tables as outlined in the database.sql file. You will also find mock data that may be inserted for testing purposes.

## Screen Shots

The hours totals view allows administrators to easily view each employee's total hours between selected dates.
![screenshot one](server/public/images/hour-totals.png)

The timeclock view allows administrators to view all employees' clock in and out times between selected dates.
![screenshot three](server/public/images/timeclock.png)

The manage employees view allows administrators to add new employees, as well as edit and decativate existing employees.
![screenshot two](server/public/images/manage-employees.png)


### Completed Features

- [x] Allow employees to clock in
- [x] List all employees
- [x] Add an employee
- [x] Edit an employee
- [x] Deactivate an employee
- [x] See complete timeclock between specified dates
- [x] Edit an entry to the timeclock
- [x] Delete an entry to the timeclock
- [x] See hour totals for each employee between specified dates
- [x] Add styling with AngularJS Material

### Next Steps

- [ ] Prevent a clock in clode from being repeated
- [ ] Optimize styling for mobile use
- [ ] Add authentication to only allow admin to add and edit employees and timeclock

## Authors

* Julia Balliet
