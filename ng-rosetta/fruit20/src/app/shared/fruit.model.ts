// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.  See the project's LICENSE.MD for details.
// Copyright Thomson Reuters 2017. All rights reserved.

export class FruitItem {
    constructor(
        public id: Number,
        public common_name: Number,
        public species: String,
        public region: String,
        public url: String,
        public image_url: String,
    ) { }
}