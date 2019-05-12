# Murphy Automotive Angular Projects
This repository contains the following software products for Murphy Automotive
1. **Digital Inspection Report (client only)**
2. **MyCar** 
3. **Shared Component Library**

## Digital Inspection Report
#### Summary 
A public facing report of a vehicle inspection during a visit. Reporting data comes from a running instance of
[DigitalInspection](https://github.com/DanielCaspers/DigitalInspection).

#### Purposes
Allow anonymous users to
1. View the overall health of their vehicle
2. See images and measurements taken from the inspection
3. See service advisor's notes, as well as Murphy Automotive curated help content
4. Contact Murphy Automotive with any questions

#### Serve
1. Run `ng report:serve:(local|staging|prod)` for a dev server.
2. Navigate to `http://localhost:4200/`.

_The app will automatically reload if you change any of the source files._

#### Build
1. Run `ng report:build:(local|staging|prod)` to build the Digital Inspection report app. 
2. The build artifacts will be stored in the `dist/InspectionReport-Public` directory.

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
1. Run `ng mycar:serve:(local|staging|prod)` for a dev server.
2. Navigate to `http://localhost:4201/`.

_The app will automatically reload if you change any of the source files._

#### Build
1. Run `ng mycar:build:(local|staging|prod)` to build the MyCar app.
2. The build artifacts will be stored in the `dist/MyCar` directory.

## Shared Component Library
#### Summary
A module of sharable code that is custom to Murphy Automotive that is used by all client projects.

#### Purposes
1. Share code between Angular client projects for consistency
2. Seamless updating between the library and consuming projects

#### Build
It can be built independently with `ng sharedlib:build`, but it is automatically re-built whenever serving or building one of the above apps.
