import minimist from 'minimist';
import { callATS } from './top';
//import { country } from './country';
import { help } from './help';
//import { configure } from './configure';
import { version } from './version';

export async function cli(argsArray) {
  const args = minimist(argsArray.slice(2));
  let cmd = args._[0] || 'help';

  if (args.version || args.v) {
    cmd = 'version';
  }

  if (args.help || args.h) {
    cmd = 'help';
  }

  switch (cmd) {
    case 'version':
      version(args);
      break;

    case 'help':
      help(args);
      break;

    case 'top':
      callATS(args);
      break;

    // case 'country':
    //   country(args);
    //   break;

    // case 'config':
    //   configure(args);
    //   break;

    default:
      console.error(`"${cmd}" is not a valid command!`);
      break;
  }
}