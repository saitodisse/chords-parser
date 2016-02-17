import path from 'path';
import { Cli } from 'cli-router';

class MainCliRouter {
  constructor(opts = {}) {
    opts.controllers_root = path.join(__dirname, './controllers');
    this._cli = new Cli(opts);

    this._cli
      .route('help', (p, args) => p.help || p['--help'] || args.length === 0)
      .route('version', (p) => p.version || p['--version'])
      .route('main', (p, args) => args.length >= 0);
  }

  run(args) {
    const result = this._cli.run({ argv: args });
    if (result.hasOwnProperty('_promise0')) {
      return result
      .then((promiseResult) => process.exit(promiseResult))
      .catch((err) => {
        console.error(err.toString());
        process.exit(1);
      });
    }
    console.error(result);
  }
}

export default MainCliRouter;
