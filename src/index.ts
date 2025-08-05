// import "dotenv/config"/

try{
  require("./infrastructure/server");
  // require("./infrastructure/database");
} catch(error){
  console.log("Erro ao iniciar a aplicação", error);
  process.exit(1)
}