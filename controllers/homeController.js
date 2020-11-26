const dateformat = require('dateformat');
const Bid = require("../models/Bid")
const Tender = require("../models/Tender");
const ITEMS_PER_PAGE = 3;

function trimString(passedString) {
  var theString = passedString.substring(0, 150);
  return theString;
}

exports.getHome = (req, res) => {
  const page = +req.query.page || 1;
  let totalItems;

  Tender.find()
    .countDocuments()
    .then((numTenders) => {
      totalItems = numTenders;
      return Tender.find({})
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then((tenders) => {
      res.render("home", {
        tenders: tenders,
        // ebookcover: tenders.ebookcover,
        name: req.user.name,
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
      });
    })
    .catch((err) => {
      throw err;
    });
};
exports.getTender = (req, res) => {
  const tenderId = req.params.id;

  Tender.findById(tenderId)
    .then((tender) => {
      const tenderClosingTime = tender.closingTime;
      const newClosingTime = dateformat(tenderClosingTime, 'mmm d, yyyy H:MM:ss');
      res.render("tender", {
        tender: tender,
        closingTime: newClosingTime,
        name: req.user.name,
      });
    })
    .catch((err) => {
      throw err;
    });
};
exports.getBids = (req, res) => {
  const page = +req.query.page || 1;
  let totalItems;

  Bid.find({ bidder: req.user.name })
    .countDocuments()
    .then((numBids) => {
      totalItems = numBids;
      return Bid.find({ bidder: req.user.name })
        .skip((page - 1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })
    .then((bids) => {
      res.render("bids", {
        bids: bids,
        // ebookcover: tenders.ebookcover,
        name: req.user.name,
        currentPage: page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
      });
    })
    .catch((err) => {
      throw err;
    });
};

exports.postMakeBid = (req, res) => {
  const name = req.user.name;
  // const managerId = req.user._id;

  const { tenderId, tenderNumber, tenderTitle, description, tenderClosingTime, manager, bidAt } = req.body;
  const bidder = name;
  let errors = [];

  if (!description) {
    errors.push({ msg: 'Please enter your description!' });
  }


  if (errors.length > 0) {
    res.render('tender', {
      editing: false,
      name: name,
      errors,
      description,
    });
  } else {
    // Bid.findOne({ tenderNumber: tenderNumber }).then(existingBid => {
    Tender.findOne({ tenderNumber: tenderNumber }).then(tender => {
      const tenderClosingTime = tender.closingTime;
      const newClosingTime = dateformat(tenderClosingTime, 'mmm d, yyyy H:MM:ss');
      // if (existingBid) {
      //   errors.push({ msg: 'Bid already exists' });
      //   res.render('tender', {
      //     editing: false,
      //     name,
      //     tender,
      //     errors,
      //     description,
      //     closingTime: newClosingTime,

      //   });
      // } else {
      const newBid = new Bid({
        tenderNumber: req.body.tenderNumber,
        tenderTitle: req.body.tenderTitle,
        description: req.body.description,
        tenderClosingTime: req.body.tenderClosingTime,
        manager: req.body.manager,
        bidder: bidder,

      });

      newBid
        .save()
        .then(bid => {
          req.flash(
            'success_msg',
            'Bid added successfully...'
          );
          res.redirect('/');
        })
        .catch(err => console.log(err));
      // }

    })

    // }).catch(err => console.log(err))

  }
}
