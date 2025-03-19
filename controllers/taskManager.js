const { errorHandler } = require("../errorHandler/error");

const get = (req, res)=> errorHandler(async ()=> {
    // YOUR CODE HERE

})(req, res);


const post = (req, res)=> errorHandler(async ()=> {
    // YOUR CODE HERE
    
})(req, res);

module.exports = {
  get
};
