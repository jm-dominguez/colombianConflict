# colombianConflict
A Meteor App using D3 to explain the colombian conflict using scrollytelling visualization technique. In addition, there will be a section, for the users to give their opinion abut the conflict and related topics. Finally, there will be a Twitter API feature to bring tweets about the more relevant information.

## Getting Started

To get this project just clone it from github. You can achieve this by using the following command.
```
$ git clone https://github.com/jm-dominguez/colombianConflict.git
```

### Prerequisites

To run this project you'll need to have Meteor installed in your machine. You can download Meteor by following the steps from: https://www.meteor.com/install

### Installing

To use the project you'll need to download all the dependencies that are related to it. Follow this steps:
1. Enter the project
```
$ cd colombianConflict
```
2. Download project dependencies
```
$ meteor npm install
```
3. Add twitter token environment variable. To do this, you should have a Bearer Token for accesing the Twitter API. 
```
$ export TWITTER_TOKEN=<YOUR_BEARER_TOKEN>
```
4. Run the project
```
$ meteor
```

## Running the tests

Explain how to run the automated tests for this system


## Deployment

To deply this project in heroku follow the steps from this tutorial. https://medium.com/@leonardykris/how-to-run-a-meteor-js-application-on-heroku-in-10-steps-7aceb12de234

Remenber that additionally, you'll need to add a environment variable with your twitter API bearer token.

## Built With

* [Meteor](https://www.meteor.com/) - The web framework used
* [NPM](https://www.npmjs.com/) - Dependency Management
* [MONGODB](https://www.mongodb.com/) - The database used
 
## Authors

* **Juan Manuel Dompinguez** - [Juan Dominguez](https://jm-dominguez.github.io/)
* **Andres David Laiton** - [Andres Laiton](https://daviddlaiton.github.io/)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE) file for details

## Acknowledgments

* The scrollytelling features where devolped using Jim Valladingham tutorial, you can find more [here](http://vallandingham.me/scroller.html)
* Most d3 features where based on [bl.ocks](https://bl.ocks.org/) examples.
