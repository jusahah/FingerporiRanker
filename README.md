# FingerporiRanker

Fetches excellent Fingerpori comics from HS.fi and ranks them according Facebook like counts.

**WARNING: Do not run and rerun this script over and over again. It will basically be a DoS attack.** 

By default the code contains *delay*-functionality which makes sure there is a small pause (about 5 secs) between two successive HTTP requests.

## Example usage

```
node index.js s1306076646582
```

The command-line arg is ID of the Fingerpori from where to start scraping *backwards*. 

For example, ID *s1306076646582* corresponds to url [http://www.hs.fi/fingerpori/s1306076646582](http://www.hs.fi/fingerpori/s1306076646582)

## Internal workings

Script automatically fetches Fingerpori comic pages one-by-one until no more are left. 

From each page it parses out the ID of the next-to-be-fetched comic. 

Also the script fetches current FB like count for each comic page. It does this by calling directly Facebook API.

## Storage of results

Results of scraping are saved to a JSON file *fingerpori_db.json*. Comics are automatically sorted by *facebook like count*

**fingerpori_db.json**

```
{
  "lastUpdate": "2015-10-24T00:00:00+03:00",
  "lastItemPushed": {
    "id": "s1305994942488",
    "date": "24.10.2015"
  },
  "list": [
    {
      "date": "2015-10-28T00:00:00+02:00",
      "datestring": "28.10.2015",
      "id": "s1305996168814",
      "likes": 2300
    },
    {
      "date": "2015-10-24T00:00:00+03:00",
      "datestring": "24.10.2015",
      "id": "s1305994942488",
      "likes": 889
    },
    {
      "date": "2015-10-27T00:00:00+02:00",
      "datestring": "27.10.2015",
      "id": "s1305995682376",
      "likes": 858
    },
    {
      "date": "2015-10-26T00:00:00+02:00",
      "datestring": "26.10.2015",
      "id": "s1305995400349",
      "likes": 701
    },
    {
      "date": "2015-10-29T00:00:00+02:00",
      "datestring": "29.10.2015",
      "id": "s1305996392726",
      "likes": 555
    },
    
    // etc.
  ]
}

```

## Known bugs

1. For some yet unidentified reason, the parsing of FB like count data breaks down for comics older than November 2012. To be fixed later.


