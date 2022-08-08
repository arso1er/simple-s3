# SimpleS3

SimpleS3 is a simple API file server that works like amazon s3.

## Installation

1. Clone the github repo.

2. Install project dependencies: `yarn install`, or `npm install`.

3. Install `typescript` globally with `npm` or `yarn`.

4. Update the `config.ts` file as you see fit. The available config properties are:

   - `port`: The application will be available at this port.
   - `bodySizeLimit`: Controls the maximum request body size. If this is a number, then the value specifies the number of bytes; if it is a string, the value is passed to the [bytes](https://www.npmjs.com/package/bytes) library for parsing.
   - `tokenValidFor`: Controls the token validity duration (in seconds).
   - `filesFolder`: Controls uploaded files destination folder.

5. To compile the typescript code to javascript, run `tsc -W` (development) or `tsc` (production).

6. To start the server, run `yarn dev` (development) or `yarn start` (production).

## Documentation

The api has three routes to generate tokens, upload and download files. Those routes documentation can be found [here](documentation/index.md).
