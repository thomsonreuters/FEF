// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.  See the project's LICENSE.MD for details.
// Copyright Thomson Reuters 2017. All rights reserved.

exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['e2e/*_spec.js'],
  baseUrl: 'http://localhost:9000' //default test port with Yeoman
};