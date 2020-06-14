import StressUtils from './stressUtils';

export default class StressService {
  private useragent: string;
  private HTTPheaders: any;

  constructor(
    useragent: string,
    HTTPheaders: string,
  ) {
    this.useragent = useragent;
    this.HTTPheaders = HTTPheaders ? JSON.parse(HTTPheaders.replace(/'/g,'"')) : {};
  }

  /**
   * Crawls the given url.
   *
   * @param url
   * @param chunk
   */
  async processData(url: string, dataFile: string, chunk: number) {
    // Parsing data
    let testData = [];
    if (url) {
      console.log('* Opening url ' + url);
      let c;
      for (c = 0; c < chunk; c++) {
        testData.push(url);
      }
    } else if (dataFile) {
      console.log('* Opening data file ' + dataFile + ' and parsing stress endpoints');
      const testDataFile = await StressUtils.readTestData(dataFile);
      testData.push(...testDataFile);
    }
    if (testData) {
      // filter links
      const testEndpoints = testData.filter(
        endpoint => endpoint && endpoint.length > 0
      );
      // Process links in chunks
      let i, j;
      console.log(`* Stress testing using ${testEndpoints.length} urls.`);
      for (i = 0, j = testEndpoints.length; i < j; i += chunk) {
        // Preparing chunk
        const start = i;
        const end = start + chunk < testEndpoints.length ? start + chunk : testEndpoints.length;
        const testUrlChunk = testEndpoints.slice(start, end);
        // Executing test data chunk
        console.log(`* Processing chunk ${1 + (i / chunk)} with ${testUrlChunk.length} concurrent calls.`);
        await this.multiTaskOpenUrl(testUrlChunk);
      }
      console.log(`* Processed ${i} urls.`);
    }
  }

  protected async multiTaskOpenUrl(testUrls: string[]) {
    try {
      // Creating tasks promises
      let openUrlsPromises = testUrls.map(url => this.openUrl(url));
      // Executing tasks
      if (openUrlsPromises && openUrlsPromises.length) {
        const response = await Promise.all(openUrlsPromises);
      }
    } catch (error) {
      console.error('Unexpected error ocurred: ' + error);
    }
  }

  protected openUrl(url: string): Promise<string> {
    // Opening url on headless chrome
    //console.log(`* Opening Url ${url}.`);
    const endpoint = url.split(' ');
    if (endpoint && endpoint.length == 1) {
      return StressUtils.openEndpoint('GET', endpoint[0]);
    } else {
      return StressUtils.openEndpoint(endpoint[0], endpoint[1], endpoint.length >= 3 ? endpoint[2] : undefined);
    }
  }
}
