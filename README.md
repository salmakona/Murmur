
## Theme
 web application which is able to show tweet by user.

## Specifications
* The user can follow other users.
* By following, a list of tweet posted by other users is displayed in the timeline.
* The user can post tweet as many times as he wants.
* Only the user who posted can delete his tweet.
* The user can add LIKE to another person's tweet.
*  User authentication.

### DB
Table added based on spefication 

### Server
 Implemented REST API.
 


### Client

 * Timeline
   * List of tweet information (e.g. text, LIKE count)
   * LIKE button each tweet.
   * Show 10 tweet per page. (need to implement pagination)
 * tweet Detail
   * tweet Information (e.g. text, LIKE count)
 * Own User Detail 
   * User information (e.g. name, followCount, followedCount)
   * List of own tweet
   * Button for delete a tweet
 * Other User Detail
   * User information (e.g. name, followCount, followedCount)
   * List of the user's tweet
   
##### development environment: 

Programming Language
* Javascript
Server: Express js 
DB: mysql 
Client: Vue js framework Nuxt js

   
   
