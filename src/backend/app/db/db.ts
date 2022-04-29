import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();


export const db = mysql.createConnection({
    host: "mysql-77463-0.cloudclusters.net",
    port: 10156,
    user: "admin",
    password: "L47Sd8iH",
    database: "tubes3"
});

var db_config={
    host: "mysql-77463-0.cloudclusters.net",
    user: "admin",
    password: "L47Sd8iH",
    port: 10156,
    database: "tubes3"  
}

var connection
function handleDisconnect() {
    connection = mysql.createConnection(db_config); // Recreate the connection, since
                                                    // the old one cannot be reused.
  
    connection.connect(function(err) {              // The server is either down
      if(err) {                                     // or restarting (takes a while sometimes).
        console.log('error when connecting to db:', err);
        setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
      }                                     // to avoid a hot loop, and to allow our node script to
    });                                     // process asynchronous requests in the meantime.
                                            // If you're also serving http, display a 503 error.
    connection.on('error', function(err) {
      console.log('db error', err);
      if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
        handleDisconnect();                         // lost due to either server restart, or a
      } else {                                      // connnection idle timeout (the wait_timeout
        throw err;                                  // server variable configures this)
      }
    });
  }

  export default handleDisconnect();