FTS-Mobile
==========

A prototype mobile website for UN OCHA FTS

==========

Note: The prototype is currently operating on fixed data sources pulled from the FTS API rather than live data from the server.

Generally speaking, all of the data is structured exactly as it is pulled from the API. Here I will document the data structure for each variable for each page, and suggest ways of incorporating server data into them.

==========
index.html

The main page uses three variables to generate the page content and the menu. These variables are found in data/appeal.js, data/emergency.js, and data/organization.js. There are no URL variables.

1. appeal.js is structured based upon the API data from http://fts.unocha.org/api/v1/appeal/year/2013.json and subsequent years until 2000. The data was collected for each of these pages, given a "year" object key, and merged into one JSON object.
appeal.js serves to both create the appeal menu, and to create the page content for the index and appeal overview pages, but for server implementation these functions should be separated since there is a lot of data relevant to the specific year (requirements and funding) that is not relevant to the generation of the menu.
When recreating the menu, the only keys required are "id", "title", and "year." The page content requires "id", "title", "current_requirements","funding", and optionally "original_requirements" and "pledges".
All menus are created in the same fashion, so I will not go over the generation of the menu for subsequent pages. 

2. emergency.js is structured based upon the API data from http://fts.unocha.org/api/v1/emergency/year/2013.json and subsequent years until 2000. The data was collected for each of these pages, given a "year" object key, and merged into one JSON object.
emergency.js serves to both create the emergency menu, and to create the page content for the emergency overview pages, but for server implementation these functions should be separated since there is a lot of data relevant to the specific year (funding and pledges) that is not relevant to the generation of the menu.
When recreating the menu, the only keys required are "id", "title", and "year." The page content requires "funding", and optionally "pledges".
All menus are created in the same fashion, so I will not go over the generation of the menu for subsequent pages. 

3. organization.js is structured based upon the API data from http://fts.unocha.org/api/v1/organization.json, but some attempt was made to limit the results just to donors.
This data is used exclusively in the creation of the menu for this page, and uses the keys "id", "name", and "abbreviation."
All menus are created in the same fashion, so I will not go over the generation of the menu for subsequent pages. 

Additional considerations for server implementation: The years in the menu are hard-coded into the HTML of each page, and the function populatelist() only will fill out each year that already exists in html. The hard-coding allows the user to see there is something there before the page is fully loaded, but this means that new years will have to be added manually. Additionally, the function can be adapted to print the year tags as well, but this may make the page load slightly slower for the user.

==========
aoverview.html?year=x

The Appeal Overview page uses one variable to generate the page content. This variable is found in data/appeal.js. The URL variable is accessible in Javascript using the function GetUrlValue("year").

1. appeal.js is structured based upon the API data from http://fts.unocha.org/api/v1/appeal/year/2013.json and subsequent years until 2000. The data was collected for each of these pages, given a "year" object key, and merged into one JSON object.
Since appeal.js is used to create the menu as well, there is a lot of data for subsequent years that is not used by each individual appeal overview page.
The only keys used in the generation of the page content are "id", "current_requirements", "funding", and optionally "original_requirements" and "pledges".

Additional consideration for server implementation: For each individual appeal overview page, have the server serve up just the appeals for that given year. The percent funded is currently being generated on the client-side, but this can be accomplished by the server to save resources.

==========
eoverview.html?year=x

The Emergency Overview page uses one variable to generate the page content. This variable is found in data/emergency.js. The URL variable is accessible in Javascript using the function GetUrlValue("year").

1. emergency.js is structured based upon the API data from http://fts.unocha.org/api/v1/emergency/year/2013.json and subsequent years until 2000. The data was collected for each of these pages, given a "year" object key, and merged into one JSON object.
Since emergency.js is used to create the menu as well, there is a lot of data for subsequent years that is not used by each individual emergency overview page.
The only keys used in the generation of the page content are "id", "funding", and optionally "pledges".

Additional considerations for server implementation: For each individual emergency overview page, have the server serve up just the emergencies for that given year.

==========
appeal.html?id=x

The Appeal page uses six variables to generate the page content. These variable are found in data/appeal.js, data/funding_cluster_978.js, data/funding_donor_978.js, data/funding_recipient_978.js, data/project_978.js, and data/contribution_978.js. The URL variable is accessible in Javascript using the function GetUrlValue("id").

1. appeal.js is structured based upon the API data from http://fts.unocha.org/api/v1/appeal/year/2013.json and subsequent years until 2000. The data was collected for each of these pages, given a "year" object key, and merged into one JSON object.
The only purpose of this variable is to give the summary on the first page, so using it for this purpose is a lot of extra data. It uses the keys "current_requirements" and "funding".

2. funding_cluster_978.js is the API data from http://fts.unocha.org/api/v1/funding.json?appeal=978&groupby=cluster without edits. This particular data is only from Burkina Faso 2013.
The page content only uses the first key "grouping" to access the data, and then utilizes the keys "type" and "amount."

3. funding_donor_978.js is the API data from http://fts.unocha.org/api/v1/funding.json?appeal=978&groupby=donor without edits. This particular data is only from Burkina Faso 2013.
The page content only uses the first key "grouping" to access the data, and then utilizes the keys "type" and "amount."

4. funding_recipient_978.js is the API data from http://fts.unocha.org/api/v1/funding.json?appeal=978&groupby=recipient without edits. This particular data is only from Burkina Faso 2013.
The page content only uses the first key "grouping" to access the data, and then utilizes the keys "type" and "amount."

5. project_978.js is the API data from http://fts.unocha.org/api/v1/Project/appeal/978.json without edits. This particular data is only from Burkina Faso 2013.
The purpose of importing data for every project is to first, find total requirements for funding grouped by recipients and grouped by cluster and; second, to create the "Funding Status of Projects Grouped By Cluster" tab.
For finding requirements, it utilizes the keys "current_requirements", "sector", and "organisation". For listing the project, it uses "current_requirements", "sector", "organisation", and "code".

6. contribution_978.js is the API data from http://fts.unocha.org/api/v1/Contribution/appeal/978.json without edits. This particular data is only from Burkina Faso 2013.
The purpose of this variable is only for finding the funding amount for each project in the "Funding Status of Projects Grouped By Cluster" page.
It utilizes the keys "amount", "status", and "project-code"

Additional considerations for server implementation: A lot of work is being done on the client side on this page to stitch together the grouped funding amounts with requirements from projects. Many resources could be saved by serving up funding and requirements together grouped by the relevant fields. For the mobile page, I advocate eliminating the "Funding Status of Projects Grouped By Cluster" page, since once the server can automatically give the requirements, there will be no reason to add the project data and the load-time will be drastically reduced for users.

==========
emergency.html?id=x

The Emergency page uses three variables to generate the page content. These variable are found in data/emergency.js, data/funding_donor_16271.js, and data/funding_recipient_16271.js. The URL variable is accessible in Javascript using the function GetUrlValue("id").

1. emergency.js is structured based upon the API data from http://fts.unocha.org/api/v1/emergency/year/2013.json and subsequent years until 2000. The data was collected for each of these pages, given a "year" object key, and merged into one JSON object.
The only purpose of this variable is to give the summary on the first page, so using it for this purpose is a lot of extra data. It uses the keys "pledges" and "funding".

2. funding_donor_16271.js is the API data from http://fts.unocha.org/api/v1/funding.json?emergency=16271&groupby=donor without edits. This particular data is only from the Afghanistan 2013 Emergency.
The page content only uses the first key "grouping" to access the data, and then utilizes the keys "type" and "amount."

3. funding_recipient_16271.js is the API data from http://fts.unocha.org/api/v1/funding.json?emergency=16271&groupby=recipient without edits. This particular data is only from the Afghanistan 2013 Emergency.
The page content only uses the first key "grouping" to access the data, and then utilizes the keys "type" and "amount."

Additional considerations for server implementation: The only real thing that can be improved on this page is the summary from emergency.js being served up individually.

==========
go.html?year=x

The Global Overview page uses five variables to generate the page content. These variables are found in data/appeal.js, data/emergency.js, data/funding_donor_2013.js, data/funding_recipient_2013.js, and data/funding_sector_2013.js. The URL variable is accessible in Javascript using the function GetUrlValue("year").

1. emergency.js is structured based upon the API data from http://fts.unocha.org/api/v1/emergency/year/2013.json and subsequent years until 2000. The data was collected for each of these pages, given a "year" object key, and merged into one JSON object.
The only purpose of this variable is to give the summary on the first page, so using it for this purpose is a lot of extra data. It uses the keys "pledges" and "funding".

2. appeal.js is structured based upon the API data from http://fts.unocha.org/api/v1/appeal/year/2013.json and subsequent years until 2000. The data was collected for each of these pages, given a "year" object key, and merged into one JSON object.
The only purpose of this variable is to give the summary on the first page, so using it for this purpose is a lot of extra data. It uses the keys "current_requirements", "original_requirements", "pledges", and "funding".

3. funding_donor_2013.js is the API data from http://fts.unocha.org/api/v1/funding.json?year=2013&groupby=donor without edits. This particular data is only from the year 2013.
The page content only uses the first key "grouping" to access the data, and then utilizes the keys "type" and "amount."

4. funding_recipient_2013.js is the API data from http://fts.unocha.org/api/v1/funding.json?year=2013&groupby=recipient without edits. This particular data is only from the year 2013.
The page content only uses the first key "grouping" to access the data, and then utilizes the keys "type" and "amount."

5. funding_sector_2013.js is the API data from http://fts.unocha.org/api/v1/funding.json?year=2013&groupby=sector without edits. This particular data is only from the year 2013.
The page content only uses the first key "grouping" to access the data, and then utilizes the keys "type" and "amount."

Additional considerations for server implementation: Again, the summary on the first page does not require the data from every appeal and every emergency. This can be served up.

==========
org.html?id=x&year=x

The Organisation page uses five variables to generate the page content. These variables are found in data/organization.js, data/USA_funding_recipient.js, data/USA_funding_emergency.js, data/USA_funding_appeal.js, and data/USA_funding_sector.js. The URL variables are accessible in Javascript using the functions GetUrlValue("id") and GetUrlValue("year").

1. organization.js is structured based upon the API data from http://fts.unocha.org/api/v1/organization.json, but some attempt was made to limit the results just to donors.
This data is used just to write the name of the organization based upon the ID and grab the total funding number for the organization, and uses the keys "id", "name" and "contribution."
Again, this is a lot of data just for what it's doing.

2. USA_funding_recipient.js is the API data from http://fts.unocha.org/api/v1/funding.json?donor=5083&year=2013&groupby=recipient without edits. This particular data is only from the US for the year 2013.
The page content only uses the first key "grouping" to access the data, and then utilizes the keys "type" and "amount."

3. USA_funding_emergency.js is the API data from http://fts.unocha.org/api/v1/funding.json?donor=5083&year=2013&groupby=emergency without edits. This particular data is only from the US for the year 2013.
The page content only uses the first key "grouping" to access the data, and then utilizes the keys "type" and "amount."

4. USA_funding_appeal.js is the API data from http://fts.unocha.org/api/v1/funding.json?donor=5083&year=2013&groupby=appeal without edits. This particular data is only from the US for the year 2013.
The page content only uses the first key "grouping" to access the data, and then utilizes the keys "type" and "amount."

5. USA_funding_sector.js is the API data from http://fts.unocha.org/api/v1/funding.json?donor=5083&year=2013&groupby=sector without edits. This particular data is only from the US for the year 2013.
The page content only uses the first key "grouping" to access the data, and then utilizes the keys "type" and "amount."

Additional considerations for server implementation: Be careful of organization with a Z vs. organisation with an S. The file-name and the variable-name for the javascript uses a Z (since this is what the API does) but I tried to make all visual references to the word have an S.

==========
==========
==========

If you have any questions, please contact me at my personal email address: alex.k.miller@gmail.com. I will be happy to help.
