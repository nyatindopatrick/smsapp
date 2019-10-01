module.exports = (router)=>{
    router.get("/", (req, res) => {
        res.render("login");
        
      });
      
      router.get("/home", (req, res) => {
        res.render("home");
      });
}