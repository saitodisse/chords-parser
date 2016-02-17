import { CliController } from 'cli-router';

class VersionController extends CliController {
  index() {
    const version = require('../../../../package.json').version;
    return 'version: ' + version;
  }
}

export default VersionController;
