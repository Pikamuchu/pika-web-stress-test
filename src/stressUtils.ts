import * as fs from 'fs';
import * as util from 'util';

// Convert fs.readFile into Promise version of same
const readFile = util.promisify(fs.readFile);

export default class StressUtils {

  /**
   * Read test data file.
   * 
   * @param file 
   */
  static async readTestData(file: string): Promise<string[]> {
    const testData = await readFile(file, { encoding: 'utf8' });
    return testData ? testData.split('\n') : [];
  }

  /**
   * Get content from url.
   *
   * @param {*} url
   */
  static openEndpoint(method: string, url: string, postData: string = undefined): Promise<any> {
    return new Promise((resolve, reject) => {
      // select http or https module, depending on requested url
      const parsedUrl = this.parseUrl(url);
      const lib = parsedUrl.proto === 'https' ? require('https') : require('http');
      const options = {
        hostname: parsedUrl.domain,
        path: parsedUrl.uri,
        headers: {},
        timeout: 10000
      };
      if (postData) {
        options.headers = {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': Buffer.byteLength(postData)
        };
      }
      const request = lib.get(options, (response: any) => {
        // handle http errors
        if (response.statusCode < 200 || response.statusCode > 299) {
          reject(new Error('Failed to load page, status code: ' + response.statusCode));
        }
        // temporary data holder
        const body: any[] = [];
        // on every content chunk, push it to the data array
        response.on('data', (chunk: any) => body.push(chunk));
        // we are done, resolve promise with those joined chunks
        response.on('end', () =>
          resolve({
            protocol: parsedUrl.protocol,
            domain: parsedUrl.domain,
            url: parsedUrl.url,
            content: body.join('')
          })
        );
      });
      // handle connection errors of the request
      request.on('error', (err: any) => reject(err));
    });
  }

  /**
   * Parses given url.
   *
   * @param url
   */
  static parseUrl(url: string): any {
    const regex = /((http|https)?:\/\/)?([-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6})\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gm;
    const requestUrl = url.startsWith('http') ? url : 'https://' + url;
    let m,
      result: any = {};
    while ((m = regex.exec(requestUrl)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }
      // Iterate through results
      m.forEach((match, groupIndex) => {
        if (groupIndex === 0) result.url = match;
        if (groupIndex === 1) result.protocol = match;
        if (groupIndex === 2) result.proto = match;
        if (groupIndex === 3) result.domain = match;
        if (groupIndex === 4) result.uri = match;
      });
    }
    return result;
  }
}
