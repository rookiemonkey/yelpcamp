// dir _seeds includes all the seeds (dummy data)
// seeds files are in json format depending on the schema fields

require('dotenv').config({ path: "./.env" });
const fs = require('fs');
const Spinner = require('cli-spinner').Spinner;
const chalk = require('chalk');
const mongoose = require('mongoose');
const User = require('../schemas/userSchema');
const Campground = require('../schemas/campgroundSchema');
const Comment = require('../schemas/commentSchema');
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
const Comments = JSON.parse(fs.readFileSync(`${__dirname}/comments.json`, 'utf-8'));
const Reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf-8'));


// function to import/delete to database
const importData = async () => {
    try {
        const spinner = new Spinner('Importing data ... %s');
        spinner.setSpinnerString("⣾⣽⣻⢿⡿⣟⣯⣷");
        spinner.start();

        await User.create(Users);
        console.log(chalk.green('   ✓ Dummy Users imported'));

        await Campground.create(Campgrounds);
        console.log(chalk.green('   ✓ Dummy Campgrounds imported'));

        await Comment.create(Comments);
        console.log(chalk.green('   ✓ Dummy Comments imported'));

        await Review.create(Reviews);
        console.log(chalk.green('   ✓ Dummy Reviews imported'));

        spinner.stop(true);
        console.log(chalk.green('✓ Data imported'));
        process.exit();
    }
    catch (error) {
        process.stdout.write('\n');
        console.log(
            chalk.bgRed('Failed Importing'),
            chalk.bgRed(error.message),
            error
        )
        process.exit();
    }
}

const destroyData = async () => {
    try {
        const spinner = new Spinner('Purging data ... %s');
        spinner.setSpinnerString("⣾⣽⣻⢿⡿⣟⣯⣷");
        spinner.start();

        await User.deleteMany();
        console.log(chalk.yellowBright('   ✓ Dummy Users purged'));

        await Campground.deleteMany();
        console.log(chalk.yellowBright('   ✓ Dummy Campground purged'));

        await Comment.deleteMany();
        console.log(chalk.yellowBright('   ✓ Dummy Comments purged'));

        await Review.deleteMany();
        console.log(chalk.yellowBright('   ✓ Dummy Reviews purged'));

        spinner.stop(true);
        console.log(chalk.yellowBright('✓ Data purged'));
        process.exit();
    }
    catch (error) {
        process.stdout.write('\n');
        console.log(
            chalk.bgRed('Failed Importing'),
            chalk.bgRed(error.meessage),
            error
        )
        process.exit();
    }
}

// // used this function to group the comments and paste the log results on seeders file
// // instead of manually grouping just to lessen the effort
// const groupComments = () => {
//     let group = [];
//     let final = [];

//     const parsedComments = foundComments.forEach((comment, ind) => {
//         let current = ind + 1;

//         // each dummy campground will receive 5 dummy comments
//         if (current % 5 !== 0) {
//             group.push(comment)
//         }

//         else {
//             let groupCopy = Object.assign([], group)
//             final = [...final, groupCopy]
//             group = [];
//             group.push(comment)
//         }
//     })

//     final.forEach(f => {
//         // the log can be copied to the seeder file directly
//         console.log('COMMENTS===> ', JSON.stringify(f))
//         process.stdout.write('\n');
//     })
// }


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