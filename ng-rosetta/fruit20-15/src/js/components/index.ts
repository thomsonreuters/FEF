// This source code is provided under the BSD license and is provided AS IS with no warranty or guarantee of fit for purpose.  See the project's LICENSE.MD for details.
// Copyright Thomson Reuters 2017. All rights reserved.

export class FruitItem {
    id: Number;
    common_name: Number;
    species: String;
    region: String;
    URL: String;
    ImageURL: String;

    // Examine any incoming object for properties to map.
    constructor(data: any) {
        if (data.id) { this.id = data.id };
        if (data.common_name) { this.common_name = data.common_name };
        if (data.species) { this.species = data.species };
        if (data.region) { this.region = data.region };
        if (data.url) { this.URL = data.url };
        if (data.image_url) { this.ImageURL = data.image_url };
    }
}