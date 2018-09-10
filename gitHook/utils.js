let spawn = require('child_process').spawn;

exports.runCommand = function(cmd, args, callback){
  let child = spawn(cmd, args);
  let response = '';
  child.stdout.on('data', function( buffer ){ response += buffer.toString(); });
  child.stdout.on('end', function(){ callback( response ) });
}