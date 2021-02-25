# SpaceX-Vue Web Application

This is a frontend web application developed using VueJs as frontend and showing insights about SpaceX flights. VueJs application uses SpaceX Rest Api V4 to show the results on the web page. The following SpaceX Rest Api Url is used to show the content on the screen.

[SpaceX Api](https://github.com/r-spacex/SpaceX-API/tree/master/docs/v4)

## Deployed to Github Pages

Live Demo: Application is currently deployed to github pages and can be access by following URL.

[Go to Live Demo](https://drahuld.github.io/spacex/)

VueJS project is available @ following Github repository.

[Go to Github Repository](https://github.com/drahuld/spacex.git)
## Application Insights

### Application Overview
```
Application shows some overview about SpaceX insights. Home page header and footer provides some information about SpaceX company. for example : company name, ceo, details about company, address.

Comapny rest api is used to fetch the data : https://api.spacexdata.com/v4/company

```

### Home Component Details

```
Home page content shows three graphical visual presentation which gives some insights about SpaceX launches since it has started launching the flights.

This information is using following RestApi to show the details on this page: 

https://api.spacexdata.com/v4/launches/query

Using following query to fetch the data:

Note: (Query has dynamic variables used for requesting paginated data 10 launches per request and complete dataset)

Home component fetching all launches from launch api.

    {
      query: {
        upcoming: true | false, (dynamic condition to fetch data based on user selection from UI)
      },
      options: {
        page: paginationCounter,
        pagination: (paginationCounter > 0),
        sort: {
          date_utc: 'desc',
        },
        populate: [
          'rocket',
          'crew',
          'launchpad',
        ],
      },
    };

Application home page showing some insights and relationship between launches, rockets and launchpad used during all launches. 
```

##### Home View

```
 Home page provide a switch functionality where user has a possibility to swtich between past launches and upcoming launches.
 As soon as switch is changed the data is automatically refresh on the page.

    1. All Past Launches (Default option when user visit the application)
    2. All Upcoming launches.

    User can see the past and upcoming launches history by changing the switch available on home page. 
```
##### Chart View

```
1. Launches Per Rocket:

    First graph shows data about launches count by per rocket i.e. how many times the rocket used for the launches.
    When user change the swtich this will shows the data for upcoming launches and rockets planned for it.

    For Example: 
    Total launches in past: 117, 
    Falcon 9: 109, 
    Falcon Heavy: 5, 
    Falcon 1: 3


 2. Launches Per Launch-Pads:

    Second graph shows data about launches count by per launch-pads i.e. how many flights launches from per launch pad.
    When user change the switch this will shows the data for upcoming launches and launch-pad planned for it.

    For Example: 
    Total launch-pad in past: 4, 
    CCSFS SLC 40: 66 launches, 
    KSC LC 39A: 30 launches, 
    VAFB SLC 3W: 16 launches,
    Kwajalein Atoll: 5 launches

  3. Launches/Rockets Per Year:

    Third graph shows data about launches and rockets used by year i.e. how many times the rocket used for the launches per year data.
    When user change the swtich this will shows the data for upcoming launches and rockets planned for upcoming years.

    For Example: 
    Total launches in past: 117, 
    Falcon 9: 26 launches in 2020,
```

#### Menus

```
User can see the detail information about launches, lauch-pads, rockets, ships, capsules and crews by going to specific menu item.

1. Launches: (Implemented)

   Shows launch timeline for past and upcoming (by changing switch)

   Launches menu display all important information and links about the all past and upcoming launches from SpaceX.
   Lauches are sorted by latest lauches at top.

   User can see 10 launches at a time. When user scroll down and reach to the bottom then application is fetching next set of 10 lauches on scoll event and so on... 

   There is a box for each launch sorted by latest date. Application display the name, launch date, logo and also shows some detail information about the lauch. User can click on the links to get more information from youtube, wiki, press release.

   Each lauch has sub item-grid and it shows specific informationa about rocket or crew if available for that lauch.

    1. Rocket Grid : Shows all information about rocket used for selected launch.
    2. Crew information for selected launch. (For Example: Crew 1 @ 16.11.2020 shows rocket as well as crew information)

2. Lauch Pads: (Implemented)

   Shows tabular representation of all available lauch pads with Spacex.     

3. Rocket: (Not Implemented)

4. Ships: (Not Implemented)

5. Capsules: (Not Implemented)

6. Crews: (Not Implemented)

```

### Screen shots from application for reference

![Parameter Example](launchPerRocket.png)
![Parameter Example](launchesPerLaunchPad.png)
![Parameter Example](launchesPerYear.png)
![Parameter Example](launches.png)
![Parameter Example](crew.png)