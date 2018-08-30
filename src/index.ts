import { Command, flags } from '@oclif/command';
import StressService from './stressService';

class StressTest extends Command {
  static DEFAULT_CHUNK = 1;
  static DEFAULT_REPEAT = 1;
  static DEFAULT_PATH_SNAPSHOTS = './snapshots';
  static DEFAULT_DATA_FILE = './data/test-samples.txt';
  static DEFAULT_USER_AGENT =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36';

  static description = 'Pika web stress test script';

  static flags = {
    version: flags.version({ char: 'v' }),
    help: flags.help({ char: 'h' }),
    dataFile: flags.string({
      char: 'd',
      description: 'Data file stress',
      default: StressTest.DEFAULT_DATA_FILE
    }),
    chunk: flags.string({
      char: 'c',
      description: 'Number of concurrent url calls',
      default: `${StressTest.DEFAULT_CHUNK}`
    }),
    repeat: flags.string({
      char: 'r',
      description: 'Number of stress test repeats',
      default: `${StressTest.DEFAULT_REPEAT}`
    }),    
    useragent: flags.string({
      char: 'u',
      description: 'Useragent of the browser',
      default: StressTest.DEFAULT_USER_AGENT
    }),
    HTTPheaders: flags.string({
      char: 'e',
      description: 'HTTP header to use on url request',
    })
  };

  static args = [{ name: 'url', required: false, description: 'Url to open' }];

  async run() {
    const { args, flags } = this.parse(StressTest);

    console.log('*********** Starting web stress test **************');
    console.log('*');

    let exitCode = 0;
    let stressService;

    try {

      if (!args.url && !flags.dataFile) {
        throw 'An url or a dataFile must be informed!';
      }

      // Creating stress service
      stressService = new StressService(flags.useragent, flags.HTTPheaders);

      // Using a repeat loop
      const repeat = flags.repeat ? parseInt(flags.repeat) : StressTest.DEFAULT_REPEAT;
      for(let i = 0; i < repeat; i++) {
        if (i > 0) {
          console.log(`* Repeat ${i}`);
        }
        // Read test data and perform stress test
        await stressService.processData(args.url, flags.dataFile, flags.chunk ? parseInt(flags.chunk) : StressTest.DEFAULT_CHUNK);
      }

    } catch (error) {
      exitCode = 2;
      console.error('An error ocurred:');
      console.error(error);
    }

    console.log('*');
    console.log('*********** Stress test end **************');

    process.exit(exitCode);
  }
}

export = StressTest;
