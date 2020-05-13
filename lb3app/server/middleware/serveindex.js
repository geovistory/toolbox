module.exports = serveindex;

function serveindex(){
  return function(req, res){
    res.sendFile("index.html", {root: __dirname+"/../../../public/dist"})
  }
}
