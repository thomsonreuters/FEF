import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
    createDb() {

        let fruit = [
            {
                id: 1,
                common_name: "Strawberry Tree",
                species: "Arbutus unedo",
                region: "Mediteranian",
                url: "https://en.wikipedia.org/wiki/Arbutus_unedo",
                image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Bowl_of_Strawberry_Tree_berries.jpg/220px-Bowl_of_Strawberry_Tree_berries.jpg"
            },
            {
                id: 2,
                common_name: "Red Bayberry",
                species: "Myrica rubra",
                region: "Eastern Asia",
                url: "https://en.wikipedia.org/wiki/Myrica_rubra",
                image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Yangmei.jpg/220px-Yangmei.jpg"
            },
            {
                id: 3,
                common_name: "Finger Lime",
                species: "Citrus australasica",
                region: "Australia",
                url: "https://en.wikipedia.org/wiki/Citrus_australasica",
                image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Citrus_australasica_brown_fruit1.JPG/220px-Citrus_australasica_brown_fruit1.JPG"
            },
            {
                id: 4,
                common_name: "Buddha's Hand",
                species: "Citrus medica var. sarcodactylis",
                region: "China",
                url: "https://en.wikipedia.org/wiki/Buddha%27s_hand",
                image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Buddhas_hand_1.jpg/220px-Buddhas_hand_1.jpg"
            },
            {
                id: 5,
                common_name: "Crowberry",
                species: "Empetrum",
                region: "South America",
                url: "https://en.wikipedia.org/wiki/Empetrum",
                image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Crowberries.jpg/220px-Crowberries.jpg"
            },
            {
                id: 6,
                common_name: "Jackfruit",
                species: "Artocarpus heterophyllus",
                region: "South America",
                url: "https://en.wikipedia.org/wiki/Jackfruit",
                image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Jackfruit_hanging.JPG/220px-Jackfruit_hanging.JPG"
            },
            {
                id: 6,
                common_name: "Monster Fruit",
                species: "Monstera deliciosa",
                region: "Southern Mexico",
                url: "https://en.wikipedia.org/wiki/Monstera_deliciosa",
                image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Monstera_deliciosa_ripen_fruit_01.JPG/90px-Monstera_deliciosa_ripen_fruit_01.JPG"
            },
            {
                id: 7,
                common_name: "Honeyfruit",
                species: "Melicoccus bijugatus",
                region: "South & Central America",
                url: "https://en.wikipedia.org/wiki/Melicoccus_bijugatus",
                image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Melicoccus_bijugatus.jpg/220px-Melicoccus_bijugatus.jpg"
            },
            {
                id: 8,
                common_name: "Strawberry Guava",
                species: "Psidium littorale",
                region: "Hawaii",
                url: "https://en.wikipedia.org/wiki/Psidium_cattleyanum",
                image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Psidium_cattleianum_fruit.jpg/220px-Psidium_cattleianum_fruit.jpg"
            },
            {
                id: 9,
                common_name: "Sugar Plum",
                species: "Borassus flabellifer",
                region: "India",
                url: "https://en.wikipedia.org/wiki/Borassus_flabellifer",
                image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Fruits_of_Borassus_flabellifer.jpg/180px-Fruits_of_Borassus_flabellifer.jpg"
            },
            {
                id: 10,
                common_name: "Dragon Fruit",
                species: "Pitaya",
                region: "Americas",
                url: "https://en.wikipedia.org/wiki/Pitaya",
                image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Pitaya_cross_section_ed2.jpg/220px-Pitaya_cross_section_ed2.jpg"
            }
        ]

        return { fruit };
    }
}