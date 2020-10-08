// dir _seeds includes all the seeds (dummy data)
// seeds files are in json format depending on the schema fields

require('dotenv').config({ path: "./.env" });
const fs = require('fs');
const Spinner = require('cli-spinner').Spinner;
const chalk = require('chalk');
const mongoose = require('mongoose');
const User = require('../schemas/userSchema');
const Campground = require('../schemas/campgroundSchema');
const Review = require('../schemas/reviewSchema');

// check user options: alternatively create an npm script
if (!process.argv[2]) {
    console.log(chalk.yellow(
        `Please provide options: 
        -i = to Import dummy data to the database 
        -d = to Destroy dummy data from the database`))
    process.exit()
}

// connect to database
mongoose.connect(process.env.DBURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
})


// read seeds json files
const Users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf-8'));
const Campgrounds = JSON.parse(fs.readFileSync(`${__dirname}/campgrounds.json`, 'utf-8'));
const Reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'));


// function to import/delete to database
const importData = async () => {
    try {
        const spinner = new Spinner('Importing data ... %s');
        spinner.setSpinnerString("⣾⣽⣻⢿⡿⣟⣯⣷");
        spinner.start();
        await User.create(Users);
        await Campground.create(Campgrounds);
        await Review.create(Reviews);
        spinner.stop(true);
        console.log(chalk.green('Data Imported to the database'));
        process.exit();
    }
    catch (error) { console.log(chalk.bgRed('Failed Importing'), error) }
}

const destroyData = async () => {
    try {
        const spinner = new Spinner('Destroying data ... %s');
        spinner.setSpinnerString("⣾⣽⣻⢿⡿⣟⣯⣷");
        spinner.start();
        await User.deleteMany();
        await Campground.deleteMany();
        await Review.deleteMany();
        spinner.stop(true);
        console.log(chalk.green('Data Destroyed'));
        process.exit();
    }
    catch (error) { console.log(chalk.bgRed('Failed Destroying'), error) }
}


// on terminal: node seeder.js <option> 
switch (process.argv[2]) {
    case '-i':
        importData();
        break;

    case '-d':
        destroyData();
        break;

    default:
        return null
}