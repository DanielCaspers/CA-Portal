## Projects within this repo
This repository contains the following software products for Murphy Automotive
1. **Digital Inspection Report (client only)**
2. **MyCar** 
3. **Shared Component Library**

Read their respective sections for details on building, running, etc.

## Digital Inspection Report
#### Summary 
A public facing report of a vehicle inspection during a visit. Reporting data comes from 
[the DigitalInspection project](https://github.com/DanielCaspers/DigitalInspection).

#### Purposes
Allow anonymous users to
1. View the overall health of their vehicle
2. See images and measurements taken from the inspection
3. See service advisor's notes, as well as Murphy Automotive curated help content
4. Contact Murphy Automotive with any questions

#### Serve
- Run `ng report:serve` for a dev server.
- Navigate to `http://localhost:4200/`.

_The app will automatically reload if you change any of the source files._

#### Build
- Run `ng report:build` to build the project. 
- The build artifacts will be stored in the `dist/InspectionReport-Public` directory.
- Use the `-prod` flag for a production build.

_In the near future, environment flagging will be used to allow for changing base URLs of servers to communicate with._

## MyCar
#### Summary 
A user membership site for Murphy Automotive customers to manage their account and vehicles

#### Purposes
Allow authenticated users to 
1. Monitor and manage services for vehicles
2. Schedule appointments
3. Adjust account settings
4. View VIP Rewards

#### Serve
- Run `ng mycar:serve` for a dev server.
- Navigate to `http://localhost:4201/`.

_The app will automatically reload if you change any of the source files._

#### Build
- Run `ng mycar:build` to build the project. 
- The build artifacts will be stored in the `dist/MyCar` directory.
- Use the `-prod` flag for a production build.

_In the near future, environment flagging will be used to allow for changing base URLs of servers to communicate with._
