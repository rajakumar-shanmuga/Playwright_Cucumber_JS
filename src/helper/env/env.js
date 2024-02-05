const  getEnv = async ()=>{
    if (process.env.ENV) {
        require('dotenv').config({
          path: `${process.cwd()}/src/helper/env/.env.${process.env.ENV}`,
          override: true
        });
      } else {
        require('dotenv').config({
          path: `${process.cwd()}/src/helper/env/.env.qa`,
          override: true
        });
      }
}

module.exports = {getEnv};