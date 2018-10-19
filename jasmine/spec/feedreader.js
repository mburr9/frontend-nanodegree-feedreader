/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
       it('are defined', function() {
        expect(allFeeds).toBeDefined();
        expect(allFeeds.length).not.toBe(0);
       });



       it('has URL defined', function () {
         for (let feed of allFeeds) {
           expect(feed.url).toBeDefined();
           expect(feed.url.length).not.toBe(0);
         };
       });

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
       it('has name defined', function () {
         for (let feed of allFeeds) {
           expect(feed.name).toBeDefined();
           expect(feed.name.length).not.toBe(0);
         };
       });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The Menu', function() {


        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
       it('is hidden by default', function() {
         const bodyHasClass = $('body').hasClass('menu-hidden');
         expect(bodyHasClass).toBe(true);
       });
         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
       it('changes visibility when clicked', function() {
         const menuLink = $('.menu-icon-link');
         menuLink.click(); //simulates click on menu-icon-link
         let bodyHasClass = $('body').hasClass('menu-hidden');
         expect(bodyHasClass).toBe(false);
         menuLink.click(); //simulates second click on menu-icon-link
         bodyHasClass = $('body').hasClass('menu-hidden');
         expect(bodyHasClass).toBe(true);
       })
    });
    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function() {
      beforeEach(function(done) {
        loadFeed(0, done)
      });



        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
       it('feed container not empty', function() {
         let container = $('.feed');
         expect(container.children().length).not.toBe(0);
       });
    });
    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function() {
      let feeds = $('.feed');
      let firstFeeds = [];
      beforeEach(function(done) {
        loadFeed(0);
        let feedEntries = Array.from(feeds.children()); //converts the children of first feed into an array
        for (let feedEntry of feedEntries) {
          firstFeeds.push(feedEntry.innerText); // saves just the inner text of the children in an array
        };
        loadFeed(1, done); // loads the feed again to get the second feeds and anounces we're done
      });



        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
         it('feed content changes', function() {
           let secondFeeds = [];
           let newFeedEntries = Array.from(feeds.children()); // converts children of second feed into an array
           for (let feedEntry of newFeedEntries) {
             secondFeeds.push(feedEntry.innerText); // saves just the inner text of the children in an array
           };
           for (let i = 0; i < secondFeeds.length; i++) {
             expect(secondFeeds[i]).not.toEqual(firstFeeds[i]); // checks that each item in the secondfeeds array is not equal to its counterpart in the firstfeeds array
           };
         });
    });
}());
