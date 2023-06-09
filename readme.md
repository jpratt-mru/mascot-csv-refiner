# MACOCAST Tools (MACO Calendar & Scheduling Tool)

## Overview

In order for MACOCAST to work, it's gotta have information about the scheduling for a given semester: who's teaching what, where, and when. Since I don't have direct access to the databases with this juicy info, I have to come at it sideways: scraping info from https://ban9ssb-prod.mtroyal.ca/StudentRegistrationSsb/ssb/term/termSelection?mode=search

The general process is as follows (more detailed steps follow below):

1. Scrape the page for a given semester.
2. Turn that scrape into a CSV.
3. Refine that CSV to exclude some entries, re-include some of those exclusions, and modify others.
4. Use that refined CSV to add rows to some database tables I control.

The database tables are then used to populate MACOCAST.

## Detailed Steps

### Before you begin

1. Pop open this repo in a Codespace to get started.

2. Make a new directory in `semesters` in this repo. Give it a `yyyy-ss` name. For example, 2024-04 is fall 2024. While you're in here, create a file called `yyyy-ss.html` in that directory, and copy the `exclusions.txt`, `inclusions.txt`, and `modifications.txt` files from the previous semester into the new directory as well.

#### exclusions.txt

This file should contain regex terms you want to use to exclude some rows from your raw csv file. Here's a typical one:

```
math,0[0-9]{3}
gned
```

Each line is comma-separated; each item in that line must be present in a csv line for that line to be removed. So in the above example, all math courses starting with 0 (the cont ed ones) and all general education entries in the csv will be removed.

#### inclusions.txt

This file should contain regex terms you want to use to include some rows from your raw csv file that would normally be excluded via the `exclusions.txt` entries. Here's a typical one:

```
gned,Laura Marik
gned,Jordan Kidney
```

Each line is comma-separated; each item in that line must be present in a csv line for that line to be included. So in the above example, while all gned courses are **usually** excluded, gned courses taught by Kidney or Laura would be included.

#### modifications.txt

This file should contain text substitutions you want to have in the refined csv. 

For example:

```
Michael Uzoka > Faith Michael Uzoka
Namrata Khemka-Dolan > Namrata Khemka
```

Each line uses a ` > ` to indicate what should be substitued for what. The above example would replace all entries with Michael's name to include his full name.

_I'm doing this to make it easier to generate official usernames at the moment, but it seems like this feature would be useful in other cases as well!_

### Scrape the page for a given semester

1. Pop open a browser and go to https://ban9ssb-prod.mtroyal.ca/StudentRegistrationSsb/ssb/term/termSelection?mode=search

2. Select the term (the web page says term; I think it should be semester, but whatever) you want to scrape.

3. Enter the desired search criteria. We want Computer Science, Mathematics, and General Education.
![search criteria](readme-images/search-criteria.png)

4. Inspect the "per page" part of the page in your browser inspector, because we need to do a hack that allows us to see ALL of the records instead of just a few. Take note of the number of records, too, because you'll need that in the next step.
![pagination tool](readme-images/pagination-tool.png)

5. Change the markup of the dropdown so that the value is equal to the number of records you noted in the previous step.
![pagination tool](readme-images/option-change-complete.png)

6. Select the hacked dropdown option in the browser. Wait for a while, because it's going to take some time. 

7. In the inspector, right-click in the Elements tab, choose Edit as HTML, and copy that monster beast into the `yyyy-ss.html` file you made in step 0.


### Turn that scrape into a CSV

0. Make sure you've got the `yyyy-ss.html` scrape file from the previous section ready.

1. Open up a terminal in the Codespace.

2. Run the command `node extract.js yyyy-ss`, where `yyyy` is the year and `ss` is the semester to extract. For example, if you've got the scrape file `2023-04.html`, you'll run `node extract.js 2023-04`.
	- _Result: the file `yyyy-ss-raw.csv` file will be created in the `yyyy-ss` directory._
	

### Refine that CSV

0. Make sure you've got the `yyyy-ss-raw.csv` file from the previous section AND you've got `exclusions.txt`, `inclusions.txt`, and `modifications.txt` populated as desired. They usually won't need to be touched, but you can if a given semester needs some additional loving.

1. Open up a terminal in the Codespace.

2. Run the command `node refine.js yyyy-ss`, where `yyyy` is the year and `ss` is the semester to refine. For example, if you've got the csv file `2023-04-raw.csv`, you'll run `node refine.js 2023-04`.
	- _Result: the file `yyyy-ss-refined.csv` file will be created in the `yyyy-ss` directory._