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

Results of scraping are saved to a JSON file *fingerpori_db.json*.

**fingerpori_db.json**

```
{
  "lastUpdate": "2016-09-15T00:00:00+03:00",
  "lastItemPushed": {
    "id": "s1306072777536",
    "date": "15.9.2016"
  },
  "list": [
    {
      "date": "2016-09-30T00:00:00+03:00",
      "datestring": "30.9.2016",
      "id": "s1306076646582",
      "likes": 1900
    },
    {
      "date": "2016-09-29T00:00:00+03:00",
      "datestring": "29.9.2016",
      "id": "s1306076345329",
      "likes": 921
    },
    {
      "date": "2016-09-28T00:00:00+03:00",
      "datestring": "28.9.2016",
      "id": "s1306076074231",
      "likes": 996
    },
    {
      "date": "2016-09-27T00:00:00+03:00",
      "datestring": "27.9.2016",
      "id": "s1306075673004",
      "likes": 863
    },
    {
      "date": "2016-09-26T00:00:00+03:00",
      "datestring": "26.9.2016",
      "id": "s1306075061522",
      "likes": 1400
    },
    
    // etc etc.
    
}

```

## Known bugs

1. For some yet unidentified reason, the parsing of FB like count data breaks down for comics older than November 2012. To be fixed later.


