#My approach to fully automate unit tests in Titanium Alloy projects.

First some notes:

I couldn't find a way to integrate unit tests in Alloy projects AND automate that using a Continuous Integration build server. This is my first approach to integrate unit tests in Titanium Alloy projects. I've never ever done anything with Titanium before, but I hope this information is helpful for some of you.

After some researching and asking ([http://developer.appcelerator.com/question/146254/titanium-30--unit-testing--jenkins](http://developer.appcelerator.com/question/146254/titanium-30--unit-testing--jenkins) and ) I was inspired by a presentation of [https://github.com/tonylukasavage](https://github.com/tonylukasavage) at Codestrong 2012 ([http://www.slideshare.net/appcelerator/codestrong-2012-breakout-session-testing-best-practices-unit-and-functional-automation](http://www.slideshare.net/appcelerator/codestrong-2012-breakout-session-testing-best-practices-unit-and-functional-automation))

I borrowed behave.js from: [https://github.com/appcelerator/Codestrong/blob/master/app/lib/behave.js](https://github.com/appcelerator/Codestrong/blob/master/app/lib/behave.js). I modified this version to let it create a JUnit XML report file. The code needs some shaving, but it should work fine.

Behave.js runs the tests (specs) while the app runs in the simulator so mocking the Titanium API isn't needed. Of course this approach has some downsides as well, but I find this useful.

**Please note the JUnit XML file is written to the temp folder on my Mac. If you're not on a Mac, you need to change that location so the XML file can be written.** 

#Let's go

**1) Create a new Titanium Alloy project**

**2) Integrate /app/lib/behave.js and call him from alloy.js**

See changeset: [https://github.com/denvers/unit-test-titanium-alloy-project/commit/cf653d746b4b9c46a278921fc68e143401d9b9ef](https://github.com/denvers/unit-test-titanium-alloy-project/commit/cf653d746b4b9c46a278921fc68e143401d9b9ef)

**3) Create a test (called a spec) in /app/assets/spec/**

**4) Let behave.js run your spec by adding a require in your alloy.js file**

-> (3+4) See commit: [https://github.com/denvers/unit-test-titanium-alloy-project/commit/c98d7fbcd2e8d32eefed683e2e6783efa4a10ed0](https://github.com/denvers/unit-test-titanium-alloy-project/commit/c98d7fbcd2e8d32eefed683e2e6783efa4a10ed0)

When compiling your app, you'd see in your console that the JUnit XML file is written to /tmp/junit-buildresults.xml ([http://cl.ly/image/2J2e1y3H2t3b](http://cl.ly/image/2J2e1y3H2t3b))

#Now the automation part…

I use Jenkins as a Continuous Integration buildserver. Other buildservers who are able to interpret JUnit XML files should work also.

My code is pushed to a private Github repository. You should configure your Jenkins job to let Jenkins read your project files. I bet you know how to fix this yourself ;-)

1) I created a job for running the tests in Jenkins. The interesting parts are:

a) A buildstep with some magic commands to build the app and have the unit tests executed:

```
cd ${WORKSPACE}/unit-testing-alloy-projects **# ENTER YOUR PROJECT FOLDER**
titanium clean
titanium build --platform ios --deploy-type test --log-level debug &
sleep 30
mv /tmp/junit-buildresults.xml ${WORKSPACE}/unit-testing-alloy-projects **# ENTER YOUR PROJECT FOLDER**
sleep 3
killall "iPhone Simulator"
```

b) Add a post build action which tells Jenkins the location of the JUnit buildresults XML file; *Publish JUnit report* and enter the relative path to that file:

Test report XMLs: `unit-testing-alloy-projects/junit-buildresults.xml`

**That's it! This should do the trick. You are able to fully automate building your apps using a Contiuous Integration approach**

I hope this will help some of you out. Get in touch with me at Twitter: [@webvakker](http://www.twitter.com/webvakker)